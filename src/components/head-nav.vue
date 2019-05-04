<style lang="scss" scoped>
.head-nav {
  width: 100%;
  height: 10rem;
  background: #262a36;

  header {
    width: 100%;
    height: 5.5rem;
    color: #fff;

    img {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 100%;
      margin-right: 1rem;
    }
  }

  nav {
    width: 100%;
    height: 4rem;
    display: flex;

    span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 0.2rem;
      color: #959aa1;
    }

    .active {
      color: #fff;
    }
  }

  .light {
    width: 16.66%;
    height: 0.5rem;
    background: #fff;
  }
}
</style>

<template>
  <div class="head-nav">
    <header class="flex-center" id="top">
      <img src="../assets/img/logo.jpg" />
      <span>LFQ's music</span>
    </header>
    <nav>
      <span :class="{ active: this.$store.state.index == 0 }" @click="recommendClick">推荐</span>
      <span :class="{ active: this.$store.state.index == 1 }" @click="rankClick">排行</span>
      <span :class="{ active: this.$store.state.index == 2 }" @click="searchClick">搜索</span>
    </nav>
    <div class="light" :style="{ transform: 'translate(' + move + ')' }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      move: "50%"
    };
  },

  methods: {
    recommendClick() {
      this.$store.commit("setIndex", 0);
      this.move = "50%";
      if (JSON.parse(localStorage.getItem("songs"))) {
        this.$store.commit("setSongs",JSON.parse(localStorage.getItem("songs")).sort(this.sortId));
      } else {
        this.$axios.get("/songList?key=579621905&id=3778678").then(response => {
          this.$store.commit("setSongs", response.data.songs.sort(this.sortId));
          localStorage.setItem("songs", JSON.stringify(response.data.songs));
        });
      }
    },

    rankClick() {
      this.$store.commit("setIndex", 1);
      this.move = "250%";
      if (JSON.parse(localStorage.getItem("songs"))) {
        this.$store.commit("setSongs", JSON.parse(localStorage.getItem("songs")).slice(0, 20));
      } else {
        this.$axios.get("/songList?key=579621905&id=3778678").then(response => {
          this.$store.commit("setSongs", response.data.songs.slice(0, 20));
          localStorage.setItem("songs", JSON.stringify(response.data.songs));
        });
      }
    },

    searchClick() {
      this.$store.commit("setIndex", 2);
      this.move = "450%";
      this.$store.commit("setSongs", []);
    },

    sortId(a, b) {
      return a.id - b.id;
    }
  }
};
</script>
