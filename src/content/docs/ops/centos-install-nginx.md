---
nav:
  title: 运维
  order: 2
group:
  title: 服务器配置
  order: 2
title: Install nginx
---

# CentOS Install nginx

我想尝鲜下 http3 [点击立即安装](/ops/centos-install-nginx-h3)

## 第一步 安装依赖

```shell
# gcc安装
yum -y install gcc
# pcre、pcre-devel安装
yum install -y pcre pcre-devel
# zlib安装
yum install -y zlib zlib-devel
# 安装openssl
yum install -y openssl openssl-devel
```

## 第二步 安装 nginx

```shell
# 创建目录
mkdir -p /usr/local/softwares/packages && cd /usr/local/softwares/packages
# 下载
wget https://nginx.org/download/nginx-1.24.0.tar.gz
# 解压
tar -xf nginx-1.24.0.tar.gz
# 进入目录
cd nginx-1.24.0
# 编译
./configure \
--prefix=/usr/local/softwares/nginx \
--pid-path=/usr/local/softwares/nginx/logs/nginx.pid \
--lock-path=/usr/local/softwares/nginx/logs/nginx.lock \
--error-log-path=/usr/local/softwares/nginx/logs/error.log \
--http-log-path=/usr/local/softwares/nginx/logs/access.log \
--with-http_gzip_static_module \
--http-client-body-temp-path=/usr/local/softwares/nginx/temp/client \
--http-proxy-temp-path=/usr/local/softwares/nginx/temp/proxy \
--http-fastcgi-temp-path=/usr/local/softwares/nginx/temp/fastcgi \
--http-uwsgi-temp-path=/usr/local/softwares/nginx/temp/uwsgi \
--http-scgi-temp-path=/usr/local/softwares/nginx/temp/scgi \
--with-http_stub_status_module \
--with-http_ssl_module \
--with-stream \
--with-http_v2_module \
# --add-module=/usr/local/softwares/packages/ngx_brotli
# 安装
make && make install
# 配置文件夹
mkdir -p /usr/local/softwares/nginx/temp/client
# 查看版本号
/usr/local/softwares/nginx/sbin/nginx -v
# 测试配置文件
/usr/local/softwares/nginx/sbin/nginx -t
```

## 第三步 配置环境变量

```shell
# 修改文件
vim /etc/profile

# nginx
export NGINX_HOME=/usr/local/softwares/nginx
export PATH=$PATH:$NGINX_HOME/sbin

# 重载
source /etc/profile
```

## 第四步 设置开机启动

```shell
# 创建文件
vim /lib/systemd/system/nginx.service
# 配置
[Unit]
Description=nginx
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/softwares/nginx/sbin/nginx
ExecReload=/usr/local/softwares/nginx/sbin/nginx -s reload
ExecStop=/usr/local/softwares/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target

# 设置开机启动
systemctl enable nginx.service
```
