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

<!-- 名言展示 start -->
<client-only>
<div class="proverb-box" ref="proverbRef" :class="{ 'is-multi': isMultiLine }" @click="onProverbClick">
  <span class="proverb-quote">"</span>
  <p class="proverb-text" ref="proverbText">{{ currentProverb }}</p>
  <span class="proverb-author" v-if="proverbSource">—— {{ proverbSource }}</span>
</div>
</client-only>

<div class="nav">
  <template v-for="item in navList" :key="item.category">
    <div class="category-title">
       &bullet; {{ item.title }}
      <span><span class="decorate">-</span>{{ item.description }}</span>
      <div class="category-list">
        <template v-for="child in item.children" :key="child.title">
        <client-only>
          <el-tooltip
            v-if="child.description"
            class="box-item"
            effect="dark"
            :content="child.description"
            placement="bottom-end"
            trigger="contextmenu"
          >
            <a :href="child.link" target="_blank">{{ child.title }}</a> 
          </el-tooltip>
          <a v-else :href="child.link" target="_blank">{{ child.title }}</a> 
          </client-only>
          </template>
        </div>
    </div>
  </template>
</div>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import navListData from './public/navList.json'
import proverbsData from './public/proverbs.json'

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

// 名言相关
const currentProverb = ref('')
const proverbSource = ref('')
const clickCount = ref(0)
const isMultiLine = ref(false)
const proverbText = ref(null)
let clickTimer = null

// 从 proverbs.json 随机取一条
function pickRandomProverb() {
  const all = proverbsData.flatMap(g => g.children || [])
  if (all.length === 0) return
  const item = all[Math.floor(Math.random() * all.length)]
  currentProverb.value = item.value || ''
  proverbSource.value = item.source || ''
  // 下一次 DOM 更新后检测是否换行
  requestAnimationFrame(() => {
    const el = proverbText.value?.$el || proverbText.value
    if (!el) return
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
    const actualHeight = el.offsetHeight
    isMultiLine.value = actualHeight > lineHeight * 1.1
  })
}

// 点击名言区 - 10秒内连点5次跳转
function onProverbClick() {
  clickCount.value += 1
  if (clickTimer) clearTimeout(clickTimer)
  clickTimer = setTimeout(() => { clickCount.value = 0 }, 10000)
  if (clickCount.value >= 5) {
    clickCount.value = 0
    clearTimeout(clickTimer)
    window.location.href = '/proverbs'
  }
}

onMounted(() => { pickRandomProverb() })
onUnmounted(() => { if (clickTimer) clearTimeout(clickTimer) })
</script>

<style>
  .searchBox {
    display: flex;
    width: 60%;
    margin: 2em auto;
    position: relative;
  }

  /* 名言展示区 - 流光效果 */
  .proverb-box {
    max-width: calc(100% - 1.6em);
    margin: 0 auto 1em;
    padding: 0.8em 0.8em;
    background: var(--vp-c-bg-soft, rgba(24,144,255,0.04));
    border-radius: 0.6em;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    user-select: none;
    text-align: center;
    /* 呼吸微光背景 */
    background-image:
      radial-gradient(circle at 20% 50%, rgba(24,144,255,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(114,46,209,0.08) 0%, transparent 50%);
    animation: proverb-bg-pulse 8s ease-in-out infinite;
  }
  @keyframes proverb-bg-pulse {
    0%   { background-position: 0% 50%, 100% 50%; opacity: 0.75; }
    50%  { opacity: 1; }
    100% { background-position: 100% 50%, 0% 50%; opacity: 0.75; }
  }
  /* 扫光边框 */
  .proverb-box::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 0.7em;
    background: conic-gradient(
      from var(--angle, 0deg),
      transparent 0deg,
      rgba(24,144,255,0.7) 60deg,
      transparent 120deg,
      transparent 240deg,
      rgba(114,46,209,0.7) 300deg,
      transparent 360deg
    );
    z-index: -1;
    animation: proverb-border-spin 5s linear infinite;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .proverb-box::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 0.6em;
    background: var(--vp-c-bg, #fff);
    z-index: -1;
  }
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes proverb-border-spin {
    to { --angle: 360deg; }
  }
  .proverb-box:hover::before {
    opacity: 1;
  }
  .proverb-box:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(24,144,255,0.2);
  }
  .proverb-box.is-multi {
    text-align: left;
  }
  .proverb-quote {
    position: absolute;
    top: -6px;
    left: 14px;
    font-size: 2.2em;
    color: #1890ff;
    font-family: Georgia, serif;
    line-height: 1;
    opacity: 0.55;
    /* 引号流光 */
    background: linear-gradient(90deg, #1890ff, #722ed1, #1890ff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: proverb-shimmer 3.5s linear infinite;
  }
  @keyframes proverb-shimmer {
    0%   { background-position: 0% center; }
    100% { background-position: 100% center; }
  }
  .proverb-text {
    font-size: 0.95em;
    line-height: 1.7;
    margin: 0;
    font-style: italic;
    word-break: break-all;
    /* 文字流光扫过 —— 匀速从右扫到左再回来 */
    background: linear-gradient(
      100deg,
      var(--vp-c-text-1, #333) 0%,
      var(--vp-c-text-1, #333) 35%,
      #1890ff 46%,
      #722ed1 54%,
      var(--vp-c-text-1, #333) 65%,
      var(--vp-c-text-1, #333) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: proverb-text-flow 6s linear infinite;
  }
  @keyframes proverb-text-flow {
    0%   { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
  .proverb-author {
    display: inline-block;
    margin-top: 0.5em;
    font-size: 0.82em;
    color: var(--c-text-lighter);
    /* 出处也带点流光 */
    background: linear-gradient(90deg, var(--c-text-lighter), #1890ff, #722ed1, var(--c-text-lighter));
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: proverb-shimmer 4s linear infinite;
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