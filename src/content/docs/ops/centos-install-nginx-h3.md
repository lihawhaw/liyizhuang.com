---
nav:
  title: 运维
  order: 2
group:
  title: 服务器配置
  order: 2
title: Install nginx http3
---

# CentOS Install nginx http3

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
wget https://nginx.org/download/nginx-1.25.1.tar.gz
git clone --recursive https://gitee.com/abool/ngx_brotli.git
# 解压
tar -xf nginx-1.25.1.tar.gz
# 进入目录
cd nginx-1.25.1
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
--with-http_v3_module \
--with-http_realip_module \
--add-module=/usr/local/softwares/packages/ngx_brotli
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

## 第五步 设置配置文件

```nginx
# /usr/local/softwares/nginx/conf/include/docs-dist.conf

server {
    listen 80;
    server_name docs.lihaha.me docs.lihaha.cn;
    return 302 https://docs.lihaha.cn$request_uri;
}

server {
    listen 443 quic reuseport;
    listen 443 ssl;
    http2 on;
    http3 on;
    http3_hq on;
    server_name docs.lihaha.cn;
    ssl_certificate /usr/local/softwares/nginx/conf/ssl/docs.lihaha.cn.pem;
    ssl_certificate_key /usr/local/softwares/nginx/conf/ssl/docs.lihaha.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_early_data on;
    ssl_session_tickets on;
    client_max_body_size 64M;

    server_tokens off;
    keepalive_timeout 5;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript application/javascript text/css application/xml;
    gzip_vary on;

    brotli on;
    brotli_comp_level 5;
    brotli_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;

    location / {
        root /home/z/docs-dist;
        index index.html;
        add_header Alt-Svc 'h3=":443"; ma=86400';
        add_header X-protocol $server_protocol always;
        try_files $uri $uri/ /index.html @rewrites;
    }
}

```
