import{_ as i,c as a,o as s,aR as t}from"./chunks/framework.CEJVZlIo.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/html/element/layout.md","filePath":"frontend/html/element/layout.md","lastUpdated":1715234692000}'),e={name:"frontend/html/element/layout.md"},h=t(`<h3 id="article与section" tabindex="-1">article与section <a class="header-anchor" href="#article与section" aria-label="Permalink to &quot;article与section&quot;">​</a></h3><h4 id="article" tabindex="-1">article: <a class="header-anchor" href="#article" aria-label="Permalink to &quot;article:&quot;">​</a></h4><p>用于定义一个独立的内容区块，比如一篇文章，一篇博客，一个帖子，论坛的一段用户评论，一篇新闻消息等。</p><p>article元素内可以嵌套其他元素，它可以有自己的头、尾、主体等内容。使用时要特别注意内容的独立性，一般对于独立完整的内容才使用article元素，如果只是一段内容的话应该使用section元素。</p><h4 id="section" tabindex="-1">section: <a class="header-anchor" href="#section" aria-label="Permalink to &quot;section:&quot;">​</a></h4><p>用来定义文章中的章节(通常应该有标题和段落内容)</p><p>用来定义文档中特定内容的区块，可视为一个区域分组元素，用来给页面上的内容分块。</p><p>section元素可以定义文档的主体内容。</p><p>用一句话来概括它的作用就是给内容分段，给页面分区</p><p>注意他与div的区别，div强调在形式上的独立性，section强调的是内容上的独立性，注意它的语义。</p><h4 id="article元素和section元素的区别" tabindex="-1">article元素和section元素的区别: <a class="header-anchor" href="#article元素和section元素的区别" aria-label="Permalink to &quot;article元素和section元素的区别:&quot;">​</a></h4><h5 id="语义不同" tabindex="-1">语义不同 <a class="header-anchor" href="#语义不同" aria-label="Permalink to &quot;语义不同&quot;">​</a></h5><ul><li><p>article元素更强调内容的独立性</p></li><li><p>section元素更强调内容的关联性</p></li><li><p>article元素是独立完整的内容，section元素页面内容分块</p></li></ul><h5 id="相同点" tabindex="-1">相同点 <a class="header-anchor" href="#相同点" aria-label="Permalink to &quot;相同点&quot;">​</a></h5><ul><li>本质上都是带有语义的div块元素</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">分别可以看作&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;section&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;和&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;article&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="cection" tabindex="-1">cection <a class="header-anchor" href="#cection" aria-label="Permalink to &quot;cection&quot;">​</a></h3><p>定义一个区域，如文章的章节等</p><h3 id="nav" tabindex="-1">nav <a class="header-anchor" href="#nav" aria-label="Permalink to &quot;nav&quot;">​</a></h3><p>定义目录导航。</p><p>并非所有的超链接都放在nav元素中，通常只把一个文档中的主导航栏放在nav中 。</p><p>在文章页面中，nav还可以用来给一个文字做一个目录的超链接。</p><h3 id="aside" tabindex="-1">aside <a class="header-anchor" href="#aside" aria-label="Permalink to &quot;aside&quot;">​</a></h3><p>定义侧边栏。</p><p>用于定义article元素之外的内容，前提是这些内容与article元素内的内容相关。</p><p>同时也可嵌套在article元素内部使用，作为主要内容的附属信息，比如与主内容有关的参考资料，名词解释等。</p><h3 id="figure-figcaption" tabindex="-1">figure/figcaption <a class="header-anchor" href="#figure-figcaption" aria-label="Permalink to &quot;figure/figcaption&quot;">​</a></h3><h4 id="figure" tabindex="-1">figure <a class="header-anchor" href="#figure" aria-label="Permalink to &quot;figure&quot;">​</a></h4><p>用于设置一个页面的标题部分，通常会包含标题，LOGO，导航等。（通常会放在文章的头部）</p><h4 id="figcaption" tabindex="-1">figcaption <a class="header-anchor" href="#figcaption" aria-label="Permalink to &quot;figcaption&quot;">​</a></h4><p>用来给figure元素定义标题。</p><h3 id="header-footer" tabindex="-1">header/footer <a class="header-anchor" href="#header-footer" aria-label="Permalink to &quot;header/footer&quot;">​</a></h3><h4 id="header" tabindex="-1">header <a class="header-anchor" href="#header" aria-label="Permalink to &quot;header&quot;">​</a></h4><p>用于设置一个页面的标题部分，通常会包含标题，LOGO，导航等。（通常会放在文章的头部）</p><h4 id="footer" tabindex="-1">footer <a class="header-anchor" href="#footer" aria-label="Permalink to &quot;footer&quot;">​</a></h4><p>通常用于设置一个网页的底部区域，会包含友情链接，版权声明，文件建立日期，联系方式等。（通常会放在页面的页脚）</p><h3 id="hgroup" tabindex="-1">hgroup <a class="header-anchor" href="#hgroup" aria-label="Permalink to &quot;hgroup&quot;">​</a></h3><p>标题分组通常放在header中。</p><h3 id="address" tabindex="-1">address <a class="header-anchor" href="#address" aria-label="Permalink to &quot;address&quot;">​</a></h3><p>地址、联系信息等，内容会以斜体显示。</p><h3 id="time" tabindex="-1">time <a class="header-anchor" href="#time" aria-label="Permalink to &quot;time&quot;">​</a></h3><p>微格式的概念</p><p>HTML5中的微格式，是一种利用HTML5中的新标签对网页添加附加信息的方法，附加信息例如新闻事件发生的日期和时间，文章发表的日期等。</p><p>HTML5中的微格式是为了简化浏览器对数据的提取，方便搜索引擎的搜索。</p><p>time是HTML5新增的元素</p><p>time元素代表24小时中的某个时刻或某个日期，表示时刻时允许带时差。它可以定义很多格式的日期和时间。</p><p>datetime属性中日期与时间之间要用&quot;T&quot;文字分隔，&quot;T&quot;表示时间。请注意倒数第二行，时间加上Z文字表示给机器编码时使用UTC标准时间，表示向机器编码另一地区时间，如果是编码本地时间，则不需要添加时差。</p><p>pubdate属性是个可选标签，加上它搜索引擎/浏览器就可以很方便的识别出那个日期是文章、新闻的发表日期。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; 元素示例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> datetime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2015-10-22&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2015年10月12日&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> datetime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2015-10-22T20:00&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2015年10月12日晚上8点&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> datetime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2015-10-22T20:00Z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;2015年10月12日晚上8点&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> datetime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2015-10-22T20:00+09:00&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;美国时间2015年10月12日8点&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">补充：新布局的特点</p><p>更注重于内容而不是形式</p><p>对人的友好：更加的语义化，高度的描述性，更加的直观，增加了代码的可读性。</p><p>对计算机的友好：浏览器更容易解析，搜索引擎更容易抓取文档的内容。</p><p>代码更加的简洁。</p></div>`,50),l=[h];function n(p,r,o,d,k,c){return s(),a("div",null,l)}const u=i(e,[["render",n]]);export{g as __pageData,u as default};