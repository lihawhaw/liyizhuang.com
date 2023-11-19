---
nav:
  title: 运维
  order: 2
group:
  title: 服务器配置
  order: 2
title: Install golang
---

# CentOS Install Go

golang 官网: https://go.dev/doc/install

## 第一步 安装

```shell
# 创建目录
mkdir -p /usr/local/softwares/packages && cd /usr/local/softwares/packages
# 下载
wget https://go.dev/dl/go1.19.3.linux-amd64.tar.gz
# 修改目录
mv /usr/local/softwares/packages/go /usr/local/softwares/go
# 查看版本
/usr/local/softwares/go/bin/go version
```

## 第二步 环境变量

```shell
# 编辑
vim /etc/profile
# 配置
# go
export GOLANG_HOME=/usr/local/softwares/go
export PATH=$PATH:$GOLANG_HOME/bin
# 重载
source /etc/profile
```
