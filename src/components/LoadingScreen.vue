<template>
  <div class="loading-screen">
    <div class="blur-background"></div>
    <div class="loading-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen'
}
</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
}

.loading-dots {
  display: flex;
  justify-content: center;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fe0000;
  margin: 0 5px;
  animation: jump 500ms infinite alternate;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes jump {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>