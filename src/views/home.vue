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
    <rank v-show="this.$store.state.index == 1"></rank>
    <search v-show="this.$store.state.index == 2"></search>
  </div>
</template>

<script>
import headNav from "../components/head-nav";
import recommend from "../components/recommend";
import rank from "../components/rank";
import search from "../components/search";

export default {
  components: {
    headNav,
    recommend,
    rank,
    search
  }
};
</script>
