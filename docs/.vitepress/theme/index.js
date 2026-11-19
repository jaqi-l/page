import DefaultTheme from 'vitepress/theme'
import ElButton from 'element-plus/es/components/button/index'
import ElInput from 'element-plus/es/components/input/index'
import { ElSelect, ElOption } from 'element-plus/es/components/select/index'
import ElTooltip from 'element-plus/es/components/tooltip/index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-option.css'
import 'element-plus/theme-chalk/el-popper.css'
import 'element-plus/theme-chalk/el-scrollbar.css'
import 'element-plus/theme-chalk/el-select.css'
import 'element-plus/theme-chalk/el-tag.css'
import 'element-plus/theme-chalk/el-tooltip.css'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp: async ({ app, router, siteData }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of site-level metadata.
        app.component('ElButton', ElButton);
        app.component('ElInput', ElInput);
        app.component('ElOption', ElOption);
        app.component('ElSelect', ElSelect);
        app.component('ElTooltip', ElTooltip);
    },
};
