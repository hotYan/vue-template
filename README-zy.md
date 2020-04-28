
# 项目结构

        ├── build                      # 构建相关
        ├── mock                       # 项目mock 模拟数据
        ├── public                     # 静态资源
        │   │── favicon.ico            # favicon图标
        │   └── index.html             # html模板
        ├── src                        # 源代码
        │   ├── api                    # 所有请求
        │   ├── assets                 # 主题 字体等静态资源
        │   ├── components             # 全局公用组件
        │   ├── filters                # 全局 filter
        │   ├── icons                  # 项目所有 svg icons
        │   ├── layout                 # 全局 layout
        │   ├── router                 # 路由
        │   ├── store                  # 全局 store管理(vuex)
        │   ├── styles                 # 全局样式
        │   ├── utils                  # 全局公用方法
        │   ├── views                  # views 所有页面
        │   ├── App.vue                # 入口页面
        │   ├── main.js                # 入口文件 加载组件 初始化等
        │   └── permission.js          # 权限管理
        ├── tests                      # 测试
        ├── .env.xxx                   # 环境变量配置
        ├── .eslintrc.js               # eslint 配置项
        ├── .babelrc                   # babel-loader 配置
        ├── .travis.yml                # 自动化CI配置
        ├── vue.config.js              # vue-cli 配置
        ├── postcss.config.js          # postcss 配置
        └── package.json               # package.json

<br/>
<br/>

# 功能预览

1. 获取列表(支持分页、搜索)

2. 添加(多条规则添加)

3. 编辑

4. 删除

6. 详情

7. 详情Tab页


<br/>
<br/>

# 个性化定制部分

>## 封装全局共用列表和分页组件

        # 问题1
        重复使用的列表和分页功能

        # 解决问题1
        封装一个全局共用的Pageloading组件：src/components/Pageloading

<br/>

>## 详情Tab页

        # 问题1
        使用Element-UI的`Tabs标签页`，如果标签个数大于2(标签个数为2时，不会出现这个问题)，会出现，高亮切换时，总是总第一个开始切换，影响体验。

        # 解决问题1
        写一个原生的tabs标签页，如`src/views/admin/School/details/index.vue`

<br/>

>## 路由和侧边栏

     # 问题1
     路由深度大于1，不想侧边栏出现子菜单；
     # 解决问题1
     在想隐藏的子菜单路由中，使用`hidden: true //(默认 false)`
    
     # 问题2
     路由深度大于1，子菜单不出现在侧边栏的情况下，会出现跳转到子路由后，侧边栏根目录高亮没有了；
     # 解决问题2
     在子路由中，使用`meta{ activeMenu:root_path }`

     # 问题3
     侧边栏的图标，点击始终不高亮
     # 解决问题3
     找到该图标的.svg文件，删除 `fill=''`属性
