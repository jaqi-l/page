<template>
  <div id="basicinfo">
    <contentheader>
      <!-- 页眉参数 -->
      <template v-slot:header1><p>{{ msg }}</p></template>
      <template v-slot:header2><p>{{ header2 }}</p></template>
      <template v-slot:header3><p>{{ header3 }}</p></template>
      <template v-slot:header4><p>{{ header4 }}</p></template>
      <template v-slot:header5><p>{{ header5 }}</p></template>
    </contentheader>
    <div class="basicinfo">
      <div class="photo"></div>
      <div class="info-box">
        <ul class="left-info">
          <li>年龄：{{ age }}</li>
          <li>工作经验：{{ workage }}</li>
          <li>学校：沈阳化工大学科亚学院</li>
          <li>爱好：摄影、计算机、篮球</li>
          <li>邮箱：jaqi.l@qq.com</li>
        </ul>
          <div class="box-line"></div>
        <ul class="right-info">
          <li><span class="dot"></span>高分子材料与工程专业，专业成绩第五</li>
          <li><span class="dot"></span>中共党员，优秀毕业生，多次获得奖学金</li>
          <li><span class="dot"></span>做事细致认真，有耐心</li>
          <li><span class="dot"></span>具备良好的沟通能力，有团队意识</li>
          <li><span class="dot"></span>勤奋好学，自学能力强。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import contentheader from "@/components/contentheader"; //页眉模板
export default {
  name: "basicinfo",
  data() {
    return {
      // 页眉参数
      msg: "基本信息",
      header2: "BASIC INFORMATION",
      header3: "01",
      header5: "INFORMATION",
      age:"",
      workage:""
    };
  },
  components: {
    contentheader
  },
  mounted(){
   var nowYear = new Date().getFullYear()
   this.age = nowYear - 1993 ;
   this.workage = nowYear - 2016
  },
};
</script>
<style scoped>
.basicinfo {
    position: relative;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    }
    .basicinfo .photo {
      margin: 0 auto;
      width: 94%;
      width: 17rem;
      height: 17rem;
      border-radius: 50%;
      background: url(~@/assets/images/photo.jpg);
      background-size:17rem 17rem;
    
    }
    .info-box {
      display: flex;
      justify-content: center;
      margin: 8rem auto;
    }
    .basicinfo ul {
      font-size: 1.6rem;
      line-height: 5rem;
      padding: 2rem;
      box-sizing: border-box;
    }
      .basicinfo  .right-info  .dot{
        display: inline-block;
        width:1rem;
        height:1rem;
        border-radius:50%;
        background-color:#ff6e5d;
        margin-right: 1.5rem;
      }
    .box-line{
        border-left: #ff6e5d solid 4px;
        margin: 0 2rem;
    }
</style>