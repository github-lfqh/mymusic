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
    <div class="songs-list" v-for="(item, index) in this.$store.state.songs.slice(0, this.$store.state.length)" :key="index" @mouseenter="hover($event)"  @mouseleave="normal($event)" @click="toPlay(item)">
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
      index: 0
    };
  },

  methods: {
    hover(e) {
      e.target.classList.add("active");
    },

    normal(e) {
      e.target.classList.remove("active");
    },

    toPlay(item) {
      localStorage.setItem("data", JSON.stringify(item));
      this.$router.push({
        path: "/play"
      });
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


