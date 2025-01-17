# 13.5 提交规范
## 13.5.1 `commit message`规范
`commit message` 由 `Header`、`Body`、`Footer` 组成

#### `Header`
`Header` 部分包括三个字段 `type`（必需）、`scope`（可选）和 `subject`（必需）

1. `type` 可选项       

> | 值         | 描述                                                         |
> | ---------- | ------------------------------------------------------------ |
> | `feat`     | 新增一个功能                                                 |
> | `fix`      | 修复一个 Bug                                                 |
> | `docs`     | 文档变更                                                     |
> | `style`    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
> | `refactor` | 代码重构                                                     |
> | `perf`     | 改善性能                                                     |
> | `test`     | 测试                                                         |
> | `build`    | 变更项目构建或外部依赖（`webpack`、`gulp`、`npm` 等）        |
> | `ci`       | 更改持续集成软件的配置文件和 `package` 中的 `scripts` 命令等 |
> | `chore`    | 变更构建流程或辅助工具                                       |
> | `revert`   | 代码回退                                                     |

2. `scope`      
`scope` 用于指定本次 `commit` 影响的范围。`scope` 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分      

3. `subject`        
`subject` 是本次 `commit` 的简洁描述。长度约定在 50 个字符以内，通常遵循以下几个规范：
> 用动词开头，第一人称现在时表述，例如：change 代替 changed 或 changes
> 第一个字母小写
> 结尾不加句号（.）

#### `Body`        
`body` 是对本次 `commit` 的详细描述，可以分成多行。（非必填）       
跟 `subject` 类似，用动词开头，`body` 应该说明修改的原因和更改前后的行为对比        

#### `Footer`       
如果本次提交的代码是突破性的变更或关闭缺陷，则 `Footer` 必需，否则可以省略。

> 突破性的变更
>> 当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由。

> 关闭缺陷
>> 如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

## 13.5.2 `commitizen` 辅助提交规范

1. 全局安装
```zsh
pnpm install -g commitizen commitlint cz-conventional-changelog-zh
```

2. 创建 `~/.czrc`文件
```.czrc
{ "path": "cz-conventional-changelog-zh" }
```

3. 使用 `git cz `命令来代替 `git commit` 命令即可

## 13.5.3 `commitlint` 验证提交规范

1. 全局安装
```zsh
pnpm install commitlint @commitlint/config-conventional -g
```

2. 使用 `husky` 验证提交规范
```zsh
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

```
# .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit 
```

3.  配置校验规范
```js
// commitlint.config.cjs
module.exports = { extends: ["@commitlint/config-conventional"] };
```


