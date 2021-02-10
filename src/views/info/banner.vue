<template>
  <div class="banner-bg layout">
    <nav>
      <ul class="clearfix">
        <li>
        <a class="fastlink" href="#basicinfo">基本信息</a>
        </li>
        <li>
           <a class="fastlink" href="#skillsexp">技能特长</a>
        </li>
        <li>
           <a class="fastlink" href="#workexp">工作经历</a>
        </li>
        <li>
         <a class="fastlink" href="#projectexp">项目经验</a>
        </li>
      </ul>
    </nav>
    <div class="content">
      <h1>
        PERSONAL
        <br />RESUNME
      </h1>
      <h4>
        <span>个</span>|
        <span>人</span>|
        <span>简</span>|
        <span>历</span>
      </h4>
      <div class="decorate-banner"></div>
      <h3>WEB前端</h3>
      <h2>刘佳奇</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      msg: "个人简历页面"
    };
  },
  mounted() {},
  methods: {},
  watch: {}
};
</script>
<style scoped>
.banner-bg {
  width: 100%;
  height: 100%;
  max-width: 1920px;
  background: url('~@/assets/images/banner.jpg') no-repeat;
  background-size: cover;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}
nav {
  margin: 1rem;
  border-bottom: 0.1rem white solid;
}
nav > ul {
  padding-right: 2rem;
  float: right;
}
nav > ul > li {
  padding: 0 3rem 1rem 0;
 float: left;
}
nav >  ul > li  > .fastlink  {
  display: inline-block;
  font-size: 1.5rem;
  color: white;
  text-decoration:  none;
}
nav >  ul > li  > .fastlink:hover{
  color: #ff6e5d;
  text-shadow: 2px 2px 2px rgb(85, 85, 85);
}
.content {
  margin-top: 5rem;
  color: white;
  padding-left: 5rem;
}
.content > h1 {
  margin-top: 2rem;
  line-height: 12rem;
  font-size: 7rem;
}
.content > .decorate-banner {
  width: 90px;
  margin: 8rem 0;
}
.content > h4 {
  font-size: 2rem;
  margin-left: -3rem;
  margin-top: -1rem;
  font-weight: lighter;
}
.content > h4  > span {
  display: inline-block;
  margin: 0 3rem;
}
.content > h2 {
  margin-top: 2rem;
  font-size: 4rem;
}
.content > h3 {
  font-weight: normal;
  font-size: 3rem;
}
</style>