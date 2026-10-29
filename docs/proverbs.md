---
title: 名人名言
sidebar: false
outline: false
---

<script setup>
import { ref, computed } from 'vue'
import proverbsData from './public/proverbs.json'

const groups = ref(proverbsData)
const keyword = ref('')
const activeCategory = ref('')

const totalCount = computed(() =>
  groups.value.reduce((sum, g) => sum + (g.children?.length || 0), 0)
)

const filteredGroups = computed(() => {
  let result = groups.value
  if (activeCategory.value) {
    result = result.filter(g => g.title === activeCategory.value)
  }
  if (!keyword.value.trim()) return result
  const kw = keyword.value.trim().toLowerCase()
  return result
    .map(g => ({
      ...g,
      children: (g.children || []).filter(
        c =>
          (c.value || '').toLowerCase().includes(kw) ||
          (c.source || '').toLowerCase().includes(kw)
      )
    }))
    .filter(g => g.children.length > 0)
})
</script>

<client-only>
<div class="proverbs-page">
  <!-- 顶部标题区 -->
  <div class="page-header">
    <h1 class="page-title">名人名言</h1>
    <p class="page-subtitle">共 {{ totalCount }} 条 · {{ groups.length }} 个分类</p>
  </div>

  <!-- 搜索框 -->
  <div class="search-bar">
    <input
      v-model="keyword"
      type="text"
      class="search-input"
      placeholder="搜索名言内容"
    />
    <span v-if="keyword" class="search-clear" @click="keyword = ''">✕</span>
  </div>

  <!-- 分类 Tab -->
  <div class="category-tabs">
    <button
      class="tab-btn"
      :class="{active: activeCategory === ''}"
      @click="activeCategory = ''"
    >
      全部 <span class="tab-count">({{ totalCount }})</span>
    </button>
    <button
      v-for="g in groups"
      :key="g.title"
      class="tab-btn"
      :class="{active: activeCategory === g.title}"
      @click="activeCategory = g.title"
    >
      {{ g.title }} <span class="tab-count">({{ g.children.length }})</span>
    </button>
  </div>

  <!-- 名言列表 -->
  <div class="proverbs-container">
    <template v-for="g in filteredGroups" :key="g.title">
      <h2 class="group-title" v-if="activeCategory === ''">
        <span class="group-icon">❝</span>{{ g.title }}
        <span class="group-count">{{ g.children.length }} 条</span>
      </h2>
      <div class="proverb-grid">
        <div
          v-for="(item, idx) in g.children"
          :key="g.title + idx"
          class="proverb-card"
        >
          <span class="card-quote">"</span>
          <p class="card-text">{{ item.value }}</p>
          <span class="card-author" v-if="item.source">—— {{ item.source }}</span>
        </div>
      </div>
    </template>
    <div v-if="filteredGroups.length === 0" class="empty-state">
      <p>未找到匹配的名言</p>
    </div>
  </div>
</div>
</client-only>

<style>
.proverbs-page {
  max-width: none;
  margin: 0 auto;
  padding: 2em  0 4em;
}

/* 标题区 */
.page-header {
  text-align: center;
  margin-bottom: 2em;
  padding-bottom: 1.5em;
  border-bottom: 1px solid var(--vp-c-divider, #eaecef);
}
.page-title {
  margin: 0 0 0.3em;
  font-size: 2.2em;
  font-weight: 700;
  background: linear-gradient(135deg, #1890ff, #722ed1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.page-subtitle {
  margin: 0;
  color: var(--vp-c-text-2, var(--c-text-lighter));
  font-size: 0.95em;
}

/* 搜索框 */
.search-bar {
  position: relative;
  max-width: 480px;
  margin: 0 auto 1.5em;
}
.search-input {
  width: 100%;
  padding: 0.8em 2.5em 0.8em 1.2em;
  font-size: 0.95em;
  border: 1px solid var(--vp-c-divider, #dcdfe6);
  border-radius: 2em;
  outline: none;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, var(--c-text));
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.15);
}
.search-clear {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--vp-c-text-3, var(--c-text-lighter));
  font-size: 0.85em;
  padding: 0 4px;
}
.search-clear:hover {
  color: #1890ff;
}

/* 分类 Tab */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em;
  justify-content: center;
  margin-bottom: 2.5em;
}
.tab-btn {
  padding: 0.5em 1.2em;
  border: 1px solid var(--vp-c-divider, #dcdfe6);
  border-radius: 2em;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, var(--c-text));
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}
.tab-btn.active {
  background: linear-gradient(135deg, #1890ff, #722ed1);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
}
.tab-count {
  opacity: 0.7;
  font-size: 0.9em;
}

/* 分组标题 */
.group-title {
  margin: 2em 0 1em;
  font-size: 1.25em;
  color: var(--vp-c-text-1, var(--c-text));
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding-bottom: 0.4em;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(90deg, #1890ff, transparent) 1;
}
.group-icon {
  color: #1890ff;
  font-size: 1.1em;
}
.group-count {
  font-size: 0.7em;
  color: var(--vp-c-text-3, var(--c-text-lighter));
  font-weight: normal;
  padding: 0.15em 0.6em;
  background: rgba(24, 144, 255, 0.1);
  border-radius: 1em;
}

/* 卡片网格 */
.proverb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1em;
}

/* 名言卡片 */
.proverb-card {
  position: relative;
  padding: 1.2em 1.4em;
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-divider, #ebeef5);
  border-radius: 0.75em;
  transition: all 0.25s ease;
  min-height: 90px;
}
.proverb-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(24, 144, 255, 0.12);
  border-color: rgba(24, 144, 255, 0.4);
}
.card-quote {
  position: absolute;
  top: 2px;
  left: 10px;
  font-size: 2.4em;
  color: #1890ff;
  font-family: Georgia, serif;
  line-height: 1;
  opacity: 0.25;
}
.card-text {
  position: relative;
  z-index: 1;
  margin: 0 0 0.6em;
  font-size: 0.92em;
  line-height: 1.75;
  color: var(--vp-c-text-1, var(--c-text));
  font-style: italic;
  word-break: break-word;
}
.card-author {
  display: block;
  text-align: right;
  font-size: 0.78em;
  color: var(--vp-c-text-3, var(--c-text-lighter));
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4em 2em;
  color: var(--vp-c-text-3, var(--c-text-lighter));
  font-size: 1em;
}
</style>
