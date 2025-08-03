---
title: Git 配置
---

## ssh 配置

```
// ~/.ssh/config

Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/github.ssh

Host gitee.com
  HostName gitee.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitee.ssh

Host tencent_448
  HostName 0.0.0.0
  User root
  ForwardAgent yes
  IdentityFile ~/.ssh/tencent_448.ssh

```

## git 配置

### 全局配置

```
// ~/.gitconfig

[user]
	name = lihawhaw
	email = i@lihaha.cn

[push]
  autoSetupRemote = true

[log]
  date = format:%Y-%m-%d %H:%M:%S %A

# 配置不同文件夹下，使用不同的用户名
# [includeIf "gitdir:/Users/z/Projects/**"]
#  path = ~/.gitconfig-projects

```

### 指定目录的git配置

```
// ~/.gitconfig-projects

[user]
  name = xiaoming
  email = xiaoming@lihaha.cn
```
