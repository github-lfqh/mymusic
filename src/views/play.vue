<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100% 100% !important;

  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    background-size: 100% 100%;
    z-index: 2;
  }

  &-disc {
    width: 100%;
    height: 15rem;
    z-index: 3;
    margin: 1rem 0;

    .mask {
      width: 15rem;
      height: 15rem;
      border-radius: 100%;
      background: url('../assets/img/disc.png') no-repeat;
      background-size: 100% 100%;
      position: relative;

      .pic {
        width: 10.3rem;
        height: 10.3rem;
        border-radius: 100%;
      }

      .pause {
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
        position: absolute;
      }
    }
  }
  
  &-songWords {
    width: 100%;
    height: 20rem;
    overflow: hidden;
    margin: auto 0;
    z-index: 3;

    ul {
      width: 100%;
      height: 100%;
      transition-duration: 200ms;

      li {
        width: 100%;
        height: 2rem;
        text-align: center;
        color: #fff;
        line-height: 2rem;
      }
    }

    h2 {
      text-align: center;
      color: #fff;
    }

    .light {
      color: #11a4f0;
    }
  }
  
  .progressBar {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    z-index: 3;
    margin: auto 0 1rem 0;

    span {
      color: #fff;
      font-size: 1.3rem;
      font-style: normal;
      width: 10%;
    }

    .currentTime {
      margin: 0 0.5rem 0 auto;
      text-align: right;
    }

    .duration {
      margin: 0 auto 0 0.5rem;
    }

    input[type = "range"] {
      -webkit-appearance: none;
      outline: none;
      height: 0.5rem;
      width: 80%;
      border-radius: 1rem; 
      background: -webkit-linear-gradient(#11a4f0, #11a4f0) no-repeat, #c2c2c4;
      background-size: 0% 100%;
    }
    input[type = "range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
      margin-top: -0.25rem; 
      background: #171717;
      border-radius: 100%;
    }  
    input[type = "range"]::-webkit-slider-runnable-track {
      height: 0.5rem;
      border-radius: 1rem; 
    }
  }
}
</style>

<template>
  <section class="player" :style="{ background: 'url(' + data.pic + ') no-repeat' }">
    <div class="cover"></div>
    <div class="player-disc flex-center" @click="changeStatus">
      <div class="mask flex-center" :style="{ transform: 'rotate(' + angle + 'deg)' }">
        <img :src="data.pic" class="pic" />
        <img src="../assets/img/pause.png" class="pause" v-show="btnShow" />
      </div>
    </div>
    <div class="player-songWords">
      <ul ref="ul" v-show="!noWord">
        <li v-for="(item, index) in oLRC.ms" :key="index">{{ item.c }}</li>
      </ul>
      <h2 v-show="noWord">歌曲库里暂无这首歌的歌词或者这首歌!</h2> 
    </div>  
    <audio ref="audio" @durationchange="durationchange" @timeupdate="timeupdate" @ended="ended" @error="error">
      <source src="" />
    </audio>
    <div class="progressBar">
      <span class="currentTime">{{ currentTime }}</span>
      <input type="range" ref="range" :style="{ backgroundSize:  progress +' 100%'}" @input="changeProgress">
      <span class="duration">{{ duration }}</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isplay: true,
      currentTime: "00:00",
      duration: "00:00",
      progress: "0%",
      ismove: false,
      btnShow: false,
      data: {},
      angle: 0,
      timer: null,
      oLRC: {
        ti: "", //歌曲名
        ar: "", //演唱者
        al: "", //专辑名
        by: "", //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组｛t: 时间，c: 歌词｝
      },
      lineNo: 0,
      played: false,
      noWord: false
    };
  },

  methods: {
    durationchange() {
      this.duration = this.timeFormat(this.$refs.audio.duration);
    },

    timeupdate() {
      if (this.ismove) {
        this.$refs.audio.currentTime = this.$refs.range.value / 100 * this.$refs.audio.duration;
        for (let i in this.oLRC.ms) {
          if (this.oLRC.ms[i].t > this.$refs.audio.currentTime) {
            this.lineNo = i - 1;
            break;
          }
        }
      } else {
        this.$refs.range.value = this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
      }
      this.currentTime = this.timeFormat(this.$refs.audio.currentTime);
      this.progress = this.$refs.range.value + "%";
      this.ismove = false;
      if (this.lineNo >= this.oLRC.ms.length)
        return;
      if (this.oLRC.ms[this.lineNo].t <= this.$refs.audio.currentTime) {
        this.heightLight();
      }
    },

    changeProgress() {
      this.ismove = true;
      this.progress = this.$refs.range.value + "%";
    },

    changeStatus() {
      this.btnShow = !this.btnShow;
      this.isplay = !this.isplay;
      if (this.isplay) {
        if (this.played) {
          document.querySelector(".light").removeAttribute("class");
          this.$refs.ul.style.transform = "translateY(0)";
          this.lineNo = 0;
          this.currentTime = "00:00";
          this.progress = "0%";
          this.$refs.audio.currentTime = 0;
          this.played = false;
          this.angle = 0;
        }
        this.autoRatate();
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
        clearInterval(this.timer);
      }
    },

    timeFormat(str) {
      let m = Math.floor(str / 60);
      let s = Math.round(str % 60);
      return m.toString().padStart(2, 0) + ":" + s.toString().padStart(2, 0);
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

    autoRatate() {
      this.timer = setInterval(() => {
        this.angle += 10;
      }, 500);
    },

    heightLight() {
      let lis = this.$refs.ul.getElementsByTagName("li");
      for (let li of lis)
        li.removeAttribute("class");
      lis[this.lineNo].className = "light";
      if (this.lineNo > 2) {
        this.$refs.ul.style.transform = "translateY(" + (this.lineNo - 2)  * -20 + "px)";
      }
      this.lineNo++;
    },

    ended() {
      this.played = true;
      this.btnShow = true;
      this.isplay = false;
      clearInterval(this.timer);
    },

    error() {
      clearInterval(this.timer);
      this.progress = "0%";
      this.$refs.range.value = 0;
      this.noWord = true;
    }
  },

  mounted() {
    this.data = JSON.parse(localStorage.getItem("data"));
    this.$refs.audio.src = this.data.url;
    this.$refs.audio.autoplay = true;
    this.$refs.audio.load();
    let lrc = this.data.lrc;
    this.$axios.get(lrc).then(response => {
      this.parseLrc(response);
    });
    this.autoRatate();
  }
};
</script>
