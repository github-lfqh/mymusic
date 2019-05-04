<style lang="scss" scoped>
section {
  width: 100%;

  .hotMusic {
    width: 100%;
    height: 10rem;
    background: url("../assets/img/bg.jpg") no-repeat;
    background-size: cover;    
    
    img {
      width: 30%;
      height: 3rem;
    }
  }
}
</style>

<template>
  <section>
    <div class="hotMusic flex-center">
      <img src="../assets/img/hot-music.png" />
    </div>
    <songs-list></songs-list>
  </section>
</template>

<script>
import songsList from "../components/songs-list";

export default {
  components: {
    songsList
  }
};
</script>
