<style lang="scss" scoped>
.play-area {
  width: 100%;
  height: 70px;
  padding: 5px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: rgba(58, 58, 58, 0.6);

  .pic {
    height: 60px;
    width: 60px;
    border-radius: 100%;
  }

  .info {
    width: 200px;
    height: 60px;
    margin-left: 5px;
    color: #fff;
    display: flex;
    flex-direction: column;

    .content {
      width: 100%;
      height: 30px;
      display: flex;
      
      .name {
        width: 50%;
        height: 30px;
        line-height: 30px;
      }

      .time {
        color: #fff;
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .words {
      width: 100%;
      height: 30px;
      overflow: hidden;
      z-index: 6;

      ul {
        width: 100%;
        height: 100%;
        transition-duration: 200ms;

        li {
          width: 100%;
          height: 100%;
          line-height: 30px;
        }
      }
    }
  }

  .play {
    width: 60px;
    height: 60px;
    background: url("../assets/img/button.png");
    background-position: 0 -60px;
    margin-left: auto;
    margin-right: 0;
  }

  .paused {
    background-position: 0 0;
  }
}
</style>

<template>
  <div class="play-area">
    <router-link to="/play"><img :src="pic" class="pic" /></router-link>
    <div class="info">
      <div class="content">
        <span class="name">
          {{ singer }} - {{ name }}
        </span>
        <div class="time">
          {{ currentTime }} / {{ duration }}
        </div>
      </div>
      <div class="words">
        <ul ref="ull">
          <li v-for="(item, index) in oLRC.ms" :key="index">{{ item.c }}</li>
        </ul>
      </div>
    </div>
    <span class="play" ref="play" :class="{ paused: pause }" @click="toggle"></span>
    <audio ref="paudio" @durationchange="durationchange" @timeupdate="timeupdate" @ended="ended" @error="error">
      <source :src="src" />
    </audio>
  </div>
</template>

<script>
import music from "../assets/other/夏雨菲 - 体面.mp3";
import txt from "../assets/other/体面.js";
import img from "../assets/img/体面.jpg";

export default {
  data() {
    return {
      data: {},
      oLRC: {
        ti: "", //歌曲名
        ar: "", //演唱者
        al: "", //专辑名
        by: "", //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组｛t: 时间，c: 歌词｝
      },
      pic: img,
      lineNo: 0,
      currentTime: "00:00",
      duration: "00:00",
      src: music,
      pause: false,
      singer: "夏雨菲",
      name: "体面"
    }
  },
  
  methods: {
    durationchange() {
      this.duration = this.timeFormat(this.$refs.paudio.duration);
    },

    timeupdate() {
      for (let i in this.oLRC.ms) {
        if (this.oLRC.ms[i].t > ( this.$refs.paudio.currentTime || 0 )) {
          this.lineNo = i - 1;
          break;
        }
      }
      this.currentTime = this.timeFormat(this.$refs.paudio.currentTime || 0);
      if (this.lineNo >= this.oLRC.ms.length)
        return;
      if (this.oLRC.ms[this.lineNo].t <= (this.$refs.paudio.currentTime || 0)) {
        this.move();
      }
    },

    changeStatus() {
      
    },

    ended() {
      
    },

    toggle() {
      if(this.pause) {
        this.$refs.paudio.play();
      } else {
        this.$refs.paudio.pause();
      }
      this.pause = !this.pause;
    },

    error() {

    },

    parseLrc(lrc) {
      if (lrc.length == 0) return;
      let lrcs = lrc.split("\n");
      for (let line of lrcs) {
        line = line.replace(/(^\s*)|(\s*$)/g, "");
        let t = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
        let s = t.split(":");
        if (isNaN(parseInt(s[0]))) {
          for ( let item in this.oLRC) {
            if (item != "ms" && item == s[0].toLowerCase()) {
              this.oLRC[item] = s[1];
            }
          }
        } else {
          let arr = line.match(/\[(\d+:.+?)\]/g);
          let timeLength = 0;
          for (let arrItem of arr) {
            timeLength += arrItem.length;
          }
          let content = line.substring(timeLength);
          if (content != "") {
            for (let k in arr) {
              let t = arr[k].substring(1, arr[k].length - 1);
              let s = t.split(":");
              this.oLRC.ms.push({
                t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
                c: content
              });
            }
          }
        }
      }
      if (this.oLRC.ms.length == 0) {
        this.noWord = true;
      }
    },

    timeFormat(str) {
      let m = Math.floor(str / 60);
      let s = Math.round(str % 60);
      return m.toString().padStart(2, 0) + ":" + s.toString().padStart(2, 0);
    },

    move() {
      this.$refs.ull.style.transform = "translateY(" + this.lineNo  * -30 + "px)";
      this.lineNo++;
    },

    init() {
      this.data = JSON.parse(localStorage.getItem("data"));
      let lrc;
      if(this.data == "tm") {
        this.$refs.paudio.src = music;
        lrc = txt.t;
        this.parseLrc(lrc);
        this.singer = "夏雨菲";
        this.name = "体面";
      } else {
        this.$refs.paudio.src = this.data.url;
        lrc = this.data.lrc;
        this.$axios.get(lrc).then(response => {
          this.parseLrc(response);
        });
        this.pic = this.data.pic;
        this.singer = this.data.singer;
        this.name = this.data.name;
      }
      this.$refs.paudio.autoplay = true;
      this.$refs.paudio.load();
      this.$refs.paudio.currentTime = parseInt(localStorage.getItem("currentTime"));
      this.currentTime = this.timeFormat(this.$refs.paudio.currentTime || 0);
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    let currentTime = this.$refs.paudio.currentTime || 0;
    localStorage.setItem("currentTime", currentTime);
  }
}
</script>


