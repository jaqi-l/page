<template>
  <div id="nav" @click.stop="showSearcherList = false">
    <div id="home" class="inner-center main">
      <div class="content-inside">
        <!-- slogan start -->
        <div class="logo-box">字典，是惟一把成功放在工作之前的地方！</div>
        <div class="weather">
          <span>{{ weatherdata.city }}</span>
          温度:
          <span>{{ weatherdata.temperature }}</span>
          风向:
          <span>{{ weatherdata.winddirection }}</span>
          风力:
          <span>{{ weatherdata.windpower }}</span>
        </div>
        <!-- slogan end -->
        <!-- 搜索框 start -->
        <div class="searchBox">
          <input
            type="text"
            :class="showSearcherList ? 'selectSearcher' : 'searchInput'"
            v-model="searchValue"
            @keyup.enter="search"
            placeholder="请输入内容"
          />
          <img
            class="searchIcon"
            :src="searcher.img"
            alt=""
            @click.stop="showSearcherList = true"
          />
          <ul class="searcherList" v-show="showSearcherList">
            <li
              v-for="(item, index) in searcherList"
              :key="index"
              @click="selectSearcher(item)"
            >
              <img :src="item.img" alt="" />
            </li>
          </ul>
        </div>
        <!-- 搜索框 end -->
        <!-- 导航地址 start -->
        <div class="nav-content">
          <template v-if="$route.name == 'byxNav'">
            <div id="item" class="jj-list">
              <ul class="jj-list-con">
                <li>
                  <a href="https://mp.weixin.qq.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=mp.weixin.qq.com"
                    />
                    微信公众平台
                  </a>
                </li>
                <li>
                  <a href="https://rrx.cn/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=rrx.cn"
                    />
                    人人秀
                  </a>
                </li>
                <li>
                  <a href="https://818ps.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=818ps.com"
                    />
                    图怪兽
                  </a>
                </li>
                <li>
                  <a href="https://xiumi.us/#/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=818ps.com"
                    />
                    秀米编辑器
                  </a>
                </li>
                <li>
                  <a href="https://www.58pic.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.58pic.com"
                    />千图网
                  </a>
                </li>
                <li>
                  <a
                    href="http://baidule.yuansupic.com/index.html"
                    target="_blank"
                  >
                    <img src />素材下载器
                  </a>
                </li>
                <li>
                  <a href="http://ppt.koutu.vip/" target="_blank">
                    <img src />素材下载器（快设计）
                  </a>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <div id="item" class="jj-list">
              <ul class="jj-list-con">
                <li>
                  <a href="https://jaqi.gitee.io" target="_blank">
                    <img src />page
                  </a>
                </li>
                <li>
                  <a href="http://jaqi.synology.me:5000/" target="_blank">
                    <img src />cloud
                  </a>
                </li>
                <li>
                  <a href="https://jaqi-l.github.io/jaqi.note/" target="_blank">
                    <img src />note（备份）
                  </a>
                </li>
                <li>
                  <a href="https://jaqi.gitee.io/jaqi.note/" target="_blank">
                    <img src />note
                  </a>
                </li>
              </ul>
            </div>
            <div id="often" class="jj-list">
              <ul class="jj-list-con">
                <li>
                  <a href="https://www.xuexi.cn/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.xuexi.cn"
                    />学习强国
                  </a>
                </li>
                <li>
                  <a href="https://www.zhihu.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.zhihu.com"
                    />知 乎
                  </a>
                </li>
                <li>
                  <a href="https://cn.vuejs.org/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=cn.vuejs.org"
                    />
                    vue
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.weixin.qq.com/miniprogram/dev/framework/"
                    target="_blank"
                  >
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=mp.weixin.qq.com"
                    />
                    小程序开发文档
                  </a>
                </li>
                <li>
                  <a href="https://uniapp.dcloud.io/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=uniapp.dcloud.io"
                    />
                    uni-app
                  </a>
                </li>
                <li>
                  <a href="http://uviewui.com/" target="_blank">
                    <img src="http://uviewui.com/favicon.ico" />
                    uview
                  </a>
                </li>
                <li>
                  <a href="https://my.rdc.aliyun.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.aliyun.com"
                    />
                    云效
                  </a>
                </li>
                <li>
                  <a href="https://flow.aliyun.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.aliyun.com"
                    />
                    新云效
                  </a>
                </li>
                <li>
                  <a href="https://cs.console.aliyun.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.aliyun.com"
                    />
                    阿里云控制台
                  </a>
                </li>
                <li>
                  <a href="http://www.fengniao.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=www.fengniao.com"
                    />蜂鸟网
                  </a>
                </li>
                <li>
                  <a href="https://tuchong.com/" target="_blank">
                    <img
                      src="https://www.google.cn/s2/favicons?domain_url=tuchong.com"
                    />图虫
                  </a>
                </li>
                <li>
                  <a
                    href="http://baidule.yuansupic.com/index.html"
                    target="_blank"
                  >
                    <img src />素材下载器
                  </a>
                </li>
                <li>
                  <a href="http://ppt.koutu.vip/" target="_blank">
                    <img src />素材下载器（快设计）
                  </a>
                </li>
              </ul>
            </div>
          </template>

          <div id="web" class="jj-list">
            <div class="jj-list-tit">
              &bullet; web前端
              <span>- 社区、代码、参考手册</span>
            </div>
            <ul class="jj-list-con">
              <li>
                <a href="https://juejin.im/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=juejin.im"
                  />
                  掘金
                </a>
              </li>
              <li>
                <a href="https://www.jianshu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=jianshu.com"
                  />
                  简书
                </a>
              </li>
              <li>
                <a href="https://github.com/" target="_blank">
                  <img
                    src="https://github.githubassets.com/favicons/favicon.png"
                  />
                  Github
                </a>
              </li>
              <li>
                <a href="https://gitee.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=gitee.com/"
                  />
                  Gitee
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=npmjs.com"
                  />npm
                </a>
              </li>
              <li>
                <a href="https://www.zhihu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=zhihu.com"
                  />
                  知 乎
                </a>
              </li>
              <li>
                <a href="https://www.csdn.net/" target="_blank">
                  <img src="https://csdnimg.cn/public/favicon.ico" />
                  csdn
                </a>
              </li>
              <li>
                <a href="https://www.runoob.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=runoob.com"
                  />
                  菜鸟教程
                </a>
              </li>
              <li>
                <a href="https://www.w3school.com.cn/" target="_blank">
                  <img
                    src="https://www.w3school.com.cn/ui2019/logo-16-red.png"
                  />
                  w3school
                </a>
              </li>
              <li>
                <a href="https://cn.vuejs.org/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=cn.vuejs.org"
                  />
                  vue
                </a>
              </li>
              <li>
                <a href="https://uniapp.dcloud.io/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=uniapp.dcloud.io"
                  />
                  uni-app
                </a>
              </li>
              <li>
                <a href="https://element.eleme.cn/#/zh-CN" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=element.eleme.cn"
                  />
                  Element-ui
                </a>
              </li>
              <li>
                <a href="https://vux.li/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=vux.li"
                  />
                  vux
                </a>
              </li>
              <li>
                <a href="https://www.iviewui.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.iviewui.com"
                  />
                  iview
                </a>
              </li>
              <li>
                <a href="http://uviewui.com/" target="_blank">
                  <img src="http://uviewui.com/favicon.ico" />
                  uview
                </a>
              </li>
              <li>
                <a
                  href="https://youzan.github.io/vant/#/zh-CN/"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=youzan.github.io/vant/#/zh-CN/"
                  />
                  Vant
                </a>
              </li>
              <li>
                <a href="https://my.rdc.aliyun.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.aliyun.com"
                  />
                  云效
                </a>
              </li>
              <li>
                <a href="http://jquery.cuishifeng.cn/" target="_blank">
                  <img src="http://jquery.cuishifeng.cn/images/favicon.ico" />
                  jqueryAPI手册
                </a>
              </li>
              <li>
                <a href="http://www.htmleaf.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=htmleaf.com"
                  />
                  jquery之家
                </a>
              </li>
              <li>
                <a href="https://www.bootcss.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=bootcss.com"
                  />
                  Bootstrap
                </a>
              </li>
              <li>
                <a href="https://element.eleme.cn/#/zh-CN" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=element.eleme.cn/#/zh-CN"
                  />
                  Element UI
                </a>
              </li>
              <li>
                <a href="https://es6.ruanyifeng.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=es6.ruanyifeng.com"
                  />
                  ES6 入门教程
                </a>
              </li>
              <li>
                <a href="https://www.jsdaima.com/js" target="_blank">
                  <img src="https://www.jsdaima.com/favicon.ico" />
                  js代码
                </a>
              </li>
              <li>
                <a href="http://www.5icool.org/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.5icool.org"
                  />
                  站酷代码
                </a>
              </li>
              <li>
                <a href="https://www.17sucai.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.17sucai.com"
                  />
                  17素材
                </a>
              </li>
              <li>
                <a href="http://www.lanrentuku.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.lanrentuku.com"
                  />
                  懒人图
                </a>
              </li>
              <li>
                <a href="https://lbs.qq.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=lbs.qq.com"
                  />
                  腾讯位置服务
                </a>
              </li>
              <li>
                <a href="https://qydev.weixin.qq.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=qydev.weixin.qq.com"
                  />
                  微信JS-SDK文档
                </a>
              </li>
            </ul>
          </div>
          <div id="design" class="jj-list">
            <div class="jj-list-tit">
              &bullet; 设 计
              <span>- 图库、摄影图、视频素材、模板</span>
            </div>
            <ul class="jj-list-con">
              <li>
                <a href="https://huaban.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.huaban.com"
                  />花瓣
                </a>
              </li>
              <li>
                <a href="https://www.zcool.com.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.zcool.com.cn"
                  />站酷
                </a>
              </li>
              <li>
                <a href="http://dameigong.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.dameigong.cn"
                  />大美工
                </a>
              </li>
              <li>
                <a href="http://www.bigbigwork.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.bigbigwork.com"
                  />大作
                </a>
              </li>
              <li>
                <a href="https://woofeng.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.woofeng.cn"
                  />黄蜂网
                </a>
              </li>
              <li>
                <a href="https://www.zhisheji.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.zhisheji.com"
                  />致设计
                </a>
              </li>
              <li>
                <a href="https://www.58pic.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.58pic.com"
                  />千图网
                </a>
              </li>
              <li>
                <a href="https://588ku.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.588ku.com"
                  />千库网
                </a>
              </li>
              <li>
                <a href="http://90sheji.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.90sheji.com"
                  />90设计
                </a>
              </li>
              <li>
                <a href="https://www.ooopic.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.ooopic.com"
                  />我图网
                </a>
              </li>
              <li>
                <a href="https://undraw.co/ " target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=undraw.co"
                  />undraw
                </a>
              </li>
              <li>
                <a href="https://www.88tph.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.88tph.com"
                  />图品汇
                </a>
              </li>
              <li>
                <a href="http://699pic.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.699pic.com"
                  />摄图网
                </a>
              </li>
              <li>
                <a href=" https://unsplash.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=unsplash.com"
                  />unsplash
                </a>
              </li>
              <li>
                <a href=" https://pixabay.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=pixabay.com"
                  />pixabay
                </a>
              </li>
              <li>
                <a href=" https://www.splitshire.com/ " target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=splitshire.com"
                  />splitshire
                </a>
              </li>
              <li>
                <a href=" https://www.pexels.com" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=pexels.com"
                  />pexels
                </a>
              </li>
              <li>
                <a href="http://www.gaoimg.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.gaoimg.com"
                  />高图网
                </a>
              </li>
              <li>
                <a href="https://www.mcool.com/" target="_blank">
                  <img src="https://www.mcool.com/favicon.ico" />模酷网
                </a>
              </li>
              <li>
                <a href="https://www.16pic.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.16pic.com"
                  />六图网
                </a>
              </li>
              <li>
                <a href="https://www.51miz.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.51miz.com"
                  />觅知网
                </a>
              </li>
              <li>
                <a href="https://www.hellorf.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.hellorf.com"
                  />站酷海洛
                </a>
              </li>
              <li>
                <a href="https://film-grab.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.film-grab.com"
                  />film-grab
                </a>
              </li>
              <li>
                <a href="http://www.pngpix.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.pngpix.com"
                  />pngpix
                </a>
              </li>
              <li>
                <a href="https://www.iconfont.cn/" target="_blank">
                  <img
                    src="https://img.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico"
                  />iconfont
                </a>
              </li>
              <li>
                <a href="https://icomoon.io/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.icomoon.io"
                  />icomoon
                </a>
              </li>
              <li>
                <a href="https://www.pixelsquid.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.pixelsquid.com"
                  />pixelsquid
                </a>
              </li>
              <li>
                <a href="https://www.cleanpng.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.cleanpng.com"
                  />cleanpng
                </a>
              </li>
              <li>
                <a href="http://freepik.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.freepik.com"
                  />freepik
                </a>
              </li>
              <li>
                <a href="http://www.lanrentuku.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.lanrentuku.com"
                  />懒人图
                </a>
              </li>
              <li>
                <a href="http://www.51yuansu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.51yuansu.com"
                  />觅元素
                </a>
              </li>
              <li>
                <a href="https://www.mockupworld.co/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=mockupworld.co"
                  />mockupworld
                </a>
              </li>
              <li>
                <a href="http://www.qiuziti.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.qiuziti.com"
                  />求字网
                </a>
              </li>
              <li>
                <a href="https://www.vjshi.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.vjshi.com"
                  />vj师
                </a>
              </li>
              <li>
                <a href="http://www.adobeae.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.adobeae.com"
                  />ae模板精品站
                </a>
              </li>
              <li>
                <a href="http://3tis.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.3tis.cn"
                  />3tis云视界
                </a>
              </li>
              <li>
                <a href="https://www.newcger.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.newcger.com"
                  />新cg儿
                </a>
              </li>
              <li>
                <a href="https://www.cgown.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.cgown.com"
                  />cg
                </a>
              </li>
              <li>
                <a href="https://www.xinpianchang.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.xinpianchang.com"
                  />新片场社区
                </a>
              </li>
              <li>
                <a href="https://www.laihua.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.laihua.com"
                  />来画
                </a>
              </li>
            </ul>
          </div>
          <div id="ENT" class="jj-list">
            <div class="jj-list-tit">
              &bullet; 娱 乐
              <span>- 影音视听、电商</span>
            </div>
            <ul class="jj-list-con">
              <li>
                <a href="https://www.taobao.com" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.taobao.com"
                  />
                  淘宝
                </a>
              </li>
              <li>
                <a href="http://www.jd.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.jd.com"
                  />
                  京东
                </a>
              </li>
              <li>
                <a href="https://www.suning.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.suning.com"
                  />
                  苏宁
                </a>
              </li>
              <li>
                <a href="http://www.meituan.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.meituan.com"
                  />
                  美团
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.bilibili.com"
                  />
                  哔哩哔哩
                </a>
              </li>
              <li>
                <a href="https://www.iqiyi.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.iqiyi.com"
                  />
                  爱奇艺
                </a>
              </li>
              <li>
                <a href="https://y.qq.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=y.qq.com"
                  />
                  QQ音乐
                </a>
              </li>
              <li>
                <a href="https://www.smzdm.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.smzdm.com"
                  />
                  值得买
                </a>
              </li>
              <li>
                <a href="https://www.sq688.com/share.html" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.sq688.com"
                  />
                  超高无损音乐
                </a>
              </li>
              <li>
                <a href="https://www.hifini.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.hifini.com"
                  />
                  HiFiNi 音乐磁场
                </a>
              </li>
              <li>
                <a href="https://www.yunbtv.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.yunbtv.com"
                  />
                  云播tv
                </a>
              </li>
              <li>
                <a href="http://www.edant.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.edant.cn"
                  />
                  小小影视
                </a>
              </li>
              <li>
                <a href="https://www.douyu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.douyu.com"
                  />
                  斗鱼
                </a>
              </li>
              <li>
                <a href="https://tieba.baidu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=tieba.baidu.com"
                  />贴 吧
                </a>
              </li>
              <li>
                <a href="http://www.zol.com.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.zol.com.cn"
                  />中关村
                </a>
              </li>
            </ul>
          </div>
          <div id="tools" class="jj-list">
            <div class="jj-list-tit">
              &bullet; 工 具
              <span>- 素材抓取、站长工具、其他</span>
            </div>
            <ul class="jj-list-con">
              <li>
                <a href="http://www.qijishow.com/down/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=qijishow.com"
                  />
                  奇迹秀工具箱
                </a>
              </li>
              <li>
                <a
                  href="https://bilibili.online-downloader.com/index-Chinese"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.online-downloader.com"
                  />
                  online-downloader
                </a>
              </li>
              <li>
                <a href="http://www.downfi.com/video/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.downfi.com"
                  />
                  小视频下载
                </a>
              </li>
              <li>
                <a href="http://www.flvcd.com/index.htm" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.flvcd.com"
                  />
                  flvcd
                </a>
              </li>
              <li>
                <a href="http://v.ranks.xin/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=v.ranks.xin"
                  />
                  v视频助手
                </a>
              </li>
              <li>
                <a href="http://www.shipinyu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.shipinyu.com"
                  />
                  视频鱼
                </a>
              </li>
              <li>
                <a href="http://index.baidu.com/" target="_blank">
                  <img src="https://www.baidu.com/favicon.ico" />
                  百度指数
                </a>
              </li>
              <li>
                <a href="https://caniuse.com/#" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=caniuse.com"
                  />
                  浏览器兼容性查询
                </a>
              </li>
              <li>
                <a href="https://www.aizhan.com/" target="_blank">
                  <img
                    src="https://statics.aizhan.com/images/img/favicon.ico"
                  />
                  爱站网
                </a>
              </li>
              <li>
                <a href="https://tongji.baidu.com/" target="_blank">
                  <img src="https://tongji.baidu.com/favicon.ico" />
                  百度统计
                </a>
              </li>
              <li>
                <a href="https://tophub.today/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.tophub.today"
                  />
                  今日热榜
                </a>
              </li>
              <li>
                <a href="https://www.chinaz.com/" target="_blank">
                  <img
                    src="https://www.chinaz.com/2017statics/templates/chinaz/favicon.ico"
                  />
                  站长之家
                </a>
              </li>
              <li>
                <a href="https://www.gaoding.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.gaoding.com"
                  />
                  稿定设计
                </a>
              </li>
              <li>
                <a href="https://www.chuangkit.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.chuangkit.com"
                  />
                  创客贴
                </a>
              </li>
              <li>
                <a href="https://pan.baidu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=pan.baidu.com"
                  />
                  百度网盘
                </a>
              </li>
              <li>
                <a href="https://www.aliyundrive.com/drive" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.aliyundrive.com"
                  />
                  阿里云盘
                </a>
              </li>
              <li>
                <a href="http://wp.soshoulu.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=/wp.soshoulu.com"
                  />
                  网盘搜索
                </a>
              </li>
              <li>
                <a href="http://www.ju1.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.ju1.cn"
                  />
                  违禁词检测
                </a>
              </li>
              <li>
                <a
                  href="http://baidule.yuansupic.com/index.html"
                  target="_blank"
                >
                  <img />素材下载器
                </a>
              </li>
              <li>
                <a href="http://www.zhio2o.com" target="_blank">
                  <img />素材下载器(备用)
                </a>
              </li>
              <li>
                <a href="https://c.runoob.com/front-end/61" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=c.runoob.com"
                  />
                  前端编辑器
                </a>
              </li>
              <li>
                <a href="http://sbj.cnipa.gov.cn/sbcx/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=sbj.cnipa.gov.cn"
                  />
                  商标查询
                </a>
              </li>
              <li>
                <a href="https://www.pdfpai.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=pdfpai.com/"
                  />
                  PDF派
                </a>
              </li>
              <li>
                <a href="http://www.hiwenku.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=hiwenku.com/"
                  />
                  嗨文库
                </a>
              </li>
              <li>
                <a
                  href="https://work.weixin.qq.com/api/jsapidemo#menu-location"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=work.weixin.qq.com/"
                  />
                  微信JS-SDK DEMO
                </a>
              </li>
              <li>
                <a href="http://33.agilestudio.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=33.agilestudio.cn/"
                  />
                  33台词
                </a>
              </li>
              <li>
                <a href="http://www.zhaotaici.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.zhaotaici.cn/"
                  />
                  找台词
                </a>
              </li>
              <li>
                <a href="https://rrx.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=rrx.cn"
                  />
                  人人秀
                </a>
              </li>
              <li>
                <a href="https://818ps.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=818ps.com"
                  />
                  图怪兽
                </a>
              </li>
              <li>
                <a href="https://xiumi.us/#/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=818ps.com"
                  />
                  秀米编辑器
                </a>
              </li>
            </ul>
          </div>
          <div id="fine" class="jj-list">
            <div class="jj-list-tit">
              &bullet; 优秀网站
              <span>- 个人网站、优秀案例</span>
            </div>
            <ul class="jj-list-con">
              <li>
                <a href="https://eallion.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=cdn.eallion.com"
                  />
                  大大的小蜗牛
                </a>
              </li>
              <li>
                <a
                  href="https://yisha0307.github.io/Portfolio-page/chenyisha.html"
                  target="_blank"
                >
                  <img src />
                  陈亦沙
                </a>
              </li>
              <li>
                <a href="http://chenfl.top/" target="_blank">
                  <img src="http://chenfl.top/static/favicon.ico" />
                  前端专栏
                </a>
              </li>
              <li>
                <a href="https://www.apollozz.com/" target="_blank">
                  <img src="https://www.apollozz.com/note/images/favicon.ico" />
                  太阳神在打瞌睡
                </a>
              </li>
              <li>
                <a href="https://lijianxun.top/" target="_blank">
                  <img src />
                  岁月无婷无华
                </a>
              </li>
            </ul>
          </div>
          <div id="software" class="jj-list">
            <div class="jj-list-tit">
              &bullet; 软 件
              <span>- 注册工具、插件</span>
            </div>

            <ul class="jj-list-con">
              <li>
                <a href="https://www.carrotchou.com/" target="_blank">
                  <img src="https://www.carrotchou.com/favicon.ico" />
                  胡萝卜周
                </a>
              </li>
              <li>
                <a
                  href="https://ziipatcher.com/adobe-zii-download-for-windows-2020/"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=ziipatcher.com"
                  />
                  AdobeZii
                </a>
              </li>
              <li>
                <a
                  href="https://scholar.google.com/ncr?gws_rd=ssl"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=scholar.google.com"
                  />
                  GitLab注册机大全
                </a>
              </li>
              <li>
                <a
                  href="https://official-amtemu.com/download-amtemu-universal-adobe-patcher/"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=i2.wp.com"
                  />
                  AMTEmu
                </a>
              </li>
              <li>
                <a href="http://www.sklfamily.com/forum.php" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.sklfamily.com"
                  />
                  屎壳郎论坛
                </a>
              </li>
              <li>
                <a href="http://www.gfxcamp.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.gfxcamp.com"
                  />
                  gfxcamp
                </a>
              </li>
              <li>
                <a
                  href="https://scholar.google.com/ncr?gws_rd=ssl"
                  target="_blank"
                >
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=scholar.google.com"
                  />
                  adobe插件
                </a>
              </li>
              <li>
                <a href="https://xclient.info/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=xclient.info"
                  />
                  Xclient
                </a>
              </li>
              <li>
                <a href="https://macwk.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=macwk.com"
                  />
                  MacWk
                </a>
              </li>
              <li>
                <a href="https://www.macbl.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=macbl.com"
                  />
                  马可波罗
                </a>
              </li>
              <li>
                <a href="https://www.macdo.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=macdo.cn"
                  />
                  Mac毒
                </a>
              </li>
            </ul>
          </div>
          <div id="other" class="jj-list">
            <div class="jj-list-tit">
              &bullet; 其 他
              <span></span>
            </div>
            <ul class="jj-list-con">
              <li>
                <a href="https://kingfast.info/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=kingfast.info"
                  />
                  kingfast
                </a>
              </li>
              <li>
                <a href="https://mp.weixin.qq.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=mp.weixin.qq.com"
                  />
                  微信公众平台
                </a>
              </li>
              <li>
                <a href="https://www.zhipin.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=zhipin.com"
                  />
                  BOSS直聘
                </a>
              </li>
              <li>
                <a href="https://www.51job.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.51job.com"
                  />
                  前程无忧
                </a>
              </li>
              <li>
                <a href="https://www.zhaopin.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.zhaopin.com"
                  />
                  智联招聘
                </a>
              </li>
              <li>
                <a href="https://www.aliyun.com" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.aliyun.com"
                  />
                  阿里云
                </a>
              </li>
              <li>
                <a href="https://cloud.tencent.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=cloud.tencent.com"
                  />
                  腾讯云
                </a>
              </li>
              <li>
                <a href="https://www.vultr.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.vultr.com"
                  />
                  Vultr
                </a>
              </li>
              <li>
                <a href="https://weibo.com/eallion" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.weibo.com"
                  />
                  微博
                </a>
              </li>
              <li>
                <a href="https://www.envisioningchemistry.cn/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.envisioningchemistry.cn"
                  />
                  重现化学
                </a>
              </li>
              <li>
                <a href="http://www.xn--0tr94zg4yjxe.com/" target="_blank">
                  <img
                    src="https://www.google.cn/s2/favicons?domain_url=www.xn--0tr94zg4yjxe.com"
                  />蓝悦美和
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 导航地址 end -->
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/base.css";
import baidu from "@/assets/images/baidu.png";
import google from "@/assets/images/google.png";
import so from "@/assets/images/360so.png";
import sogou from "@/assets/images/sogou.png";
import axios from "axios";
export default {
  name: "jaqi.nav",
  data() {
    return {
      msg: "个人导航",
      weatherdata: [],
      showSearcherList: false,
      searcherList: [
        {
          name: "百度",
          key: "baidu",
          url: "https://www.baidu.com/s?wd=",
          img: baidu,
        },
        {
          name: "谷歌",
          key: "google",
          url: "https://www.google.com/search?q=",
          img: google,
        },
        {
          name: "360搜索",
          key: "360so",
          url: "https://www.so.com/s?q=",
          img: so,
        },
        {
          name: "搜狗",
          key: "google",
          url: "https://www.sogou.com/web?query=",
          img: sogou,
        },
      ],
      searcher: "",
      searchValue: "",
    };
  },
  components: {},
  methods: {
    selectSearcher(item) {
      this.searcher = item;
    },
    search() {
      window.open(this.searcher.url + this.searchValue);
    },
    weather() {
      var that = this;
      axios
        .get(
          "https://restapi.amap.com/v3/weather/weatherInfo?city=210100&key=f70cf051d7ec8ec511ea2175955d1436"
        )
        .then(function (response) {
          console.log("天气信息调取成功");
          that.weatherdata = response.data.lives[0];
        })
        .catch(function (error) {
          console.log("天气信息调取失败", error);
        });
    },
  },
  mounted() {
    this.weather();
    this.searcher = this.searcherList[0];
  },
};
</script>
<style scoped>
@font-face {
  font-family: "FZXiJinLJW";
  src: url(//cdn.jsdelivr.net/gh/eallion/favorite@master/static/fonts/FZXiJinLJW.ttf)
    format("truetype");
}
.jj-list-con > li > a {
  text-decoration: none;
}
.jj-list-con img {
  border-style: none;
  display: inline;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
  outline: 0;
}

textarea {
  -webkit-appearance: none;
}

/* ================ reset 样式 end  ================ */
.inner-center {
  width: 75%;
  margin: 0 auto;
}

.main {
  padding-top: 5%;
  min-height: 100%;
}

.content-inside {
  padding-bottom: 76px;
}

.footer {
  height: 60px;
  text-align: center;
  margin-top: -60px;
  /* position: relative;
    margin-top: -100px; 
    clear:both; */
}

.footer a,
a:link,
a:hover,
a:visited,
a:active {
  color: rgba(49, 70, 89, 1);
}

.footer p {
  margin: 16px 0;
}

/* logo start  */
.logo-box {
  overflow: hidden;
  align-items: center;
  font-size: 36px;
  color: #333;
  font-family: "Noto Sans SC", sans-serif;
  text-align: center;
  font-weight: bold;
  padding-bottom: 31px;
}

/* logo end  */
/* 搜索框 start */
.searchBox {
  display: flex;
  width: 70%;
  margin: 20px auto;
  position: relative;
}
.searchInput {
  width: 100%;
  height: 40px;
  padding-left: 40px;
  font-size: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
}
.selectSearcher {
  width: 100%;
  height: 40px;
  padding-left: 40px;
  font-size: 15px;
  box-sizing: border-box;
  border-radius: 4px 4px 4px 0px;
  border: 1px solid #dcdfe6;
  color: #606266;
}
.searchInput:focus {
  outline: none;
  border-color: #409eff;
}
.searchIcon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
}

