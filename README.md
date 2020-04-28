
1. clone the project
    
        git clone xxx

2. enter the project directory

        cd project_name
3. install dependency

        npm install
4. develop

        npm run dev

    This will automatically open http://localhost:9528

>Build
    
    ```bash
    # build for test environment
    npm run build:stage
    
    # build for production environment
    npm run build:prod
    ```

>Advanced
    
    ```bash
    # preview the release environment effect
    npm run preview
    
    # preview the release environment effect + static resource analysis
    npm run preview -- --report
    
    # code format check
    npm run lint
    
    # code format check and auto fix
    npm run lint -- --fix
    ```

>Eslint(设置编辑器)

=>WebStorm
    
- 打开ESLint
    
        WesStorm-> preferences-> Languages & Frameworks-> JavaScript-> CodeQuality Tools-> ESLint

- 自动保存
        
        WesStorm-> preferences-> Appearance&Behavior-> system settings-> Synchronization
        
- 添加修复ESLint 代码快捷键
    
        WesStorm-> preferences-> Keymap-> 搜索eslint，给`Fix ESlint problems`添加快捷键，比如`ctrl+s`

- 宏录制（可实现保存的同时自动修复Eslint）

=>VSCode
- 安装ESLint插件
- 设置ESLint 自动保存修复
        
        "eslint.autoFixOnSave": true,  //  启用保存时自动修复,默认只支持.js文件
        "eslint.validate": [
            "javascript",  //  用eslint的规则检测js文件
            {
                "language": "vue",   // 检测vue文件
                "autoFix": true   //  为vue文件开启保存自动修复的功能
            },
            {
                "language": "html",
                "autoFix": true
            },
        ]
    [了解更多ESLint设置](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

