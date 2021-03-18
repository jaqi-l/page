<template>
  <div class="wrap-container" :style="{ height: conheight }">
    <router-link class="containerbox container-1" href to="/#">
      <div class="container-pic"></div>
      <div class="container-info">
        <h3 class="container-title">简历</h3>
        <h4 class="container-subtitle">jaqi.info</h4>
        <h5 style="font-size: 2rem; font-weight: normal;color: #ff6e5d;">
          正在升级，敬请期待...
        </h5>
      </div>
    </router-link>
    <router-link class="containerbox container-2" href to="/nav">
      <div class="container-pic"></div>
      <div class="container-info">
        <h3 class="container-title">导航</h3>
        <h4 class="container-subtitle">jaqi.nav</h4>
      </div>
    </router-link>
    <a class="containerbox container-3" href="https://jaqi.gitee.io/jaqi.note/">
      <div class="container-pic"></div>
      <div class="container-info">
        <h3 class="container-title">笔记</h3>
        <h4 class="container-subtitle">jaqi.note</h4>
      </div>
    </a>
    <a class="containerbox container-4" href="http://jaqi.synology.me:5000/">
      <div class="container-pic"></div>
      <div class="container-info">
        <h3 class="container-title">云盘</h3>
        <h4 class="container-subtitle">jaqi.cloud</h4>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      msg: "首页",
      conheight: "document.documentElement.clientHeight-20+'px'",
    };
  },
  components: {},
  methods: {
    getHeight() {
      this.conheight = document.documentElement.clientHeight + "px";
    },
    created() {
      window.addEventListener("resize", this.getHeight);
      this.getHeight();
    },
  },
  mounted() {
    this.getHeight();
  },
};
</script>
<style>
.container-1 {
  background: #ebdacc;
  color: #3f4869;
}
.container-2 {
  background: #f9f5f1;
  color: #3f4869;
}
.container-3 {
  background: #8d91aa;
  color: #3f4869;
}
.container-4 {
  background: #dce2ec;
  color: #3f4869;
}
</style>
