---
layout: home
footer: true
---


<!-- 搜索框 start -->
<div class="searchBox">
  <el-input v-model="searchValue" size="large" placeholder="Please input" class="input-with-select" @keyup.enter="search">
    <template #prepend>
    <client-only>
      <el-select v-model="searcher" size="large" placeholder="Select" style="width: 90px">
        <template v-for="(item, index) in searcherList" :key="index">
          <el-option :label="item.name" :value="item.url"/>
        </template>
      </el-select>
      </client-only>
    </template>
    <template #append>
      <el-button type="primary" @click="search">搜索</el-button>
    </template>
  </el-input>
</div>

<div class="nav">
  <template v-for="item in navList" :key="item.category">
    <div class="category-title">
       &bullet; {{ item.title }}
      <span><span class="decorate">-</span>{{ item.description }}</span>
      <div class="category-list">
        <template v-for="child in item.children" :key="child.title">
          <el-tooltip
            v-if="child.description"
            class="box-item"
            effect="dark"
            :content="child.description"
            placement="bottom-end"
          >
            <a :href="child.link" target="_blank">{{ child.title }}</a> 
          </el-tooltip>
          <a v-else :href="child.link" target="_blank">{{ child.title }}</a> 
          </template>
        </div>
    </div>
  </template>
</div>

<script setup>
import { ref } from 'vue'
import navListData from './public/navList.json'

const searcherList = ref([
    {
        name: "Bing",
        key: "Bing",
        url: "https://cn.bing.com/search?q=",
        img: "@/assets/images/baidu.png"
    },
    {
        name: "百度",
        key: "baidu",
        url: "https://www.baidu.com/s?wd=",
        img: "@/assets/images/baidu.png"
    },
    {
        name: "谷歌",
        key: "google",
        url: "https://www.google.com/search?q=",
        img: "@/assets/images/google.png"
    },
    {
        name: "掘金",
        key: "juejin",
        url: "https://juejin.cn/search?query=",
        img: "@/assets/images/juejin.png"
    },
    {
        name: "知乎",
        key: "zhihu",
        url: "https://www.zhihu.com/search?type=content&q=",
        img: "@/assets/images/zhihu.png"
    },
    {
        name: "360",
        key: "360so",
        url: "https://www.so.com/s?q=",
        img: "@/assets/images/360so.png"
    },
    {
        name: "搜狗",
        key: "google",
        url: "https://www.sogou.com/web?query=",
        img: "@/assets/images/sogou.png"
    }
]);
const searcher = ref(searcherList.value[0].url);
const searchValue = ref("");

// 搜索按钮
function search () {
    window.open(`${searcher.value}${searchValue.value}`);
}

let navList = ref(navListData)
</script>

<style>
  .searchBox {
    display: flex;
    width: 60%;
    margin: 2em auto;
    position: relative;
  }
  .nav{
    margin: 2em 0;
  }
  .nav .category-title{
      box-sizing: border-box;
      font-size: 1em;
      line-height: 1.25em;
      color: var(--c-text-lighter);
      font-weight: bold;
      width: 100%;
      margin: 2em 0;
  }
  .decorate {
      font-size:1em;
      padding: 0 0.3em;
    }
   .nav .category-list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 1em;
  }
  .category-list  a{
    width: calc(100% / 7 - 0.6em);
    margin: 0.3em;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    background: rgba(230, 247, 255, 0.96);
    color: rgba(49, 70, 89, 1);
    font-size: 0.8em;
    text-align: left;
    padding: 0 0.5em;
    line-height: 2.5em;
    transition: all 0.2s;
    border-radius: 0.3em;
    text-decoration: none;
  }
  .category-list  a:hover {
    background: #1890ff 100%;
    font-weight: bold;
    color: #fff;
  } 
  #main-title ,.description{
    display: none;
  }
</style>