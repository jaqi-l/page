---
name: ecmascript-feature-updater
description: 将新的技术文档内容更新到项目对应的栏目里。当用户给出新特性/新技术文档 URL 并要求更新开发文档时触发。
---

# 项目文档特性更新

把用户提供的新技术内容整合进项目已有的主题文档。优先归入现有文档，必要时可以新增章节、新文件甚至新目录——不确定时要么问用户，要么自己判断。

## 项目目录结构

所有文档位于 `/Users/jaqi.l/Documents/page/docs/`，Vitepress 侧边栏配置在 `.vitepress/config.mts`。

```
docs/
├── frontend/              # 前端开发
│   ├── html/              # 第一章：HTML5
│   ├── css/               # 第二章：CSS
│   ├── javascript/        # 第三章：JavaScript (ES2025更新集中在这里)
│   ├── jquery/            # 第四章：jQuery
│   ├── ajax/              # 第五章：ajax
│   ├── vue/               # 第六章：vue.js
│   ├── webpack/           # 第七章：webpack
│   ├── miniprogram/       # 第八章：小程序
│   ├── react/             # 第九章：React
│   ├── microFrontends/    # 第十章：微前端
│   └── web3D/             # 第十一章：Web3D
└── other/                 # 其他技术
    ├── linux/             # 第一章：Linux
    ├── nginx/             # 第二章：Nginx
    ├── network/           # 第三章：web协议
    ├── seo/               # 第四章：SEO
    ├── git/               # 第五章：Git
    ├── freeMarker/        # 第六章：FreeMarker
    ├── node/              # 第七章：node.js
    ├── database/          # 第八章：数据库
    ├── docker/            # 第九章：Docker
    ├── dataStructure_algorithm/  # 第十章：数据结构与算法
    ├── designPattern/     # 第十一章：设计模式
    ├── python/            # 第十二章：Python
    ├── specification/     # 第十三章：风格规范
    └── ai/                # 第十四章：AI
```

## 处理流程

1. **抓取**：用 WebFetch 获取用户给出的文档 URL，提取核心内容（特性/技术点清单、描述、代码示例）。如果直接抓取失败（知乎/CSDN 反爬），改用浏览器 MCP 打开页面并读取快照文本。
2. **判断归属模块**：根据内容关键词匹配到上述目录结构中的某个模块。如果内容可能跨模块，选最贴合主题的那个（例如"ES2025" → javascript，"Vue 3.5" → vue，"React Server Components" → react）。
3. **定位目标文档**：进入模块目录，读 Vitepress 配置或目录结构，找到最合适的子章节文档。原则：
   - 对已有主题的扩展 → 归入该主题的现有文档（如 `Promise.try` 归入 `sync_asyn.md` 的 Promise 小节）
   - 全新主题且模块下已有聚合文档 → 归入该聚合文档（如 ES 新特性归入 `ECMAScript.md`）
   - 全新主题且模块下没有合适聚合文档 → 新建独立 md 文件（同时更新 `.vitepress/config.mts` 侧边栏）
   - 完全超出现有模块范围 → 可以问用户要不要新建模块，或自己判断后直接新建
4. **分类处理**：判断是"对以往内容的更新"还是"新增的主题"：
   - **更新** = 扩展了已有对象/方法/概念的能力（如新 API、新参数、新语法）→ 直接插入原位置
   - **新增** = 引入了全新的概念/API/语法 → 在文末新建二级标题
5. **去重检查**：读取目标文件，确认该内容尚未出现。如果已存在同名内容，仅补充遗漏的示例或说明，不重复追加。
6. **执行更新**：按下方"更新规则"写入。

## JavaScript 模块精细映射（高频更新区）

JS 模块是更新最频繁的区域，以下是特性→文件的精确映射：

