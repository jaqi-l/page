import{_ as s,c as a,o as i,aR as e}from"./chunks/framework.DO9sehX0.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/vue/async.md","filePath":"frontend/vue/async.md","lastUpdated":1716517161000}'),t={name:"frontend/vue/async.md"},n=e(`<h2 id="_6-9-1-nexttick" tabindex="-1">6.9.1 nextTick <a class="header-anchor" href="#_6-9-1-nexttick" aria-label="Permalink to &quot;6.9.1 nextTick&quot;">​</a></h2><p>Vue在更新DOM时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。</p><p>为了在更新DOM后能立即拿的修改后的数据就需要<code>nextTick</code>方法。<code>nextTick</code>会在DOM更新结束后立即执行。</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-3bnZ0" id="tab-ocqyJOt" checked><label for="tab-ocqyJOt">Vue2</label><input type="radio" name="group-3bnZ0" id="tab-qMXecLv"><label for="tab-qMXecLv">Vue3</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">created</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$nextTick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { nextTick  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">created</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    nextTick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在Vue生命周期的<code>created()</code>钩子函数进行的DOM操作一定要放在<code>Vue.nextTick()</code>的回调函数中.</p></div><h2 id="_7-9-2-promise详见3-14-2" tabindex="-1">7.9.2 Promise详见<a href="/frontend/javascript/sync_asyn.html#_3-14-2promise">3.14.2</a> <a class="header-anchor" href="#_7-9-2-promise详见3-14-2" aria-label="Permalink to &quot;7.9.2 Promise详见[3.14.2](/frontend/javascript/sync_asyn#_3-14-2promise)&quot;">​</a></h2><h2 id="_7-9-3-async-await详见3-14-3" tabindex="-1">7.9.3 async/await详见<a href="/frontend/javascript/sync_asyn.html#_3-14-3async-await">3.14.3</a> <a class="header-anchor" href="#_7-9-3-async-await详见3-14-3" aria-label="Permalink to &quot;7.9.3 async/await详见[3.14.3](/frontend/javascript/sync_asyn#_3-14-3async-await)&quot;">​</a></h2>`,7),p=[n];function l(c,h,d,r,o,k){return i(),a("div",null,p)}const _=s(t,[["render",l]]);export{E as __pageData,_ as default};