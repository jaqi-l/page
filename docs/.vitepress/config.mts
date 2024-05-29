import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "jaqi.page",
  description: "",
  lastUpdated: true,
  appearance: true,
  base: '',
  head: [
    ['meta', { name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 百度统计
    [
      "script",
      {},
      `
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?b7303024b1d1000570507a8af21071bd";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
           `
    ],
  ],
  themeConfig: {
    lastUpdatedText: '最后更新时间',
    search: {
      provider: 'local',
      // options: {
      //   appId: '87COFO7UGR',
      //   apiKey: 'c51c83018a9a3f55462529ad9e80976d',
      //   indexName: 'jaqi.page',
      //   locales: {
      //     zh: {
      //       placeholder: "搜索文档",
      //       translations: {
      //         button: {
      //           buttonText: "搜索文档",
      //           buttonAriaLabel: "搜索文档"
      //         },
      //         modal: {
      //           searchBox: {
      //             resetButtonTitle: "清除查询条件",
      //             resetButtonAriaLabel: "清除查询条件",
      //             cancelButtonText: "取消",
      //             cancelButtonAriaLabel: "取消"
      //           },
      //           startScreen: {
      //             recentSearchesTitle: "搜索历史",
      //             noRecentSearchesText: "没有搜索历史",
      //             saveRecentSearchButtonTitle: "保存至搜索历史",
      //             removeRecentSearchButtonTitle: "从搜索历史中移除",
      //             favoriteSearchesTitle: "收藏",
      //             removeFavoriteSearchButtonTitle: "从收藏中移除"
      //           },
      //           errorScreen: {
      //             titleText: "无法获取结果",
      //             helpText: "你可能需要检查你的网络连接"
      //           },
      //           "footer": {
      //             selectText: "选择",
      //             navigateText: "切换",
      //             closeText: "关闭",
      //             searchByText: "搜索提供者"
      //           },
      //           noResultsScreen: {
      //             noResultsText: "无法找到相关结果",
      //             suggestedQueryText: "你可以尝试查询",
      //             reportMissingResultsText: "你认为该查询应该有结果？",
      //             reportMissingResultsLinkText: "点击反馈"
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    },
    footer: {
      copyright: 'jaqi.note © jaqi.l @24.05.29.1 V3'
    },
    nav: [
      { text: '导航', link: '/' },
      { text: '前端文档', link: '/frontend/' },
      { text: '其他文档', link: '/other/' },
      { text: 'jaqi.server', link: 'https://jaqi.synology.me:5001/' },
      { text: 'jaqi.csnd', link: 'https://blog.csdn.net/ljq547152849' },
    ],

    sidebar: {
      '/frontend/': {
        base: '/frontend/',
        items: [
          {
            text: '第一章：HTML5',
            collapsed: false,
            items: [
              {
                text: '1.1 HTML概述',
                link: '/html/introduction'
              },
              {
                text: '1.2 html元素',
                link: '/html/element/index',
                items: [
                  {
                    text: '1.2.1 文本元素',
                    link: '/html/element/text'
                  },
                  {
                    text: '1.2.2 a元素',
                    link: '/html/element/link'
                  },
                  {
                    text: '1.2.3 img元素',
                    link: '/html/element/img'
                  },
                  {
                    text: '1.2.4 列表',
                    link: '/html/element/list'
                  },
                  {
                    text: '1.2.5 表格',
                    link: '/html/element/table'
                  },
                  {
                    text: '1.2.6 表单',
                    link: '/html/element/form'
                  },
                  {
                    text: '1.2.7 媒体元素',
                    link: '/html/element/media'
                  },
                  {
                    text: '1.2.8 布局元素',
                    link: '/html/element/layout'
                  },
                  {
                    text: '1.2.9 canvas元素',
                    link: '/html/element/canvas'
                  },
                  {
                    text: '1.2.10 SVG元素',
                    link: '/html/element/SVG'
                  },
                  {
                    text: '1.2.10 iframe元素',
                    link: '/html/element/iframe'
                  }
                ]
              },
              {
                text: '1.3 html属性',
                link: '/html/attribute'
              },
              {
                text: '1.4 HTML5大纲算法',
                link: '/html/outliner'
              }
            ]
          },
          {
            text: '第二章：CSS',
            link: '/css/introduction',
            collapsed: false,
            items: [
              {
                text: '2.1 CSS概述',
                link: '/css/introduction'
              },
              {
                text: '2.2 CSS选择器',
                link: '/css/selector'
              },
              {
                text: '2.3 CSS属性',
                link: '/css/attribute'
              },
              {
                text: '2.4 CSS盒模型',
                link: '/css/box'
              },
              {
                text: '2.5 CSS定位',
                link: '/css/location'
              },
              {
                text: '2.6 CSS布局',
                link: '/css/layout'
              },
              {
                text: '2.7 CSS动画',
                link: '/css/animation'
              },
              {
                text: '2.8 CSS雪碧图',
                link: '/css/sprite'
              },
              {
                text: '2.9 CSS函数与预编译器',
                link: '/css/function'
              },
            ]
          },
          {
            text: '第三章：JavaScript',
            link: '/javascript/var',
            collapsed: false,
            items: [
              {
                text: '3.1 变量',
                link: '/javascript/var'
              },
              {
                text: '3.2 数据类型',
                link: '/javascript/datatype'
              },
              {
                text: '3.3 运算符',
                link: '/javascript/symbol'
              },
              {
                text: '3.4 控制语句',
                link: '/javascript/control'
              },
              {
                text: '3.5 函数',
                link: '/javascript/function'
              },
              {
                text: '3.6 对象',
                link: '/javascript/object'
              },
              {
                text: '3.7 日期和时间对象',
                link: '/javascript/date'
              },
              {
                text: '3.8 Math对象',
                link: '/javascript/math'
              },
              {
                text: '3.9 字符串对象',
                link: '/javascript/string'
              },
              {
                text: '3.10 BOM',
                link: '/javascript/BOM'
              },
              {
                text: '3.11 DOM',
                link: '/javascript/DOM'
              },
              {
                text: '3.12 事件',
                link: '/javascript/event'
              },
              {
                text: '3.13 正则',
                link: '/javascript/reg'
              },
              {
                text: '3.14 同步与异步',
                link: '/javascript/sync_asyn'
              },
              {
                text: '3.15 面向对象编程',
                link: '/javascript/oop'
              },
              {
                text: '3.16 ECMAScript',
                link: '/javascript/ECMAScript'
              },
              {
                text: '3.17 TypeScript',
                link: '/javascript/TypeScript'
              },
            ]
          },
          {
            text: '第四章：jQuery',
            link: '/jquery'
          },
          {
            text: '第五章：ajax',
            link: '/ajax'
          },
          {
            text: '第六章：vue.js',
            link: '/vue/introduction',
            collapsed: false,
            items: [
              {
                text: '6.1 基本介绍',
                link: '/vue/introduction'
              },
              {
                text: '6.2 指令系统',
                link: '/vue/control'
              },
              {
                text: '6.3 组件系统',
                link: '/vue/component'
              },
              {
                text: '6.4 过滤器',
                link: '/vue/filter'
              },
              {
                text: '6.5 插槽',
                link: '/vue/slot'
              },
              {
                text: '6.6 methods/watch/computed',
                link: '/vue/methods'
              },
              {
                text: '6.7 生命周期',
                link: '/vue/lifecycle'
              },
              {
                text: '6.8 Vue Router',
                link: '/vue/router'
              },
              {
                text: '6.9 异步',
                link: '/vue/async'
              },
              {
                text: '6.10 过渡与动画',
                link: '/vue/transitions'
              },
              {
                text: '6.11 Api',
                link: '/vue/api'
              },
              {
                text: '6.12 组合式Api',
                link: '/vue/setup'
              },
              {
                text: '6.13 axios',
                link: '/vue/axios'
              },
              {
                text: '6.14 Vue/Cli',
                link: '/vue/vuecli'
              },
              {
                text: '6.15 vuex',
                link: '/vue/vuex'
              }, {
                text: '6.16 vite',
                link: '/vue/vite'
              }, {
                text: '6.17 Pinia',
                link: '/vue/pinia'
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
            link: '/webpack'
          },
          {
            text: '第八章：小程序',
            link: '/miniprogram'
          },
          {
            text: '第九章：React',
            link: '/react'
          },
          {
            text: '第十章：微前端',
            link: '/microFrontends'
          },
          {
            text: '第十一章：Web3D',
            link: '/web3D'
          }
        ]
      },
      '/other/': {
        base: '/other/',
        items: [
          {
            text: '第一章：Linux',
            link: '/linux'
          },
          {
            text: '第二章：Nginx',
            link: '/nginx'
          },
          {
            text: '第三章：web协议',
            link: '/network'
          },
          {
            text: '第四章：SEO',
            link: '/SEO'
          },
          {
            text: '第五章：Git',
            link: '/git'
          },
          {
            text: '第六章：FreeMarker',
            link: '/FreeMarker'
          },
          {
            text: '第七章：node.js',
            link: '/node/introduction',
            collapsed: false,
            items: [
              {
                text: '7.1 node.js概述',
                link: '/node/introduction',
              },
              {
                text: '7.2 系统核心模块',
                link: '/node/modules'
              },
              {
                text: '7.3 第三方模块',
                link: '/node/otherModules'
              },
              {
                text: '7.4 node.js 框架',
                link: '/node/frame'
              },
              {
                text: '7.5 node.js 工具',
                link: '/node/tools'
              }
            ]
          },
          {
            text: '第八章：数据库',
            link: '/database'
          },
          {
            text: '第九章：Docker',
            link: '/docker'
          },
          {
            text: '第十章：数据结构与算法',
            link: '/dataStructure_algorithm'
          },
          {
            text: '第十一章 设计模式',
            link: '/DesignPattern'
          },
          {
            text: '第十二章：Python',
            link: '/python'
          },
          {
            text: '第十三章：风格规范',
            link: '/specification'
          }
        ]
      }
    }
  }
})