.searcherList {
  position: absolute;
  top: 40px;
  border-radius: 0px 0px 4px 4px;
  border: 1px solid #dcdfe6;
  border-top: none;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background-color: #fff;
}
.searcherList li {
  width: 100%;
  display: block;
  text-align: center;
}
.searcherList li img {
  display: block;
  text-align: center;
  padding: 10px;
  width: 20px;
  height: 20px;
}
/* 搜索框 end */
/*  导航内容 start  */
.nav-content {
  overflow: hidden;
}
/*  导航内容 end  */
/*内容区域*/
/*-----------------------------简洁版样式定义- 开始---------------------------------------------------*/
.jj-list {
  width: 100%;
  float: left;
  margin-top: 30px;
  padding-right: 16px;
}

.jj-list:nth-of-type(3n) {
  padding-right: 0;
}

.jj-list-tit {
  box-sizing: border-box;
  /*以IE盒子模型的width为标准*/
  font-size: 16px;
  line-height: 25px;
  color: rgba(49, 70, 89, 1);
  font-weight: bold;
  width: 100%;
  /*div等分*/
  margin: 0 0 10px 31px;
}

.jj-list-tit span {
  font-weight: normal;
}

.jj-list-con {
  overflow: hidden;
  margin: 0 auto;
}

.jj-list-con li {
  box-sizing: border-box;
  /*以IE盒子模型的width为标准*/
  padding: 1px 1px;
  /*设置div的内边距*/
  width: 16.6%;
  /*div等分成6部分*/
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.jj-list-con li a {
  display: block;
  background: rgba(230, 247, 255, 0.96);
  color: rgba(49, 70, 89, 1);
  font-size: 13px;
  text-align: left;
  padding-left: 1.7em;
  line-height: 44px;
  transition: all 0.2s;
  border-radius: 2px;
}

.jj-list-con li a img {
  height: 13px;
  margin-right: 8px;
}

.jj-list-con li a:hover {
  background: #1890ff 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}

.jj-list-con li a:hover img {
  height: 1rem;
  margin-right: 8px;
}

/* 导航栏样式 */
.navigation {
  width: 100%;
  height: 50px;
  position: fixed;
  /* 绝对定位（根据游览器边框定位） */
  top: -60;
  transition: top 0.5s;
  /* 动画效果，top：显示的效果， 1s：是效果产生所花费的时间*/
  display: none;
  text-align: center;
  z-index: 1;
  background: #1890ff 100%;
}

/* 隐藏效果 */
.show_header {
  top: 0px;
  display: inline-block;
  text-align: center;
}

.header_ul {
  display: inline-block;
}

.header {
  overflow: hidden;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.header ul {
  max-width: 1000px;
  display: inline-block;
}

.header li {
  margin: 0 25px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
}

.header li a {
  display: block;
  color: #eee;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 44px;
  transition: all 0.2s;
}

.header li a:hover {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.eallion-nav {
  display: none;
}

.jinrishici-desc {
  font-family: "FZXiJinLJW";
  font-weight: normal;
  white-space: nowrap;
  font-size: 1.3em;
}

/*-----------------------------简洁版样式定义- 结束---------------------------------------------------*/
/*-----------------------------手机自适应---------------------------------------------------*/
@media screen and (max-device-width: 768px) {
  .jj-list-con li {
    width: 33.3%;
    /*div等分成3部分*/
  }

  .jj-list-con li a {
    padding-left: 0.7em;
  }

  .eallion-nav {
    display: inline-block;
  }

  .jinrishici-desc {
    display: none;
  }

  .jj-list-tit span {
    display: none;
  }
}
</style>