<style lang="scss" scoped>
.love {
  width: 100%;
  height: 1800px;
  background: url("../assets/img/rose-bg-red.jpg") no-repeat;
  background-size: 100% 100%;
  color: #fff;

  .center {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;

      p {
        width: 100%;
        
        img {
          width: 100%;
          height: 200px;
          border-radius: 10px;
          margin: 10px 0;
        }
      }
    }

    .answer {
      width: 100%;

      p {
        width: 100%;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>

<template>
  <div class="love">
    <div class="center">
      <div class="content">
        <p>三年前你来点将面试，我对你一见钟情，可那时我没有追你的机会，只能无奈看你回了上饶，你走后我内心莫名的难过，希望三年后你还记得我，三年前的点点滴滴我依然历历在目。</p>
        <p><img src="../assets/img/520.jpg"></p>
      </div>
      <div class="content">
        <p>我们一起看了微微一笑很倾城，可能你上班太累了，睡着了,就靠在我左边肩膀上，我静静的看着你，无心看电影，希望时间能停留在那一刻或者能慢一点</p>
        <p><img src="../assets/img/wwyxhqc.jpeg"></p>
      </div>
      <div class="content">
        <p>我们一起在云味馆吃过桥米线，那是我吃过最好吃的米线，因为有你，一切都是美味</p>
        <p><img src="../assets/img/ywg.jpg"></p>
      </div>
      <div class="content">
        <p>那是一个夜晚，我骑着单车载你到深圳湾吹风，我故意骑的很慢，不想这么快就接受了，我们在海边的石头上坐着聊天，多么像一对情侣。</p>
        <p><img src="../assets/img/szw.jpg"></p>
      </div>
      <div class="content">
        <p>同年你生日我送了你一个熊给你，希望他能代我陪伴你，守护你。</p>
        <p><img src="../assets/img/bear.jpg"></p>
      </div>
      <div class="content">
        <p>借着520这个特殊的日子，我想大声告诉你我忍了三年的一句话：朱玲我喜欢你！</p>
        <p><img src="../assets/img/expression.jpg"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

