<template>
  <div id="workexp">
    <contentheader>
      <!-- 页眉参数 -->
      <template v-slot:header1><p>{{ msg }}</p></template>
      <template v-slot:header2><p>{{ header2 }}</p></template>
      <template v-slot:header3><p>{{ header3 }}</p></template>
      <template v-slot:header4><p>{{ header4 }}</p></template>
      <template v-slot:header5><p>{{ header5 }}</p></template>
    </contentheader>
    <div class="workexp layout">
      <div class="timeline">
        <div class="timeline-border"></div>
        <div class="timeline-box">
          <div class="timeline-title">
            <h4>
              <span class="dot"></span>沈阳格猫科技有限公司官网
            </h4>
          </div>
          <ul class="timeline-content">
            <li>1.PC端重新设计，轮播图，标签云等交互效果。</li>
            <li>2.根据移动端特性单独设计移动端页面、自适应布局。</li>
            <li>3.完善网站内容，接入百度商桥api实现在线客户系统。</li>
            <li>
              4.规范前端代码，封装部分交互效果，标签语义化，
              优化SEO。
            </li>
          </ul>
        </div>
        <div class="timeline-box">
          <div class="timeline-title">
            <h4>
              <span class="dot"></span>沈阳卡萨欧罗商贸有限公司官网
            </h4>
          </div>
          <ul class="timeline-content">
            <li>1.选择建站服务商，部署远憬cms。</li>
            <li>2.设计PC端和移动端原型图。</li>
            <li>3.根据原型图，对远憬模板进行二次开发。</li>
            <li>4.调取产品数据，展现商品内容，设计交互动画。</li>
            <li>5.完善网站内容，优化用户体验</li>
            <li>
              6.规范前端代码，整理代码结构，使用语义化标签，
              是代码可维护利于SEO
            </li>
          </ul>
        </div>
        <div class="timeline-box">
          <div class="timeline-title">
            <h4>
              <span class="dot"></span>蓝悦美和矿泉饮品有限公司官网
            </h4>
          </div>
          <ul class="timeline-content">
            <li>
              1.域名、虚拟主机购买与备案，安装PHP，MySQL，
              WordPress，Apache
            </li>
            <li>
              2.设计原型图，根据原型图，对WordPress模板
              进行二次开发。
            </li>
            <li>
              3.丰富网站内容，设计轮播图、视差滚动等交互效果，
              优化用户体验。
            </li>
            <li>4.完善网站功能，添加留言模块，并实现导出数据。</li>
            <li>
              5.规范前端代码，整理代码结构，使用语义化标签，
              使代码可维护利于SEO
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentheader from "@/components/contentheader"; //页眉模板
export default {
  name: "workexp",
  data() {
    return {
      // 页眉参数
      msg: "工作经历",
      header2: "WORK EXPERIENCE",
      header3: "03",
      header5: "EXPERIENCE"
    };
  },
  components: {
    contentheader
  }
};
</script>
<style scoped>
.workexp {
  position: relative;
  width: 90%;
  padding-top: 8rem;
  margin-bottom: 8rem;
}
.timeline {
  justify-content: center;
  height: 100%;
}
.timeline-border {
  width: 0.6rem;
  height: 95%;
  background-color: #ff6e5d;
  position: absolute;
  left: 45%;
}
.timeline-box {
  display: flex;
  position: relative;
  padding: 80px 0px;
}
.timeline-title {
  flex-flow: wrap;
  font-size: 2rem;
  flex: 1;
  padding-right: 5px;
}
.timeline-title .dot {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #ff6e5d;
  margin-right: 1.5rem;
}
.timeline-content {
  text-indent:2rem;
  flex-flow: wrap;
  flex: 1;
  padding: 1rem;
}
.timeline-content > h4 {
  font-size: 2rem;
  font-weight: lighter;
  display: block;
}
.timeline-content > li {
  font-size: 2rem;
  line-height: 3.5rem;
}
</style>
