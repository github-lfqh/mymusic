<style lang="scss" scoped>
.songs {
  width: 100%;

  &-list {
    width: 100%;
    height: 5rem;
    border-bottom: 0.1rem solid rgba(204, 204, 204, 0.5);
    display: flex;
    padding: 0 1rem;

    .rank, .time {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .rank {
      flex: 0.75;
    }

    .time {
      flex: 1.25;
    }

    .ellipsis {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      margin: auto;
      flex: 8;
    }
  }

  .active {
    border-bottom: 0.1rem solid #2ca2f9;
    color: #2ca2f9;
  }
}
</style>

<template>
  <div class="songs">
    <!-- <div class="songs-list" @mouseenter="hover($event)"  @mouseleave="normal($event)" @click="toPlay('tm')">
      <span class="rank">{{ 1 }}</span>
      <span class="ellipsis">体面 - 夏雨菲</span>
      <span class="time">{{ time }}</span>
    </div> -->
    <div class="songs-list" v-for="(item, index) in this.$store.state.songs.slice(0, this.$store.state.length)" :key="index" @mouseenter="hover($event)"  @mouseleave="normal($event)" @click="toPlay(item, index)">
      <span class="rank">{{ index + 1 }}</span>
      <span class="ellipsis">{{ item.singer }} - {{ item.name }}</span>
      <span class="time">{{ item.time | timeFormat }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "04:38"
    };
  },

  methods: {
    hover(e) {
      e.target.classList.add("active");
    },

    normal(e) {
      e.target.classList.remove("active");
    },

    toPlay(item, index) {
      localStorage.setItem("data", JSON.stringify(item));
      localStorage.setItem("index", index);
      localStorage.removeItem("currentTime");
      this.$store.commit("setShowPlayArea", false);
      this.$nextTick(() => (this.$store.commit("setShowPlayArea", true)));
    }
  },

  filters: {
    timeFormat(str) {
      let m = Math.floor(str / 60);
      let s = Math.round(str % 60);
      return m.toString().padStart(2, 0) + ':' + s.toString().padStart(2, 0);
    }
  }
};
</script>


