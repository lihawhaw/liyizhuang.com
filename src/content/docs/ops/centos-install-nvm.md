---
nav:
  second: CentOS安装
group:
  title: 服务器配置
  order: 2
title: Install nvm
---

# CentOS Install nvm node

nvm github: https://github.com/nvm-sh/nvm

## 第一步 安装git

```shell
# 安装
yum install git
# 查看版本
git --version

```

## 第二步 安装 nvm

```shell
# 使用脚本安装
# 1. 官方脚本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# 2. 官方脚本
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# 3. 官方脚本(使用加速链接)
# 脚本详情: https://gist.github.com/lihawhaw/8a356748bc4ece73a160a4446b48c9af
curl -o- https://gist.githubusercontent.com/lihawhaw/8a356748bc4ece73a160a4446b48c9af/raw/bcbb007383d5ff4a9bd48dcafd90977e5bffa3cc/nvm-v0.39.2-install.sh | bash
# 配置环境变量
vim /etc/profile
# 配置
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# 重载
source /etc/profile
# 查看版本
nvm -v
```

## 第三步 安装node

```shell
# 查看所有稳定版
nvm ls-remote --lts
# 安装 16 lts
nvm install lts/Gallium
# 设置默认版本
nvm alias defalut lts/gallium
# 查看 node 版本
node -v
npm -v
```

## 第四步 安装nrm

```shell
# 安装
npm install nrm -g
# 查看源
nrm ls
# 切换源
nrm use taobao
```
