<template>
  <div id="projectexp">
    <contentheader>
      <!-- 页眉参数 -->
            <template v-slot:header1><p>{{ msg }}</p></template>
      <template v-slot:header2><p>{{ header2 }}</p></template>
      <template v-slot:header3><p>{{ header3 }}</p></template>
      <template v-slot:header4><p>{{ header4 }}</p></template>
      <template v-slot:header5><p>{{ header5 }}</p></template>
    </contentheader>
     <div class="projectexp">
       <img src="@/assets/images/casaoro.jpg" alt="" class="layout">
        <img src="@/assets/images/lymhspring.jpg" alt="" class="layout" >
     </div>
  </div>
</template>

<script>
import contentheader from "@/components/contentheader"; //页眉模板
export default {
  name: 'projectexp',
  data () {
    return {
        // 页眉参数
      msg: '项目经验',
      header2: "PROJECT EXPERIENCE",
      header3: "04",
      header5: "WORK"
    }
  },
  components: {
    contentheader
  }
}
</script>

<style scoped>
.projectexp{

    width: 80%;
    margin: 8rem auto;
  }
  .projectexp img{
    width: 100%;
    margin-bottom: 9rem;
    box-shadow:  2px 2px 10px rgb(39, 39, 39);
  }
</style>
