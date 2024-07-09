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
    returnToTopLabel:'回到顶部',
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
      copyright: 'jaqi.note © jaqi.l @24.07.09.1 V3'
    },
    nav: [
      { text: '导航', link: '/' },
      { text: '前端文档', link: '/frontend/' },
      { text: '其他文档', link: '/other/' },
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
                    text: '1.2.10 iframe元素',
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
              },
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
                text: '6.6 methods/watch/computed',
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
                text: '6.13 axios',
                link: '/frontend/vue/axios'
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
            link: '/frontend/miniprogram'
          },
          {
            text: '第九章：React',
            link: '/frontend/react'
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
            link: '/other/linux'
          },
          {
            text: '第二章：Nginx',
            link: '/other/nginx'
          },
          {
            text: '第三章：web协议',
            link: '/other/network'
          },
          {
            text: '第四章：SEO',
            link: '/other/SEO'
          },
          {
            text: '第五章：Git',
            link: '/other/git'
          },
          {
            text: '第六章：FreeMarker',
            link: '/other/FreeMarker'
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
            link: '/other/database'
          },
          {
            text: '第九章：Docker',
            link: '/other/docker'
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
            link: '/other/python'
          },
          {
            text: '第十三章：风格规范',
            link: '/other/specification'
          }
        ]
      }]
    }
  }
})
