<style lang="scss" scoped>
.search {
  width: 100%;
  margin-top: 12rem;
  
  > * {
    margin: 0 auto;
  }

  &-input {
    width: 90%;
    height: 3rem;
    margin: 2rem auto;
    position: relative;

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0 1rem;
      position: absolute;
      left: 0;
      top: 0.75rem;
    }

    input {
      width: 100%;
      height: 100%;
      border-radius: 2rem;
      background-color: #ebecec;
      padding-left: 3.5rem;
      padding-right: 0.5rem;
    }
  }

  .hot-search {
    width: 90%;

    .title {
      font-size: 1.2rem;
      line-height: 1.2rem;
      color: #666;
    }

    span {
      display: inline-block;
      height: 3.2rem;
      margin-right: 1rem;
      margin-top: 1rem;
      padding: 0 1rem;
      font-size: 1.4rem;
      line-height: 3.2rem;
      color: #333;
      background-color: #ebecec;
      border-radius: 2rem;
    }
  }

  .history-search {
    width: 100%;
    padding: 2rem 0;

    .title {
      width: 90%;
      display: flex;
      font-size: 1.2rem;
      line-height: 1.2rem;
      color: #666;
      margin: 0 auto;

      .clearAll {
        margin-right: 0;
        margin-left: auto;
      }
    }

    .record {
      width: 100%;
      height: 3rem;
      display: flex;
      align-items: center;
      margin-top: 1.5rem;
      border-bottom: 0.05rem solid rgba(128, 128, 128, 0.5);
      padding: 0 1rem;

      .icon {
        width: 1.5rem;
        height: 1.5rem;
        background: url("../assets/img/record.svg") no-repeat;
        margin-right: 1rem;
      }      
      .content {
        width: 90%;
        height: 2rem;
        font: 1.4rem/1.5 Helvetica, sans-serif;
        color: #333;
      }

      .close {
        width: 1.2rem;
        height: 1.2rem;
        background: url("../assets/img/close.svg") no-repeat;
        margin-left: auto;
        margin-right: 0;
      }
    }
  }

  .notfound {
    margin-top: 2rem; 
    text-align: center;
    font-size: 1.4rem;
    line-height: 3.2rem;
    color: #333;
  }
}
</style>

<template>
  <section class="search">
    <div class="search-input">
      <img src="../assets/img/search.svg" @click="search('###')" />
      <input type="search" placeholder="搜索歌曲、歌手" ref="input" @input="input">
    </div>
    <div class="hot-search" v-show="show">
      <h3 class="title">热门搜索</h3>
      <span v-for="(item, index) in hotSearch" :key="index" @click="search(item)">{{ item }}</span>
    </div>
    <div class="history-search" v-show="show">
      <h3 class="title">
        <span>历史搜索</span>
        <span class="clearAll" @click="clearAll">清空历史记录</span>
      </h3>
      <p class="record" v-for="(item, index) in historySearch" :key="index">
        <span class="icon" @click="search(item)"></span>
        <span class="content" @click="search('h###' + item)">{{ item }}</span>
        <span class="close" @click="close(item)"></span>
      </p>
    </div>
    <songs-list v-show="!show && !notFound"></songs-list>
    <p class="notfound" v-show="!show && notFound">暂无搜索结果!</p>
  </section>
</template>

<script>
import  songsList  from "../components/songs-list";

export default {
  components: {
    songsList
  },  
  data() {
    return {
      hotSearch: [
        "感谢你曾经来过",
        "体面",
        "绿色",
        "心如止水",
        "像我这样的人",
        "陷阱",
        "防弹少年团",
        "那就这样吧",
        "回忆总想哭",
        "天亮以前说再见"
      ],
      historySearch: [],
      show: true,
      notFound: false,
      notResult: ""
    };
  },

  methods: {
    search(item) {
      let key;
      this.notFound = false;
      if (item == "###") {
        if (this.$refs.input.value == "") {
          return;
        } else {
          this.show = false;
          key = this.$refs.input.value;
        }
      } else if(item.slice(0,4) == "h###"){
        this.show = false;
        key = item.slice(4, item.length);
        this.$refs.input.value = item.slice(4, item.length);
      } else {
        this.show = false;
        key = item;
        this.$refs.input.value = item;
      }
      this.historySearch.push(key);
      this.historySearch = Array.from(new Set(this.historySearch));
      localStorage.setItem("historySearch", JSON.stringify(this.historySearch));
      this.$axios.get("/search?key=579621905&s=" + key).then(response => {
        this.$store.commit("setSongs",response.data);
        this.notFound = false;
      }, () => {
        this.notFound = true;
      });
    },

    input() {
      if (this.$refs.input.value == "") {
        this.show = true;
      } else {
        this.show = false;
      }
    },

    close(item) {
      this.historySearch.splice(this.historySearch.indexOf(item), 1);
      localStorage.setItem("historySearch", JSON.stringify(this.historySearch));
    },

    clearAll() {
      this.historySearch = [];
      localStorage.setItem("historySearch", JSON.stringify(this.historySearch));
    }
  },
  mounted() {
    this.historySearch = JSON.parse(localStorage.getItem("historySearch")) || [];
  }
};
</script>