import{R as i}from"./chunks/theme.3pwWk0AQ.js";import{U as o,bw as u,bx as l,by as c,bz as f,bA as d,bB as m,bC as b,bD as h,bE as A,bF as g,d as y,u as w,k as C,y as P,bG as v,bH as E,bI as R,aE as S}from"./chunks/framework.BwSdcL0X.js";function p(e){if(e.extends){const t=p(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const s=p(i),T=y({name:"VitePressApp",setup(){const{site:e,lang:t,dir:a}=w();return C(()=>{P(()=>{document.documentElement.lang=t.value,document.documentElement.dir=a.value})}),e.value.router.prefetchLinks&&v(),E(),R(),s.setup&&s.setup(),()=>S(s.Layout)}});async function D(){globalThis.__VITEPRESS__=!0;const e=F(),t=x();t.provide(l,e);const a=c(e.route);return t.provide(f,a),t.component("Content",d),t.component("ClientOnly",m),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:t,router:e,siteData:b}),{app:t,router:e,data:a}}function x(){return h(T)}function F(){let e=o,t;return A(a=>{let n=g(a),r=null;return n&&(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&D().then(({app:e,router:t,data:a})=>{t.go().then(()=>{u(t.route,a.site),e.mount("#app")})});export{D as createApp};