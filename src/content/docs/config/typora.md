---
title: typora 配置
---

## Typora + PicGo-Core 上传

### 安装 PicGo-Core

```shell
npm install picgo -g
```

### 安装图片重命名插件

```shell
picgo install picgo-plugin-rename-file
```

### 修改配置

```json
// ~/.picgo/config.json
{
  "picBed": {
    "uploader": "tcyun",
    "current": "tcyun",
    "tcyun": {
      "version": "",
      "secretId": "",
      "secretKey": "",
      "bucket": "",
      "appId": "",
      "area": "",
      "endpoint": "",
      "path": "",
      "customUrl": "",
      "options": "",
      "slim": false
    },
    "transformer": "path"
  },
  "picgoPlugins": {
    "picgo-plugin-rename-file": true
  },
  "picgo-plugin-rename-file": {
    "format": "{hash}"
  }
}
```

### 修改 Typora 上传

#### 查看 node 路径

````shell
which node
/Users/z/.local/state/fnm_multishells/30247_1765298153345/bin/node
```

#### 查看 picgo 路径
```shell
which picgo
/Users/z/.local/state/fnm_multishells/30247_1765298153345/bin/picgo
````

#### 选择 设置 > 图像 > 上传服务设定

上传服务：选择“自定义命令”

命令：“{node路径} {picgo路径} upload”

e.g:

```md
/Users/z/.local/state/fnm_multishells/30247_1765298153345/bin/node /Users/z/.local/state/fnm_multishells/30247_1765298153345/bin/picgo upload
```
