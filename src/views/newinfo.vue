<template>
<div class="layout"></div>
</template>
<script>
export default {
  name: "newinfo",
  data() {
    return {
      msg: "个人信息",
    };
  },
  methods: {
     scrollBarWheel(e){
       if (e.wheelDelta) {
            console.log(e.wheelDelta >0 ?'上一页':'下一页');

       }else if(e.keyCode){
            console.log(e.keyCode == 38 || e.keyCode == 33  ?'上一页': e.keyCode == 40 || e.keyCode == 34 ? '下一页':'无效');
       }
     }
  },
  mounted(){
      document.body.addEventListener("wheel", this.scrollBarWheel);
      document.body.addEventListener("keydown", this.scrollBarWheel);
  }
};
</script>
<style scoped>
.layout{
  background: pink;
}
</style>
