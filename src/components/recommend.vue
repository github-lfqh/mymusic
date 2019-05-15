<style lang="scss" scoped>
.recommend {
  width: 100%;
  position: relative;
  margin-top: 10rem;
  margin-bottom: 70px;

  .loadmore {
    width: 100%;
    height: 5rem;
    color: #262a36;
  }

  .toTop {
    width: 40px;
    height: 40px;
    background: #88a0c7;
    color: #fff;
    position: fixed;
    bottom: 7rem;
    right: 1rem;
    border-radius: 100%;
  }

  .toTop:hover {
    background: #262a36;
  }

  .toTop:active {
    background: #88a0c7;
  }
}
</style>

<template>
  <section class="recommend">
    <songs-list></songs-list>
    <div class="loadmore flex-center" @click="loadmore">
      <p v-show="!showGif">加载更多</p>
      <img src="../assets/img/loading.gif" v-show="showGif" />
    </div>
    <a href="#top" class="toTop flex-center">
      Top
    </a>
  </section>
</template>

<script>
import songsList from "../components/songs-list";

export default {
  components: {
    songsList
  },

  data() {
    return {
      showGif: false
    };
  },

  methods: {
    loadmore() {
      this.showGif = true;
      setTimeout(() => {
        this.$store.commit("setLength", this.$store.state.length + 20);
        this.showGif = false;
      }, 500);
    }
  }
};
</script>
