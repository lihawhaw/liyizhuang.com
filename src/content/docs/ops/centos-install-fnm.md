---
# nav:
#   title: 运维
#   order: 2
# group:
#   title: 服务器配置
#   order: 2
title: Install fnm
---

# CentOS Install fnm node

## 第一步 安装 git

```shell
# 安装
yum install git
# 查看版本
git --version

```

## 第二步 安装 fnm

```shell
curl -fsSL  https://lihaha-cn-web-static-1256651264.cos.ap-shanghai.myqcloud.com/i.sh  | bash
```

## 第三步 安装 node

```shell
# 列出所有远程node.js版本[别名:ls-remote]
fnm ls-remote
# 安装 16
fnm install 16
# 查看下载的node列表
fnm ls
# 设置默认版本
fnm defalut 16
# 查看 node 版本
node -v
npm -v
```

## 第四步 安装 nrm

```shell
# 安装
npm install nrm -g
# 查看源
nrm ls
# 切换源
nrm use taobao
```
