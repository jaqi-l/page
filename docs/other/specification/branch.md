# 13.6 分支管理规范
![分支管理](/分支管理.png)
<!-- https://www.processon.com/diagraming/64e46d7a49804d28e9cd30ae -->

* `sit`只有流水线有权限合并，且只有`发布灰度`后合并
* `master`只有流水线有权限合并，且只有`发布正式`后合并
* `feature_x`可以基于开发人员拆分，更便于处理交叉功能