import{_ as i,c as s,o as e,aR as a}from"./chunks/framework.DO9sehX0.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/css/location.md","filePath":"frontend/css/location.md","lastUpdated":1715234692000}'),t={name:"frontend/css/location.md"},o=a(`<h2 id="_2-5-1css定位" tabindex="-1">2.5.1CSS定位 <a class="header-anchor" href="#_2-5-1css定位" aria-label="Permalink to &quot;2.5.1CSS定位&quot;">​</a></h2><p>CSS 定位属性允许对元素进行定位改变其在页面的位置。</p><p>CSS 有三种基本的定位机制：<code>普通流</code>、<code>浮动</code>、<code>相对定位</code>和<code>绝对定位</code>。</p><h4 id="元素定位的属性" tabindex="-1">元素定位的属性： <a class="header-anchor" href="#元素定位的属性" aria-label="Permalink to &quot;元素定位的属性：&quot;">​</a></h4><p><code>position</code>:把元素放置到一个静态的、相对的、绝对的、或固定的位置中：</p><blockquote><p><code>static</code>:（默认值）普通流。</p></blockquote><blockquote><p><code>absolute</code>:绝对定位， (相对与最接近的一个有绝对定位设置的父级对象进行绝对定位，如果对象的父元素没有设置定位属性，则依据 body 对象左上角作为参考进行定位)。</p></blockquote><blockquote><p><code>relative</code>:相对定位，相对于其正常位置进行定位。</p></blockquote><blockquote><p><code>fixed</code>:绝对定位，相对于浏览器窗口进行定位。</p></blockquote><blockquote><p><code>sticky</code>:粘性定位，<code>relative</code>与<code>fixed</code>的结合，在滚动事件中，当滚动到顶部时，会有<code>fixed</code>的效果。常用与吸顶效果。</p></blockquote><div class="tip custom-block"><p class="custom-block-title">sticky粘性定位生效条件</p><p>父元素不能<code>overflow:hidden</code>或者<code>overflow:auto</code>属性<br> 必须指定<code>top</code>、<code>bottom</code>、<code>left</code>、<code>right</code>4个值之一，否则只会处于相对定位<br> 父元素的高度不能低于<code>sticky</code>元素的高度<br> sticky元素仅在其父元素内生效</p></div><h4 id="属性值" tabindex="-1">属性值： <a class="header-anchor" href="#属性值" aria-label="Permalink to &quot;属性值：&quot;">​</a></h4><blockquote><p><code>top</code>:元素的上外边距与其包含块上边界之间的偏移。<br><code>right</code>:元素的右外边距与其包含块上边界之间的偏移。<br><code>bottom</code>:元素的下外边距与其包含块上边界之间的偏移。<br><code>left</code>:元素的左外边距与其包含块上边界之间的偏移。</p></blockquote><p><code>clip</code>:设置元素的形状,目前裁切形状只有矩形可以使用。</p><blockquote><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">clip: rect(top, right, bottom, left);</span></span></code></pre></div><p>rect()需要设置四个值：top, right, bottom和left。他们之间需要用逗号隔开，而且rect()属性值和margin、padding一样的标准，遵循顺时针旋转的规则。auto（默认值）clip设置auto值和没有进行剪切是一样的效果;</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>clip属性只能在元素设置了“position:absolute”或者“position:fixed”属性起作用。</p></div></blockquote><p><code>vertical-align</code>:设置元素的垂直对齐方式：（对块元素无效，块元素用margin）</p><blockquote><p><code>baseline</code>:（默认）元素放置在父元素的基线上。<br><code>top</code>:把元素的顶端与行中最高元素的顶端对齐。<br><code>middle</code>:把此元素放置在父元素的中部。<br><code>bottom</code>:把元素的顶端与行中最低的元素的顶端对齐。<br><code>text-top</code>:把元素的顶端与父元素字体的顶端对齐。<br><code>text-bottom</code>:把元素的底端与父元素字体的底端对齐。<br><code>sub</code>:垂直对齐文本的下标。<br><code>super</code>:垂直对齐文本的上标。</p></blockquote><p><code>z-index</code>:设置元素堆叠顺序-1 0 1 2 3 根据大小一次叠加，数值一样，后来居上。</p><blockquote><div class="warning custom-block"><p class="custom-block-title">WARNING</p><ol><li>只作用在被定位了的元素上</li><li>同一个父元素下的元素的层叠效果会受父元素的z-index影响,如果父元素的z-index值很小,那么子元素的z-index值很大也不起作用</li></ol></div></blockquote><p><code>float</code> 定义元素在哪个方向浮动：</p><blockquote><p><code>left</code>:元素向左浮动。<br><code>left</code>:元素向左浮动。<br><code>none</code>:（默认值）元素不浮动，并会显示在其在文本中出现的位置。</p></blockquote><p><code>inset</code>:对应于<code>top</code>、<code>right</code>、<code>bottom</code>、<code>left</code>的简写属性。</p><blockquote><p>inset * 同时设定四个外边距<br> inset ** 分别设定上下、左右外边距<br> inset *** 分别设定上、左右、下外边距<br> inset **** 分别设定上、右、下、左外边距</p></blockquote><h4 id="各定位机制的区别" tabindex="-1">各定位机制的区别： <a class="header-anchor" href="#各定位机制的区别" aria-label="Permalink to &quot;各定位机制的区别：&quot;">​</a></h4><h4 id="普通流" tabindex="-1">普通流： <a class="header-anchor" href="#普通流" aria-label="Permalink to &quot;普通流：&quot;">​</a></h4><ul><li>块级元素从上至下、行内元素从左至右一次排列。</li></ul><h5 id="浮动" tabindex="-1">浮动： <a class="header-anchor" href="#浮动" aria-label="Permalink to &quot;浮动：&quot;">​</a></h5><ul><li>脱离标准流，不占位置，会影响标准流</li><li>子盒子浮动，不会压住父盒子的padding和margin</li><li>浮动元素改变元素的模式，无论行内元素还是块元素，设置浮动后都具有行内块元素特性，浮动的元素可以设置宽高，不设置则内容撑开。</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>浮动的清除的方法（父元素坍塌）：</p><ul><li><code>clear:both/left/right/none</code></li><li><code>overflow:hidden;（通过BFC方式）</code></li><li><code>E:after{content: &quot;&quot;;display: block;clear: both;}</code></li><li>双伪元素</li></ul></div><h5 id="相对定位" tabindex="-1">相对定位： <a class="header-anchor" href="#相对定位" aria-label="Permalink to &quot;相对定位：&quot;">​</a></h5><ul><li>相对定位对象会占据它原来位置</li><li>相对定位对象不可以层叠</li></ul><h5 id="绝对定位" tabindex="-1">绝对定位： <a class="header-anchor" href="#绝对定位" aria-label="Permalink to &quot;绝对定位：&quot;">​</a></h5><ul><li>绝对定位对象不会占据它原来位置</li><li>绝对定位对象可以层叠</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li><p>常用定位模式：子绝、父相对；</p></li><li><p>居中：父的一半减去自己的一半：</p></li><li></li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    transform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /*或*/</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    margin-left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:width/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*宽度的一半*/</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    margin-top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:height/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*高度的一半*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div>`,34),l=[o];function c(d,n,p,h,k,r){return e(),s("div",null,l)}const g=i(t,[["render",c]]);export{u as __pageData,g as default};