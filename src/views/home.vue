<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="home">
    <head-nav></head-nav>
    <recommend v-show="this.$store.state.index == 0"></recommend>
    <hot v-show="this.$store.state.index == 1"></hot>
    <search v-show="this.$store.state.index == 2"></search>
    <play-area v-if="this.$store.state.showPlayArea"></play-area>
  </div>
</template>

<script>
import headNav from "../components/head-nav";
import recommend from "../components/recommend";
import hot from "../components/hot";
import search from "../components/search";
import playArea from "../components/play-area";

export default {
  components: {
    headNav,
    recommend,
    hot,
    search,
    playArea
  }
};
</script>