| 特性 | 目标文件 | 插入位置 |
| --- | --- | --- |
| Promise 方法（`Promise.try`、`Promise.withResolvers`） | `sync_asyn.md` | 3.14.2 Promise 方法列表内 |
| Set / Map 新方法 | `ECMAScript.md` | 3.16.10 Set与Map 对应小节内 |
| 正则增强（`RegExp.escape`、行内修饰符、重复命名捕获组） | `reg.md` | 文末新增二级标题（如 3.13.5 ES2025新增特性） |
| JSON 模块导入（`with { type: 'json' }`） | `object.md` | 3.6.3 Json 小节末尾 |
| 数值类型扩展（`Decimal`、`Float16Array`、`Math.sumPrecise`） | `datatype.md` | 3.2.2 Number 浮点精度问题之后 |
| 管道操作符 `\|>`、迭代器帮助方法、Object/Math 新方法 | `ECMAScript.md` | 文末新增二级标题 |
| 模式匹配 `match` | `control.md` | 3.4.3 switch 语句之后 |
| `Temporal` API | `date.md` | 文末新增二级标题 |
| 导入属性 / Import Attributes | `ECMAScript.md` | 3.16.20 ES6 Module 内 |

## 新建 vs 归入的决策原则

遇到"该归入现有文档还是新建章节/新文件"的判断时，按以下优先级处理：

1. **直接归入**：内容明显是已有主题的扩展（如 Promise 新方法、Set 新方法）→ 直接追加
2. **直接新建**：内容是独立的大主题（如 Temporal API、微前端框架对比），现有文档没有合适位置 → 文末新建二级标题或新建 md 文件
3. **拿不准时问用户**：内容介于两者之间，或涉及是否要新建整个模块目录 → 简短问一句，比如"这个内容比较独立，要不要新建一个 xxx 文档？"
4. **也可以自己定**：如果用户之前表现出偏好（比如之前让你直接新建过），或判断新建更合理 → 直接做，做完告诉用户你的决定

## 更新规则

### 对以往内容的更新

- **位置**：直接插入原方法/概念所在的小节内，作为该小节的一个子条目。
- **格式**：与同小节现有写法保持一致。
- **版本标注**：已定稿的标准化特性加 `<span style="color: red">*</span>ESXXXX新增`（JS）或对应版本标注；其他模块如有版本标注习惯也沿用。
- **示例**：`Promise.try` 直接加在 Promise 方法列表里；Set 新方法加在 Set 小节里并提示可替代上文手写示例。

### 新增的主题

- **位置**：在目标文件文末新增二级标题（`##`），编号接续该文件现有最大章节号。
- **标题格式**：`## 特性名称（Stage X提案）` 或 `## 特性名称<span style="color: red">*</span>ESXXXX新增`，视模块风格调整。
- **内容结构**：设计目标 → 优缺点 → 适用场景 → 代码示例（与模块现有风格一致）。
- **完全新模块**：如果模块下没有合适的聚合文档，新建独立 md 文件，并更新 `.vitepress/config.mts` 侧边栏配置。

### 未定稿特性

- 明确标注 Stage 编号（如 "Stage 2提案"），说明"仍在提案流程中，尚未纳入正式标准，语法可能变化"。
- 不确定状态时查 TC39 finished-proposals：https://github.com/tc39/proposals/blob/main/finished-proposals.md

## 文档风格约定

- 代码示例用 ` ```js ` 包裹（JS 模块）；其他模块用对应语言标记
- 版本标注统一用 `<span style="color: red">*</span>ESXXXX新增`，与文档现有写法一致
- 中文描述，代码注释也用中文
- 不改动原文已有内容，只在指定位置追加
- 如果目标文件已有 `::: tip 参考文档` 块，在其中补充新参考链接
- Vitepress 配置改动仅在新建 md 文件时需要

## 参考

- TC39 已完成提案：https://github.com/tc39/proposals/blob/main/finished-proposals.md
- TC39 所有提案：https://github.com/tc39/proposals
