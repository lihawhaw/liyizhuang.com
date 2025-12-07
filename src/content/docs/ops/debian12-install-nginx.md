---
nav:
  title: 运维
  order: 2
group:
  title: 服务器配置
  order: 2
title: Debian12 Install nginx http3
---

## 第一步 安装依赖

```shell
# gcc安装
apt install -y build-essential libpcre3-dev zlib1g-dev libssl-dev cmake git tar wget
```

## 第二步 安装 nginx

```shell
# 创建目录
mkdir -p /usr/local/softwares/packages && cd /usr/local/softwares/packages
# 下载
wget https://nginx.org/download/nginx-1.27.5.tar.gz
git clone --recurse-submodules -j8 https://gitee.com/lihawhaw/ngx_brotli.git
cd ngx_brotli/deps/brotli
mkdir out && cd out
cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_C_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_CXX_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_INSTALL_PREFIX=./installed ..
cmake --build . --config Release --target brotlienc
cd ../../../..
# 解压
tar -xf nginx-1.27.5.tar.gz
# 进入目录
cd nginx-1.27.5
# 配置 brotli
export CFLAGS="-m64 -march=native -mtune=native -Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"
export LDFLAGS="-m64 -Wl,-s -Wl,-Bsymbolic -Wl,--gc-sections"
# 编译
./configure \
--prefix=/usr/local/nginx \
--pid-path=/usr/local/nginx/logs/nginx.pid \
--lock-path=/usr/local/nginx/logs/nginx.lock \
--error-log-path=/usr/local/nginx/logs/error.log \
--http-log-path=/usr/local/nginx/logs/access.log \
--with-http_gzip_static_module \
--http-client-body-temp-path=/usr/local/nginx/temp/client \
--http-proxy-temp-path=/usr/local/nginx/temp/proxy \
--http-fastcgi-temp-path=/usr/local/nginx/temp/fastcgi \
--http-uwsgi-temp-path=/usr/local/nginx/temp/uwsgi \
--http-scgi-temp-path=/usr/local/nginx/temp/scgi \
--with-http_stub_status_module \
--with-http_ssl_module \
--with-stream \
--with-http_v2_module \
--with-http_v3_module \
--with-http_realip_module \
--add-module=/usr/local/softwares/packages/ngx_brotli
# 编译
make && make install
# 删除编译
make clean
# 配置文件夹
mkdir -p /usr/local/nginx/temp/client
# 查看版本号
/usr/local/nginx/sbin/nginx -v
# 测试配置文件
/usr/local/nginx/sbin/nginx -t
```

## 第三步 配置环境变量

```shell
# 修改文件
vim /etc/profile

# nginx
export NGINX_HOME=/usr/local/nginx
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
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target

# 设置开机启动
systemctl enable nginx.service
```

## 第五步 设置配置文件

```nginx
# /usr/local/nginx/conf/include/docs-dist.conf

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
    ssl_certificate /usr/local/nginx/conf/ssl/docs.lihaha.cn.pem;
    ssl_certificate_key /usr/local/nginx/conf/ssl/docs.lihaha.cn.key;
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
