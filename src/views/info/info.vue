<template>
  <div class="layout">
    <banner></banner>
    <basicinfo></basicinfo>
    <skillsexp></skillsexp>
    <workexp></workexp>
    <projectexp></projectexp>
  </div>
</template>
<script>
import banner from "./banner";
import basicinfo from "./basicinfo";
import skillsexp from "./skillsexp";
import workexp from "./workexp";
import projectexp from "./projectexp";
export default {
  name: "info",
  data() {
    return {
      msg: "个人信息"
    };
  },
  components: {
    banner,
    basicinfo,
    skillsexp,
    workexp,
    projectexp
  }
};
</script>
<style>

</style>