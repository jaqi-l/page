<template>
  <div id="skillsexp">
    <contentheader>
      <!-- 页眉参数 -->
            <template v-slot:header1><p>{{ msg }}</p></template>
      <template v-slot:header2><p>{{ header2 }}</p></template>
      <template v-slot:header3><p>{{ header3 }}</p></template>
      <template v-slot:header4><p>{{ header4 }}</p></template>
      <template v-slot:header5><p>{{ header5 }}</p></template>
    </contentheader>
    <tagcloud class="layout">
    </tagcloud>
  </div>
</template>

<script>
import contentheader from "@/components/contentheader"; //页眉模板
import tagcloud from "./tagcloud";
export default {
  name: "skillsexp",
  data() {
    return {
      // 页眉参数
      msg: "技能特长",
      header2: "SKILLS EXPERTISE",
      header3: "02",
      header5: "EXPERTISE",
    };
  },
  components: {
    contentheader,tagcloud
  },
};
</script>
