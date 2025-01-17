# 13.2 代码检测
## 13.4.1 代码检查

1. 安装 `ESLint` 及相关依赖
::: code-group  
```zsh [Vue2]
npm install eslint eslint-plugin-vue -D
```

```zsh [Vue3+Typescript]
npm install eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
:::

2. 配置 `ESLint` 规则
::: code-group    
```zsh [Vue2]
// .eslintrc.js

module.exports = {
    root: true,
    env: {
        // 代码运行环境
        browser: true,
        node: true,
        commonjs: true,
        amd: true,
        es6: true,
        mocha: true
    },
    parser: "vue-eslint-parser", // 也可以是 babel-eslint
    parserOptions: {
        // 解析器配置
        allowImportExportEverywhere: true, // import 和 export 声明只能出现在代码头部
        ecmaVersion: "latest", // ECMAScript 版本
        sourceType: "module"
    },
    extends: ["plugin:vue/recommended", "eslint:recommended"],
    // https://eslint.nodejs.cn/docs/latest/rules/
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 警告
    // "error" 或 2 - 错误
    rules: {
        // 禁止条件表达式中出现赋值操作符
        "no-cond-assign": 2,
        // 禁用 console
        "no-console": 1,
        // 禁止在条件中使用常量表达式
        "no-constant-condition": 2,
        // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
        "no-control-regex": 2,
        // 要求或禁止尾随逗号
        "comma-dangle": [1, "never"],
        // 禁用 debugger
        "no-debugger": 2,
        // 禁止 function 定义中出现重名参数
        "no-dupe-args": 2,
        // 禁止对象字面量中出现重复的 key
        "no-dupe-keys": 2,
        // 禁止重复的 case 标签
        "no-duplicate-case": 2,
        // 禁止空语句块
        "no-empty": 2,
        // 禁止在正则表达式中使用空字符集 (/^abc[]/)
        "no-empty-character-class": 2,
        // 禁止对 catch 子句的参数重新赋值
        "no-ex-assign": 2,
        // 禁止不必要的布尔转换
        "no-extra-boolean-cast": 2,
        // 禁止不必要的括号 //(a * b) + c;//报错
        "no-extra-parens": 0,
        // 禁止不必要的分号
        "no-extra-semi": 2,
        // 禁止对 function 声明重新赋值
        "no-func-assign": 2,
        // 禁止在嵌套的块中出现 function 或 var 声明
        "no-inner-declarations": [2, "functions"],
        // 禁止 RegExp 构造函数中无效的正则表达式字符串
        "no-invalid-regexp": 2,
        // 禁止在字符串和注释之外不规则的空白
        "no-irregular-whitespace": 2,
        // 禁止在 in 表达式中出现否定的左操作数
        "no-negated-in-lhs": 2,
        // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
        "no-obj-calls": 2,
        // 禁止直接使用 Object.prototypes 的内置属性
        "no-prototype-builtins": 0,
        // 禁止正则表达式字面量中出现多个空格
        "no-regex-spaces": 2,
        // 禁用稀疏数组
        "no-sparse-arrays": 2,
        // 禁止出现令人困惑的多行表达式
        "no-unexpected-multiline": 2,
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        "no-unreachable": 2,
        // 要求使用 isNaN() 检查 NaN
        "use-isnan": 2,
        // 强制使用有效的 JSDoc 注释
        "valid-jsdoc": 1,
        // 强制 typeof 表达式与有效的字符串进行比较
        // typeof foo === "undefimed" 错误
        "valid-typeof": 2,

        // ////////////
        // 最佳实践 //
        // ////////////

        // 定义对象的set存取器属性时，强制定义get
        "accessor-pairs": 2,
        // 强制数组方法的回调函数中有 return 语句
        "array-callback-return": 0,
        // 强制把变量的使用限制在其定义的作用域范围内
        "block-scoped-var": 0,
        // 限制圈复杂度，也就是类似if else能连续接多少个
        complexity: [2, 9],
        // 要求 return 语句要么总是指定返回的值，要么不指定
        "consistent-return": 0,
        // 强制所有控制语句使用一致的括号风格
        curly: [2, "all"],
        // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
        "default-case": 2,
        // 强制object.key 中 . 的位置，参数:
        // property，'.'号应与属性在同一行
        // object, '.' 号应与对象名在同一行
        "dot-location": [2, "property"],
        // 强制使用.号取属性
        // 参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
        // false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]
        // allowPattern: 当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]
        // "dot-notation": [2, {
        //     "allowKeywords": false
        // }],
        // 使用 === 替代 == allow-null允许null和undefined==
        eqeqeq: [2, "allow-null"],
        // 要求 for-in 循环中有一个 if 语句
        "guard-for-in": 2,
        // 禁用 alert、confirm 和 prompt
        "no-alert": 0,
        // 禁用 arguments.caller 或 arguments.callee
        "no-caller": 2,
        // 不允许在 case 子句中使用词法声明
        "no-case-declarations": 2,
        // 禁止除法操作符显式的出现在正则表达式开始的位置
        "no-div-regex": 2,
        // 禁止 if 语句中有 return 之后有 else
        "no-else-return": 0,
        // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
        "no-empty-function": 2,
        // 禁止使用空解构模式no-empty-pattern
        "no-empty-pattern": 2,
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        "no-eq-null": 1,
        // 禁用 eval()
        "no-eval": 2,
        // 禁止扩展原生类型
        "no-extend-native": 2,
        // 禁止不必要的 .bind() 调用
        "no-extra-bind": 2,
        // 禁用不必要的标签
        "no-extra-label:": 0,
        // 禁止 case 语句落空
        "no-fallthrough": 2,
        // 禁止数字字面量中使用前导和末尾小数点
        "no-floating-decimal": 2,
        // 禁止使用短符号进行类型转换(!!fOO)
        "no-implicit-coercion": 0,
        // 禁止在全局范围内使用 var 和命名的 function 声明
        "no-implicit-globals": 1,
        // 禁止使用类似 eval() 的方法
        "no-implied-eval": 2,
        // 禁止 this 关键字出现在类和类对象之外
        "no-invalid-this": 0,
        // 禁用 __iterator__ 属性
        "no-iterator": 2,
        // 禁用标签语句
        "no-labels": 2,
        // 禁用不必要的嵌套块
        "no-lone-blocks": 2,
        // 禁止在循环中出现 function 声明和表达式
        "no-loop-func": 1,
        // 禁用幻数(3.14什么的用常量代替)
        "no-magic-numbers": [
            1,
            {
                ignore: [0, -1, 1] // 忽略 0, -1, 1
            }
        ],
        // 禁止使用多个空格
        "no-multi-spaces": 2,
        // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
        "no-multi-str": 2,
        // 禁止对原生对象赋值
        "no-native-reassign": 2,
        // 禁止在非赋值或条件语句中使用 new 操作符
        "no-new": 2,
        // 禁止对 Function 对象使用 new 操作符
        "no-new-func": 0,
        // 禁止对 String，Number 和 Boolean 使用 new 操作符
        "no-new-wrappers": 2,
        // 禁用八进制字面量
        "no-octal": 2,
        // 禁止在字符串中使用八进制转义序列
        "no-octal-escape": 2,
        // 不允许对 function 的参数进行重新赋值
        "no-param-reassign": 0,
        // 禁用 __proto__ 属性
        "no-proto": 2,
        // 禁止使用 var 多次声明同一变量
        "no-redeclare": 2,
        // 禁用指定的通过 require 加载的模块
        "no-return-assign": 0,
        // 禁止使用 javascript: url
        "no-script-url": 0,
        // 禁止自我赋值
        "no-self-assign": 2,
        // 禁止自身比较
        "no-self-compare": 2,
        // 禁用逗号操作符
        "no-sequences": 2,
        // 禁止抛出非异常字面量
        "no-throw-literal": 2,
        // 禁用一成不变的循环条件
        "no-unmodified-loop-condition": 2,
        // 禁止出现未使用过的表达式
        "no-unused-expressions": 0,
        // 禁用未使用过的标签
        "no-unused-labels": 2,
        // 禁止不必要的 .call() 和 .apply()
        "no-useless-call": 2,
        // 禁止不必要的字符串字面量或模板字面量的连接
        "no-useless-concat": 2,
        // 禁用不必要的转义字符
        "no-useless-escape": 0,
        // 禁用 void 操作符
        "no-void": 0,
        // 禁止在注释中使用特定的警告术语
        "no-warning-comments": 0,
        // 禁用 with 语句
        "no-with": 2,
        // 强制在parseInt()使用基数参数
        radix: 2,
        // 要求所有的 var 声明出现在它们所在的作用域顶部
        "vars-on-top": 0,
        // 要求 IIFE 使用括号括起来
        "wrap-iife": [2, "any"],
        // 要求或禁止 “Yoda” 条件
        yoda: [2, "never"],
        // 要求或禁止使用严格模式指令
        strict: 0,

        // ////////////
        // 变量声明 //
        // ////////////

        // 要求或禁止 var 声明中的初始化(初值)
        "init-declarations": 0,
        // 不允许 catch 子句的参数与外层作用域中的变量同名
        "no-catch-shadow": 0,
        // 禁止删除变量
        "no-delete-var": 2,
        // 不允许标签与变量同名
        "no-label-var": 2,
        // 禁用特定的全局变量
        "no-restricted-globals": 0,
        // 禁止 var 声明 与外层作用域的变量同名
        "no-shadow": 0,
        // 禁止覆盖受限制的标识符
        "no-shadow-restricted-names": 2,
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        "no-undef": 2,
        // 禁止将变量初始化为 undefined
        "no-undef-init": 2,
        // 禁止将 undefined 作为标识符
        "no-undefined": 0,
        // 禁止出现未使用过的变量
        "no-unused-vars": [
            2,
            {
                vars: "all",
                args: "none"
            }
        ],
        // 不允许在变量定义之前使用它们
        "no-use-before-define": 0,

        // ////////////////////////
        // Node.js and CommonJS //
        // ////////////////////////

        // require return statements after callbacks
        "callback-return": 0,
        // 要求 require() 出现在顶层模块作用域中
        "global-require": 1,
        // 要求回调函数中有容错处理
        "handle-callback-err": [2, "^(err|error)$"],
        // 禁止混合常规 var 声明和 require 调用
        "no-mixed-requires": 0,
        // 禁止调用 require 时使用 new 操作符
        "no-new-require": 2,
        // 禁止对 __dirname 和 __filename进行字符串连接
        "no-path-concat": 0,
        // 禁用 process.env
        "no-process-env": 0,
        // 禁用 process.exit()
        "no-process-exit": 0,
        // 禁用同步方法
        "no-sync": 0,

        // ////////////
        // 风格指南 //
        // ////////////

        // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        "array-bracket-spacing": [2, "never"],
        // 禁止或强制在单行代码块中使用空格(禁用)
        "block-spacing": [1, "never"],
        // 为块强制执行一致的大括号样式
        "brace-style": [
            2,
            "1tbs",
            {
                allowSingleLine: true
            }
        ],
        // 双峰驼命名格式
        camelcase: 2,
        // 控制逗号前后的空格
        "comma-spacing": [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 控制逗号在行尾出现还是在行首出现 (默认行尾)
        "comma-style": [2, "last"],
        // "SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进水平
        // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        "computed-property-spacing": [2, "never"],
        // 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
        // e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
        "consistent-this": [1, "that"],
        // 强制使用命名的 function 表达式
        "func-names": 0,
        // 文件末尾强制换行
        "eol-last": 2,
        // 强制执行一致的缩进
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        "key-spacing": [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // 强制使用一致的换行风格
        "linebreak-style": [1, "unix"],
        // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
        "lines-around-comment": [
            1,
            {
                beforeBlockComment: true
            }
        ],
        // 强制一致地使用函数声明或函数表达式，方法定义风格，参数：
        // declaration: 强制使用方法声明的方式，function f(){} e.g [2, "declaration"]
        // expression：强制使用方法表达式的方式，var f = function() {} e.g [2, "expression"]
        // allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, "declaration", { "allowArrowFunctions": true }]
        "func-style": 0,
        // 强制回调函数最大嵌套深度 5层
        "max-nested-callbacks": [1, 5],
        // 禁止使用指定的标识符
        "id-blacklist": 0,
        // 强制标识符的最新和最大长度
        "id-length": 0,
        // 要求标识符匹配一个指定的正则表达式
        "id-match": 0,
        // 强制在 JSX 属性中一致地使用双引号或单引号
        "jsx-quotes": 0,
        // 强制在关键字前后使用一致的空格 (前后腰需要)
        "keyword-spacing": 2,
        // 强制一行的最大长度
        "max-len": [1, 200],
        // 强制最大行数
        "max-lines": 0,
        // 强制 function 定义中最多允许的参数数量
        "max-params": [1, 7],
        // 强制 function 块最多允许的的语句数量
        "max-statements": [1, 200],
        // 强制每一行中所允许的最大语句数量
        "max-statements-per-line": 0,
        // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
        "new-cap": [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        // 要求调用无参构造函数时有圆括号
        "new-parens": 2,
        // 要求或禁止 var 声明语句后有一行空行
        "newline-after-var": 0,
        // 禁止使用 Array 构造函数
        "no-array-constructor": 2,
        // 禁用按位运算符
        "no-bitwise": 0,
        // 要求 return 语句之前有一空行
        "padding-line-between-statements": 0,
        // 要求方法链中每个调用都有一个换行符
        "newline-per-chained-call": 1,
        // 禁用 continue 语句
        "no-continue": 0,
        // 禁止代码后的内联注释
        "no-inline-comments": 0,
        "no-lonely-if": 1, // 不允许 if 语句作为 else 块中的唯一语句
        "no-mixed-operators": 0, // 禁止混合二元运算符
        "no-mixed-spaces-and-tabs": 2, // 不允许空格和 tab 混合缩进
        "no-multiple-empty-lines": [
            // 不允许多个空行
            2,
            {
                max: 2
            }
        ],
        "no-negated-condition": 0, // 禁止否定条件
        "no-nested-ternary": 0, // 不允许使用嵌套的三元表达式
        "no-new-object": 2, // 禁止使用 Object 的构造函数
        "no-plusplus": 0, // 禁止使用一元操作符 ++ 和 --
        "no-restricted-syntax": 0, // 禁止使用特定的语法
        "func-call-spacing": 2, // 禁止函数标识符和它们的调用之间有空格
        "no-ternary": 0, // 禁止三元运算符
        "no-trailing-spaces": 2, // 不允许在行尾尾随空格
        "no-underscore-dangle": 0, // 不允许在标识符中使用悬挂下划线 _foo
        "no-unneeded-ternary": 2, // 当存在更简单的替代方案时，禁止使用三元运算符
        "no-whitespace-before-property": 2, // 禁止属性前有空格
        "object-curly-newline": 0, // 强制将对象属性放在单独的行上
        "object-curly-spacing": 0, // 强制在花括号中使用一致的空格
        "object-property-newline": 0, // 强制将对象属性放在单独的行上
        "one-var": [
            // 强制变量在函数中一起或单独声明
            2,
            {
                initialized: "never"
            }
        ],
        "one-var-declaration-per-line": 0, // 要求或禁止在变量声明周围换行
        "operator-assignment": 1, // 尽可能要求或禁止赋值运算符简写
        "operator-linebreak": [
            // 为操作符强制执行一致的换行样式
            2,
            "after",
            {
                overrides: {
                    "?": "before",
                    ":": "before"
                }
            }
        ],
        "padded-blocks": 0, // 要求或不允许块内填充
        "quote-props": 0, // 需要在对象字面量属性名称周围加上引号
        quotes: [2, "double", "avoid-escape"], // 强制一致使用反引号、双引号或单引号
        semi: [2, "always"], // 要求或禁止使用分号而不是 ASI
        "semi-spacing": 0, // 在分号前后强制执行一致的间距
        "sort-vars": 0, // 要求对同一声明块中的变量进行排序
        "space-before-blocks": [2, "always"], // 在块之前强制执行一致的间距
        "space-before-function-paren": [0, "always"], // 在 function 定义左括号之前强制执行一致的间距
        "space-in-parens": [2, "never"], // 在括号内强制使用一致的间距
        "space-infix-ops": 2, // 要求操作符周围有空格
        "space-unary-ops": [
            // 在一元运算符之前或之后强制执行一致的间距
            2,
            {
                words: true,
                nonwords: false
            }
        ],

        "spaced-comment": [
            // 在注释中的 // 或 /* 之后强制执行一致的间距
            2,
            "always",
            {
                markers: [
                    "global",
                    "globals",
                    "eslint",
                    "eslint-disable",
                    "*package",
                    "!"
                ]
            }
        ],

        "unicode-bom": 0, // 要求或禁止 Unicode 字节顺序标记 (BOM)

        // 要求正则表达式被括号括起来
        "wrap-regex": 0,
        // ////////////
        // ES6.相关 //
        // ////////////
        "arrow-body-style": 2, // 箭头函数体周围需要大括号
        "arrow-parens": 2, // 箭头函数参数需要括号
        "arrow-spacing": [
            // 在箭头函数中的箭头前后强制执行一致的间距
            2,
            {
                before: true,
                after: true
            }
        ],
        "constructor-super": 0, // 要求在构造函数中调用 super()
        "generator-star-spacing": [
            // 在生成器函数中围绕 * 运算符强制执行一致的间距
            2,
            {
                before: true,
                after: true
            }
        ],
        "no-class-assign": 2, // 禁止重新分配类成员
        "no-confusing-arrow": 0, // 禁止使用可能与比较混淆的箭头函数
        "no-const-assign": 2, // 禁止修改 const 声明的变量
        "no-dupe-class-members": 2, // 禁止重复的类成员
        "no-duplicate-imports": 0, // 禁止重复的模块的进导入
        "no-new-symbol": 2, // 禁止使用 Symbol 对象的 new 运算符
        "no-restricted-imports": 0, // import 加载时禁止指定模块
        "no-this-before-super": 2, // 在构造函数中调用 super() 之前禁止 this/super
        "no-useless-computed-key": 0, // 禁止在对象和类中使用不必要的计算属性键
        "no-var": 0, // 要求使用 let 或 const 而不是 var
        "object-shorthand": 0, // 要求或禁止对象字面的方法和属性速记语法
        "prefer-arrow-callback": 0, // 要求使用箭头函数作为回调
        "prefer-const": 1, // 要求使用 const 声明那些声明后不再被修改的变量
        "prefer-spread": 0, // 要求使用扩展运算符而非 apply()
        "prefer-template": 0, // 要求使用模板字面量而非字符串连接
        "prefer-rest-params": 2, // 获取剩余参数的时候需要需要 rest 参数而不是 arguments
        "require-yield": 0, // 要求generator 函数内有 yield
        "rest-spread-spacing": 2, // 要求或禁止扩展运算符与表达是之间有空格
        "sort-imports": 0, // 强制模块内的 import 排序
        "template-curly-spacing": 2, // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        "yield-star-spacing": 2, // 要求或禁止 `yield*` 表达式中的 `*` 周围有空格
        // ////////////
        // eslint-plugin-vue 规则 //
        // https://eslint.vuejs.org/rules/ //
        // ////////////
        // 强制执行一致的缩进
        "vue/html-indent": [2, 4],
        // 强制每行的最大属性数
        "vue/max-attributes-per-line": [2, {
            "singleline": {
                "max": 2
            },
            "multiline": {
                "max": 1
            }
        }],
        // 组件的命名必须是多单词的
        "vue/multi-word-component-names": [1, {
            "ignores": []
        }]
    }
};
```
  
```zsh [Vue3+Typescript]
// .eslintrc.cjs

module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [ // 扩展的配置方案
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    /* ------ https://eslint.nodejs.cn/docs/latest/rules/ ------ */
    /*  
        "off" 或 0 - 关闭规则
        "warn" 或 1 - 警告
        "error" 或 2 - 错误
    */
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
         /* ------ @typescript-eslint 规则 https://typescript-eslint.io/rules/ ------ */
        "@typescript-eslint/no-explicit-any": ["warn"],
        /* ------ eslint-plugin-vue 规则  https://eslint.vuejs.org/rules/ ------ */
        "vue/valid-v-for":["warn"],
        // 组件的命名必须是多单词的
        "vue/multi-word-component-names": ["warn"]
    }
};
```
:::  

3. 配置 `ESLint` 的忽略文件

```zsh
// .eslintignore

build/*.js
src/assets
public
dist
*.d.ts
```

4. 配置 `ESLint` 脚本 
```json
// package.json

"scripts": {
    "lint": "eslint --ext .js,.ts,.vue src",
    "lintfix": "eslint --fix --ext .js,.ts,.vue src"
},
```

5. 对代码单独设置校验规则

* 关闭段落校验
```js
/* eslint-disable */
some code1
some code2
/* eslint-enable */
```

* 关闭当前行校
```js
some code // eslint-disable-line
```

* 关闭下一行校验
```js
// eslint-disable-next-line
some code
```

[ESLint规则参考](https://eslint.nodejs.cn/docs/latest/rules/)、[VUE规则参考](https://eslint.vuejs.org/rules/)


## 13.4.2 代码高亮

::: code-group

``` [Vscode Vue2]
安装 `Vetur` 代码高亮插件
```

``` [Vscode Vue3+Typescript]
安装 `Vue Language Features (Volar)`、`TypeScript Vue Plugin (Volar)`
```
:::

## 13.4.3 代码格式化

::: code-group

```json [Vscode]
 // command+shift+p
 // settings.json
 // Vscode 安装 `Markdown All in One`

 "[vue]": {
     "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "[javascript]": {
     "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "[json]": {
     "editor.defaultFormatter": "dbaeumer.vscode-eslint"
 },
 "[markdown]": {
     "editor.defaultFormatter": "yzhang.markdown-all-in-one" 
 },
 "editor.defaultFormatter": "dbaeumer.vscode-eslint",
```
:::

## 13.4.4 提交校验

1. 安装 `husky`、`lint-staged`
```zsh
npx husky-init && pnpm install
```

2. 配置验证的触发时机(案例是 `git commit` 之前)

```zsh
npx husky add .husky/pre-commit "npm run lint"
```

```
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
```

3. `lint-staged`


::: tip

`husky` —— `Git Hook` 工具，可以设置在 `git` 各个阶段（`pre-commit`、`commit-msg`、`pre-push` 等）触发我们的命令      
`lint-staged `—— 在 `git` 暂存的文件上运行 `linters`

* `git`钩子     
> | 值                   | 描述                                                | 备注                                    | 
> | -----------------    | ----------------------------------- | ----------------------------------------------------- | 
> | `pre-commit`         | `commit` 执行前                  |可以通过`git commit --no-verify`绕过                     |
> | `commit-msg`         | `commit` 执行前                  |可以用`git commit --no-verify`绕过                       |
> | `post-commit`        | `commit` 执行后                  |不影响`commit`的结果                                 |
> | `pre-merge-commit`   | `merge` 执行前                   |可以用`git merge --no-verify`绕过                        |
> | `prepare-commit-msg` | `commit` 执行后，编辑器打开之前     |                                                       |
> | `pre-rebase`         | `rebase` 执行前                   |                                                       |
> | `post-checkout`      | `checkout` 或 `git switch` 执行后 | 如果不使用`--no-checkout`参数，则在`git clone`之后也会执行 |
> | `post-merge`         | `commit` 执行后                   | 在执行 `git pull` 时也会被调用                           |
> | `pre-push`           | `push `执行前                     |                                                       |
:::

