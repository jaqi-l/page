import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";
import llmstxt from 'vitepress-plugin-llms'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config(md) {
      md.use(MermaidMarkdown); // add this
    },
  },
  vite: {
    plugins: [llmstxt(), MermaidPlugin()],
    optimizeDeps: { // include mermaid
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
  title: "jaqi.page",
  description: "",
  lastUpdated: true,
  appearance: true,
  base: '',
  sitemap: {
    hostname: 'https://www.jaqi.top'
  },
  head: [
    ['meta', { name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    returnToTopLabel: '回到顶部',
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'K9PM45UE0N',
        apiKey: 'ca4f7601cb2c62d024fd074cad1c35ce',
        indexName: 'jaqi',
        placeholder: "搜索文档",
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            searchBox: {
              resetButtonTitle: "清除查询条件",
              resetButtonAriaLabel: "清除查询条件",
              cancelButtonText: "取消",
              cancelButtonAriaLabel: "取消"
            },
            startScreen: {
              recentSearchesTitle: "搜索历史",
              noRecentSearchesText: "没有搜索历史",
              saveRecentSearchButtonTitle: "保存至搜索历史",
              removeRecentSearchButtonTitle: "从搜索历史中移除",
              favoriteSearchesTitle: "收藏",
              removeFavoriteSearchButtonTitle: "从收藏中移除"
            },
            errorScreen: {
              titleText: "无法获取结果",
              helpText: "你可能需要检查你的网络连接"
            },
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
              searchByText: "搜索提供者"
            },
            noResultsScreen: {
              noResultsText: "无法找到相关结果",
              suggestedQueryText: "你可以尝试查询",
              reportMissingResultsText: "你认为该查询应该有结果？",
              reportMissingResultsLinkText: "点击反馈"
            }
          }
        }
      }
    },
    footer: {
      copyright: 'jaqi.note © jaqi.l @25.08.05.1 V3'
    },
    nav: [
      { text: '导航', link: '/' },
      { text: '前端文档', link: '/frontend/html/introduction' },
      { text: '其他文档', link: '/other/linux/introduction' },
      { text: 'jaqi.server', link: 'https://jaqi.synology.me:5001/' },
      { text: 'jaqi.csnd', link: 'https://blog.csdn.net/ljq547152849' },
    ],
    sidebar: {
      '/frontend/': [{
        items: [
          {
            text: '第一章：HTML5',
            collapsed: true,
            items: [
              {
                text: '1.1 HTML概述',
                link: '/frontend/html/introduction'
              },
              {
                text: '1.2 html元素',
                link: '/frontend/html/element/index',
                items: [
                  {
                    text: '1.2.1 文本元素',
                    link: '/frontend/html/element/text'
                  },
                  {
                    text: '1.2.2 a元素',
                    link: '/frontend/html/element/link'
                  },
                  {
                    text: '1.2.3 img元素',
                    link: '/frontend/html/element/img'
                  },
                  {
                    text: '1.2.4 列表',
                    link: '/frontend/html/element/list'
                  },
                  {
                    text: '1.2.5 表格',
                    link: '/frontend/html/element/table'
                  },
                  {
                    text: '1.2.6 表单',
                    link: '/frontend/html/element/form'
                  },
                  {
                    text: '1.2.7 媒体元素',
                    link: '/frontend/html/element/media'
                  },
                  {
                    text: '1.2.8 布局元素',
                    link: '/frontend/html/element/layout'
                  },
                  {
                    text: '1.2.9 canvas元素',
                    link: '/frontend/html/element/canvas'
                  },
                  {
                    text: '1.2.10 SVG元素',
                    link: '/frontend/html/element/SVG'
                  },
                  {
                    text: '1.2.11 iframe元素',
                    link: '/frontend/html/element/iframe'
                  }
                ]
              },
              {
                text: '1.3 html属性',
                link: '/frontend/html/attribute'
              },
              {
                text: '1.4 HTML5大纲算法',
                link: '/frontend/html/outliner'
              }
            ]
          },
          {
            text: '第二章：CSS',
            link: '/frontend/css/introduction',
            collapsed: true,
            items: [
              {
                text: '2.1 CSS概述',
                link: '/frontend/css/introduction'
              },
              {
                text: '2.2 CSS选择器',
                link: '/frontend/css/selector'
              },
              {
                text: '2.3 CSS属性',
                link: '/frontend/css/attribute'
              },
              {
                text: '2.4 CSS盒模型',
                link: '/frontend/css/box'
              },
              {
                text: '2.5 CSS定位',
                link: '/frontend/css/location'
              },
              {
                text: '2.6 CSS布局',
                link: '/frontend/css/layout'
              },
              {
                text: '2.7 CSS动画',
                link: '/frontend/css/animation'
              },
              {
                text: '2.8 CSS雪碧图',
                link: '/frontend/css/sprite'
              },
              {
                text: '2.9 CSS函数与预编译器',
                link: '/frontend/css/function'
              },
            ]
          },
          {
            text: '第三章：JavaScript',
            link: '/frontend/javascript/var',
            collapsed: true,
            items: [
              {
                text: '3.1 变量',
                link: '/frontend/javascript/var'
              },
              {
                text: '3.2 数据类型',
                link: '/frontend/javascript/datatype'
              },
              {
                text: '3.3 运算符',
                link: '/frontend/javascript/symbol'
              },
              {
                text: '3.4 控制语句',
                link: '/frontend/javascript/control'
              },
              {
                text: '3.5 函数',
                link: '/frontend/javascript/function'
              },
              {
                text: '3.6 对象',
                link: '/frontend/javascript/object'
              },
              {
                text: '3.7 日期和时间对象',
                link: '/frontend/javascript/date'
              },
              {
                text: '3.8 Math对象',
                link: '/frontend/javascript/math'
              },
              {
                text: '3.9 字符串对象',
                link: '/frontend/javascript/string'
              },
              {
                text: '3.10 BOM',
                link: '/frontend/javascript/BOM'
              },
              {
                text: '3.11 DOM',
                link: '/frontend/javascript/DOM'
              },
              {
                text: '3.12 事件',
                link: '/frontend/javascript/event'
              },
              {
                text: '3.13 正则',
                link: '/frontend/javascript/reg'
              },
              {
                text: '3.14 同步与异步',
                link: '/frontend/javascript/sync_asyn'
              },
              {
                text: '3.15 面向对象编程',
                link: '/frontend/javascript/oop'
              },
              {
                text: '3.16 ECMAScript',
                link: '/frontend/javascript/ECMAScript'
              },
              {
                text: '3.17 TypeScript',
                link: '/frontend/javascript/TypeScript'
              }, {
                text: '3.18 文件系统',
                link: '/frontend/javascript/File'
              }
            ]
          },
          {
            text: '第四章：jQuery',
            link: '/frontend/jquery'
          },
          {
            text: '第五章：ajax',
            link: '/frontend/ajax'
          },
          {
            text: '第六章：vue.js',
            link: '/frontend/vue/introduction',
            collapsed: true,
            items: [
              {
                text: '6.1 基本介绍',
                link: '/frontend/vue/introduction'
              },
              {
                text: '6.2 指令系统',
                link: '/frontend/vue/control'
              },
              {
                text: '6.3 组件系统',
                link: '/frontend/vue/component'
              },
              {
                text: '6.4 过滤器',
                link: '/frontend/vue/filter'
              },
              {
                text: '6.5 插槽',
                link: '/frontend/vue/slot'
              },
              {
                text: '6.6 属性方法',
                link: '/frontend/vue/methods'
              },
              {
                text: '6.7 生命周期',
                link: '/frontend/vue/lifecycle'
              },
              {
                text: '6.8 Vue Router',
                link: '/frontend/vue/router'
              },
              {
                text: '6.9 异步',
                link: '/frontend/vue/async'
              },
              {
                text: '6.10 过渡与动画',
                link: '/frontend/vue/transitions'
              },
              {
                text: '6.11 Api',
                link: '/frontend/vue/api'
              },
              {
                text: '6.12 组合式Api',
                link: '/frontend/vue/setup'
              },
              {
                text: '6.13 占位',
                link: ''
              },
              {
                text: '6.14 Vue/Cli',
                link: '/frontend/vue/vuecli'
              },
              {
                text: '6.15 vuex',
                link: '/frontend/vue/vuex'
              }, {
                text: '6.16 vite',
                link: '/frontend/vue/vite'
              }, {
                text: '6.17 Pinia',
                link: '/frontend/vue/pinia'
              },
              {
                text: '6.18 vue2源码',
                link: 'http://caibaojian.com/vue-design/',
                target: '_blank',
                rel: 'sponsored'
              }
            ]
          },
          {
            text: '第七章：webpack',
            link: '/frontend/webpack'
          },
          {
            text: '第八章：小程序',
            link: '/frontend/miniprogram/introduction',
            collapsed: true,
            items: [
              {
                text: '8.1 概览',
                link: '/frontend/miniprogram/introduction'
              },
              {
                text: '8.2 wxml 特性',
                link: '/frontend/miniprogram/wxml'
              },
              {
                text: '8.3 wxss 特性',
                link: '/frontend/miniprogram/wxss'
              },
              {
                text: '8.4 wxs 特性',
                link: '/frontend/miniprogram/wxs'
              },
              {
                text: '8.5 运行机制',
                link: '/frontend/miniprogram/runtime'
              },
              {
                text: '8.6 路由',
                link: '/frontend/miniprogram/router'
              },
              {
                text: '8.7 事件',
                link: '/frontend/miniprogram/event'
              },
              {
                text: '8.8 组件',
                link: '/frontend/miniprogram/component'
              },
              {
                text: '8.9 API',
                link: '/frontend/miniprogram/api'
              }
            ]
          },
          {
            text: '第九章：React',
            link: '/frontend/react/introduction',
            collapsed: true,
            items: [
              {
                text: '9.1 基本介绍',
                link: '/frontend/react/introduction'
              },
              {
                text: '9.2 方法',
                link: '/frontend/react/methods'
              },
              {
                text: '9.3 组件系统',
                link: '/frontend/react/component'
              },
              {
                text: '9.4 Redux',
                link: '/frontend/react/redux'
              },
              {
                text: '9.5 路由',
                link: '/frontend/react/router'
              }
            ]
          },
          {
            text: '第十章：微前端',
            link: '/frontend/microFrontends'
          },
          {
            text: '第十一章：Web3D',
            link: '/frontend/web3D'
          }
        ]
      }],
      '/other/': [{
        items: [
          {
            text: '第一章：Linux',
            link: '/other/linux/introduction',
            collapsed: true,
            items: [
              {
                text: '1.1 概述',
                link: '/other/linux/introduction',
              },
              {
                text: '1.2 文件管理',
                link: '/other/linux/file'
              },
              {
                text: '1.3 vi文本编辑器',
                link: '/other/linux/vi'
              },
              {
                text: '1.4 用户与用户管理',
                link: '/other/linux/user'
              },
              {
                text: '1.5 网络管理',
                link: '/other/linux/network'
              },
              {
                text: '1.6 软件安装',
                link: '/other/linux/software'
              },
              {
                text: '1.7 进程管理',
                link: '/other/linux/process'
              },
              {
                text: '1.8 内存与磁盘管理',
                link: '/other/linux/memory_disk'
              }
            ]
          },
          {
            text: '第二章：Nginx',
            link: '/other/nginx/introduction',
            collapsed: true,
            items: [
              {
                text: '2.1 基本介绍',
                link: '/other/nginx/introduction',
              },
              {
                text: '2.2 构架基础',
                link: '/other/nginx/framework'
              },
              {
                text: '2.3 HTTP模块',
                link: '/other/nginx/http'
              },
              {
                text: '2.4 反向代理与负载均衡',
                link: '/other/nginx/proxy'
              },
              {
                text: '2.5 配置文件详解',
                link: '/other/nginx/config'
              }
            ]
          },
          {
            text: '第三章：web协议',
            link: '/other/network/introduction',
            collapsed: true,
            items: [
              {
                text: '3.1 Web协议',
                link: '/other/network/introduction',
              },
              {
                text: '3.2 HTTP/1.1协议',
                link: '/other/network/http_1'
              },
              {
                text: '3.3 WebSocket协议',
                link: '/other/network/webSocket'
              },
              {
                text: '3.4 HTTP/2协议',
                link: '/other/network/http_2'
              },
              {
                text: '3.5 TLS/SSL协议',
                link: '/other/network/tls_ssl'
              },
              {
                text: '3.6 TCP协议',
                link: '/other/network/tcp'
              },
              {
                text: '3.7 UDP协议',
                link: '/other/network/udp'
              },
              {
                text: '4.8 IP协议',
                link: '/other/network/ip'
              }
            ]
          },
          {
            text: '第四章：SEO',
            link: '/other/seo'
          },
          {
            text: '第五章：Git',
            link: '/other/git'
          },
          {
            text: '第六章：FreeMarker',
            link: '/other/freeMarker'
          },
          {
            text: '第七章：node.js',
            link: '/other/node/introduction',
            collapsed: true,
            items: [
              {
                text: '7.1 node.js概述',
                link: '/other/node/introduction',
              },
              {
                text: '7.2 系统核心模块',
                link: '/other/node/modules'
              },
              {
                text: '7.3 第三方模块',
                link: '/other/node/otherModules'
              },
              {
                text: '7.4 node.js 框架',
                link: '/other/node/frame'
              },
              {
                text: '7.5 node.js 工具',
                link: '/other/node/tools'
              }
            ]
          },
          {
            text: '第八章：数据库',
            link: '/other/database/introduction',
            collapsed: true,
            items: [
              {
                text: '8.1 数据库概述',
                link: '/other/database/introduction',
              },
              {
                text: '8.2 MySQL',
                link: '/other/database/mySQL'
              },
              {
                text: '8.3 MongoDB',
                link: '/other/database/MongoDB'
              },
              {
                text: '8.4 SQLite',
                link: '/other/database/sqlite'
              },
              {
                text: '8.5 WebSQL',
                link: '/other/database/webSQL'
              },
              {
                text: '8.6 IndexedDB',
                link: '/other/database/indexedDB'
              }
            ]
          },
          {
            text: '第九章：Docker',
            link: '/other/docker/introduction',
            collapsed: true,
            items: [
              {
                text: '9.1 概述',
                link: '/other/docker/introduction',
              },
              {
                text: '9.2 镜像命令',
                link: '/other/docker/images'
              },
              {
                text: '9.3 容器命令',
                link: '/other/docker/container'
              },
              {
                text: '9.4 DockerFile',
                link: '/other/docker/dockerFile'
              },
              {
                text: '9.5 Docker数据卷(volume)',
                link: '/other/docker/volume'
              },
              {
                text: '9.6 Docker网络',
                link: '/other/docker/network'
              }
            ]
          },
          {
            text: '第十章：数据结构与算法',
            link: '/other/dataStructure_algorithm'
          },
          {
            text: '第十一章 设计模式',
            link: '/other/designPattern'
          },
          {
            text: '第十二章：Python',
            link: '/other/python/introduction',
            collapsed: true,
            items: [
              {
                text: '12.1 介绍、安装',
                link: '/other/python/introduction',
              },
              {
                text: '12.2 数据类型',
                link: '/other/python/datatype'
              },
              {
                text: '12.3 条件和循环',
                link: '/other/python/control'
              },
              {
                text: '12.4 文件系统',
                link: '/other/python/io'
              },
              {
                text: '12.5 函数、模块',
                link: '/other/python/function'
              },
              {
                text: '12.6 面对对象编程',
                link: '/other/python/oop'
              },
              {
                text: '12.7 多线程编程',
                link: '/other/python/multithreading'
              },
              {
                text: '12.8 标准库',
                link: '/other/python/package'
              },
              {
                text: '12.9 第三方库',
                link: '/other/python/extendPackage'
              }
            ]
          },
          {
            text: '第十三章：风格规范',
            link: '/other/specification/html',
            collapsed: true,
            items: [
              {
                text: '13.1 HTML规范',
                link: '/other/specification/html',
              },
              {
                text: '13.2 JavaScript规范',
                link: '/other/specification/javaScript'
              },
              {
                text: '13.3 CSS规范',
                link: '/other/specification/css'
              },
              {
                text: '13.4 代码检测',
                link: '/other/specification/code'
              },
              {
                text: '13.5 提交规范',
                link: '/other/specification/commit'
              },
              {
                text: '13.6 分支管理规范',
                link: '/other/specification/branch'
              },
              {
                text: '13.7 UI规范',
                link: '/other/specification/ui'
              },
              {
                text: '13.8 代码组织模式',
                link: '/other/specification/COM'
              }
            ]
          },
          {
            text: '第十四章：AI',
            link: '/other/ai/introduction',
            collapsed: true,
            items: [
              {
                text: '14.1 概述',
                link: '/other/ai/introduction',
              },
              {
                text: '14.2 大模型',
                link: '/other/ai/llm',
              },
              {
                text: '14.3 提示词',
                link: '/other/ai/prompt',
              },
              {
                text: '14.4 Function Call',
                link: '/other/ai/FunctionCall',
              },
              {
                text: '14.5 MCP',
                link: '/other/ai/mcp',
              }
            ]
          }
        ]
      }]
    }
  }
})
