import{_ as s,c as i,o as a,aR as n,b4 as l,b5 as p,b6 as t}from"./chunks/framework.DO9sehX0.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/microFrontends.md","filePath":"frontend/microFrontends.md","lastUpdated":1716517161000}'),h={name:"frontend/microFrontends.md"},e=n('<h2 id="_10-1-微前端概述" tabindex="-1">10.1 微前端概述 <a class="header-anchor" href="#_10-1-微前端概述" aria-label="Permalink to &quot;10.1 微前端概述&quot;">​</a></h2><p>微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 <code>web</code> 应用的技术手段及方法策略</p><p>微前端的核心目标是将巨石应用拆解成若干可以自治的松耦合微应用，这样才能确保微应用真正具备独立开发、独立运行的能力</p><h4 id="多页面应用、单页面应用、与为微服务应用" tabindex="-1">多页面应用、单页面应用、与为微服务应用 <a class="header-anchor" href="#多页面应用、单页面应用、与为微服务应用" aria-label="Permalink to &quot;多页面应用、单页面应用、与为微服务应用&quot;">​</a></h4><ol><li>多页面应用(<code>MPA</code>):一个应用即一个页面。优点是彼此独立互不依赖。缺点是：不便于交流和资源共享，切换会造成浏览器重刷</li><li>单页面应用(<code>SPA</code>):一个应用多个页面。优点是页面直接便于交流和资源共享，切换不刷新浏览器只加载局部代码。缺点是：彼此独立相互依赖</li><li>微前端：合集了<code>MPA</code> 与 <code>SPA</code> 框架优势，即保证应用独立互不依赖，又便于应用之间交流和资源共享。</li></ol><h4 id="特征" tabindex="-1">特征 <a class="header-anchor" href="#特征" aria-label="Permalink to &quot;特征&quot;">​</a></h4><ol><li>与技术栈无关，主框架不限制接入应用的技术栈，微应用具备完全自主权</li><li>独立开发、独立部署，微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新</li><li>增量升级，在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略</li><li>独立运行时，每个微应用之间状态隔离，运行时状态不共享</li></ol><h4 id="微前端的类型" tabindex="-1">微前端的类型 <a class="header-anchor" href="#微前端的类型" aria-label="Permalink to &quot;微前端的类型&quot;">​</a></h4><ol><li>单实例：即同一时刻，只有一个微应用被展示，微应用具备一个完整的应用生命周期。通常基于 <code>url</code> 的变化来做微应用的切换</li><li>多实例：同一时刻可展示多个微应用。通常使用 <code>Web Components</code> 方案来做微应用封装，微应用更像是一个业务组件而不是应用</li></ol><h2 id="_10-2-微前端框架-single-spa" tabindex="-1">10.2 微前端框架 <code>single-spa</code> <a class="header-anchor" href="#_10-2-微前端框架-single-spa" aria-label="Permalink to &quot;10.2 微前端框架 `single-spa`&quot;">​</a></h2><p><code>single-spa</code>是单实例微前端框架</p><h3 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h3><p><code>single-spa</code>仅仅是一个微应用生命周期的调度者</p><p><img src="'+l+'" alt="工作流程"></p><ol><li>路由原理：通过 <code>pushState</code> 与 <code>onpopstate</code> 操作和监听 <code>url</code> 实现微应用的切换</li><li>接入方式：基于 <code>HTML Entry</code></li><li>代码隔离：基于快照沙箱、代理沙箱</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><ol><li><code>pushState</code>与<code>popState</code>详见<a href="/frontend/javascript/BOM.html#_3-10-3-window对象属性">3.10.3</a></li><li><code>HTML Entry</code> &amp; <code>JS Entry</code></li></ol><ul><li><code>JS Entry</code></li></ul><blockquote><p>原理：所有的资源（css、图片）都打包成一个 <code>js</code> 文件,主应用引用微应用打包出的 <code>js</code>文件<br> 缺点：打包出来的文件体积庞大，资源加载慢微应用发布后，主应用需要重新打包</p></blockquote><ul><li><code>HTML Entry</code></li></ul><blockquote><p>原理：微应用按照原来的方式打包出一个 <code>html</code>、主应用加载微应用打包出来的 <code>html</code> 文件，并将这个 <code>html</code> 节点放在主应用的容器中<br> 缺点：打包出来的文件体积庞大，资源加载慢微应用发布后，主应用需要重新打包<br><img src="'+p+`" alt="工作流程"></p></blockquote></div><h3 id="iframe-与-single-spa" tabindex="-1"><code>iframe</code> 与 <code>single-spa</code> <a class="header-anchor" href="#iframe-与-single-spa" aria-label="Permalink to &quot;\`iframe\` 与 \`single-spa\`&quot;">​</a></h3><ul><li><code>iframe</code> 的弊端</li></ul><ol><li>每次进来都要加载，状态不能保留</li><li><code>DOM</code> 结构不共享。(比如微应用里有一个 <code>Modal</code>，显示的时候只能在那一小块地方展示，不能全屏展示) 特性</li><li>无法跟随浏览器前进后退</li><li>天生的硬隔离，无法与主应用进行资源共享，交流也很困难</li></ol><ul><li><code>single-spa</code>的优势</li></ul><ol><li>切换路由就是切换页面组件，组件的挂载和卸载非常快</li><li>单页应用共享 <code>DOM</code></li><li>前端控制路由，想前就前，想后就后</li><li><code>React</code> 通信有 <code>Redux</code>，<code>Vue</code> 通信有 <code>Vuex</code> ，可与 <code>App</code> 组件进行交流、资源共享</li></ol><h2 id="_10-3-single-spa-的实现库-qiankun" tabindex="-1">10.3 <code>single-spa</code> 的实现库 <code>qiankun</code> <a class="header-anchor" href="#_10-3-single-spa-的实现库-qiankun" aria-label="Permalink to &quot;10.3 \`single-spa\` 的实现库 \`qiankun\`&quot;">​</a></h2><ul><li>蚂蚁金融科技基于 <code>single-spa</code> 的微前端实现库</li></ul><h3 id="_10-3-1-安装与使用" tabindex="-1">10.3.1 安装与使用 <a class="header-anchor" href="#_10-3-1-安装与使用" aria-label="Permalink to &quot;10.3.1 安装与使用&quot;">​</a></h3><h4 id="主应用" tabindex="-1">主应用 <a class="header-anchor" href="#主应用" aria-label="Permalink to &quot;主应用&quot;">​</a></h4><ul><li>初始化主应用</li></ul><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-1oQnw" id="tab-PDNT4ij" checked><label for="tab-PDNT4ij">Vue/Cli</label><input type="radio" name="group-1oQnw" id="tab-FMCIK-J"><label for="tab-FMCIK-J">Vite</label></div><div class="blocks"><div class="language-zsh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @vue/cli</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vue</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main-app</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-router</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span></span></code></pre></div><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-router</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span></span></code></pre></div></div></div><ul><li>安装 <code>qiankun</code></li></ul><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qiankun</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或者 </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qiankun</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span></span></code></pre></div><ul><li>注册主应用</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// mainApp.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { registerMicroApps } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;qiankun&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./subApps&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 微应用配置项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">subApps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> registerApps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        registerMicroApps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(subApps, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            beforeLoad: [</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                app</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;before load&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, app);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            beforeMount: [</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                app</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;before mount&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, app);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            afterUnmount: [</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                app</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;before unmount&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, app);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (err) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(err);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>配置微应用</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// subApps.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subApps: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;vue-app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 微应用名称，跟package.json一致</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            entry: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;//localhost:7071&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 微应用入口，本地环境下指定端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            container: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 挂载微应用的dom</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            activeRule: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/vue-app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由匹配规则</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            props: {} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 主应用与微应用通信传值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;react-app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 微应用名称，跟package.json一致</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            entry: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;//localhost:7072&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 微应用入口，本地环境下指定端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            container: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 挂载微应用的dom</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            activeRule: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/react-app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由匹配规则</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            props: {} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 主应用与微应用通信传值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><ul><li>挂载主应用</li></ul><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- src/views/layout/index.vue --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- 微应用的容器 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;container&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { start } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;qiankun&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { registerApps } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@/utils/qiankun&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    mounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.qiankunStarted) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            window.qiankunStarted </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            registerApps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                sandbox: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    experimentalStyleIsolation: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 样式隔离</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li>配置微应用路由</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// rc/router/index.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createRouter, createWebHistory } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;vue-router&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> routes</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        redirect: { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        meta: { title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;App&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        children: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // history模式需要通配所有路由，详见vue-router文档</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/vue-app/:pathMatch(.*)*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;vue-app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                meta: {},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;@/views/layout/index.vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // history模式需要通配所有路由，详见vue-router文档</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/react-app/:pathMatch(.*)*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;react-app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                meta: {},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;@/views/layout/index.vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> router</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createRouter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    history: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createWebHistory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    routes</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> router;</span></span></code></pre></div><ul><li>基于 UI 复用需求的微应用的拆分方案 <img src="`+t+'" alt="微应用的拆分方案"></li></ul><h2 id="_10-4-参考文档" tabindex="-1">10.4 参考文档 <a class="header-anchor" href="#_10-4-参考文档" aria-label="Permalink to &quot;10.4 参考文档&quot;">​</a></h2><p><a href="https://zh-hans.single-spa.js.org/docs/getting-started-overview" target="_blank" rel="noreferrer">single-spa官方文档</a></p><p><a href="https://qiankun.umijs.org/zh/guide" target="_blank" rel="noreferrer">qiankun官方文档</a></p><p><a href="https://zhuanlan.zhihu.com/p/78362028" target="_blank" rel="noreferrer">微前端解决方案的演进</a></p><p><a href="https://zhuanlan.zhihu.com/p/259209543?utm_id=0" target="_blank" rel="noreferrer">qiankun在中后台系统实践</a></p><p><a href="https://mp.weixin.qq.com/s?__biz=MzA3NTk4NjQ1OQ==&amp;mid=2247484245&amp;idx=1&amp;sn=9ee91018578e6189f3b11a4d688228c5" target="_blank" rel="noreferrer">single-spa原理与实践</a></p><p><a href="https://github.com/gongshun/qiankun-vue-element-admin" target="_blank" rel="noreferrer">qiankun-vue 后项目demo</a></p>',45),k=[e];function E(r,d,o,g,c,y){return a(),i("div",null,k)}const m=s(h,[["render",E]]);export{u as __pageData,m as default};