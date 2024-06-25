<template>
  <div class="container">
    <div>
      <img class="chart" src="../assets/img.png" alt="График">
    </div>

    <div class="btn"
       type="button"
       @click="this.visible = !this.visible">Рекомендации
    </div>

    <div class="tutorials" v-if="visible">
      <a href="https://youtu.be/8usdrulk8GE?si=JDVJEPFgLGDaIVUd"><img class= "tutorial" src="../assets/img_1.png"/></a>
      <a href="https://youtu.be/hf9AADYdUlQ?si=cVSUOKUODzEw-_aK"><img class= "tutorial" src="../assets/img_2.png"/></a>
      <a href="https://youtu.be/sq0rKfN3nKY?si=GrcejWAhvyrU5rk5"><img class= "tutorial" src="../assets/img_3.png"/></a>
      <a href="https://youtu.be/OOctfy2d0Mg?si=z8-SyJyYsiO9TyUi"><img class= "tutorial" src="../assets/img_4.png"/></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.chart {
  display: block;
  margin: 0 auto;
}
.btn {
  text-align: center;
  width: 8%;
  margin: 0 auto;
  outline: 0;
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-weight: 400;
  padding: 8px 13px;
  background: #fe0000;
}

.tutorials {
  display: flex;
  margin: 45px 50px;
  justify-content: space-between;
}

</style>