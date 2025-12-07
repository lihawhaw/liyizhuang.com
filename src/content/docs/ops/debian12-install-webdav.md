---
nav:
  title: 运维
  order: 2
group:
  title: 服务器配置
  order: 2
title: Debian12 安装 WebDAV 服务
---

## 第一步 新建脚本

```shell
// /usr/local/webdav/install.sh
#!/usr/bin/env bash
# set -euo pipefail

# ===== 配置变量（如需修改请替换下面变量） =====
VERSION=v5.10.1                    # webdav release 版本
INSTALL_DIR=/usr/local/webdav      # 安装目录
BIN=$INSTALL_DIR/webdav            # 二进制执行文件
CONFIG=$INSTALL_DIR/config.yml     # 配置文件
DATA_DIR=/data/webdav              # 数据存储目录
SERVICE=/etc/systemd/system/webdav.service  # systemd 单元文件
USERNAME=webdav                    # 运行服务的系统用户
WEB_PORT=10020                     # WebDAV 服务监听端口
# ============================================

# 1. 创建安装目录
mkdir -p "${INSTALL_DIR}"
cd /tmp

# 2. 下载对应 release 的 linux-amd64 包
#    根据项目 Releases 页面中 asset 名称：linux-amd64-webdav.tar.gz
wget https://gh-proxy.org/https://github.com/hacdias/webdav/releases/download/${VERSION}/linux-amd64-webdav.tar.gz

# 3. 解压
tar -xzf linux-amd64-webdav.tar.gz
rm linux-amd64-webdav.tar.gz

# 4. 移动二进制到 INSTALL_DIR
sudo mv webdav "${BIN}"
sudo chmod 755 "${BIN}"

# 5. 创建运行用户
if ! id -u "${USERNAME}" >/dev/null 2>&1; then
  sudo useradd --system --no-create-home --shell /usr/sbin/nologin "${USERNAME}"
fi

# 6. 创建数据目录 & 修改权限
sudo mkdir -p "${DATA_DIR}"
sudo chown -R "${USERNAME}:${USERNAME}" "${DATA_DIR}"

# 7. 创建默认配置文件（如果不存在）
if [ ! -f "${CONFIG}" ]; then
  sudo tee "${CONFIG}" > /dev/null <<EOF
# WebDAV configuration
address: 0.0.0.0
port: ${WEB_PORT}

tls: false

directory: ${DATA_DIR}

permissions: CRUD

users:
  - username: admin
    password: admin12345
    directory: ${DATA_DIR}
    permissions: CRUD
EOF
  sudo chmod 600 "${CONFIG}"
fi

# 8. 创建 systemd 服务单元
sudo tee "${SERVICE}" > /dev/null <<EOF
[Unit]
Description=WebDAV Server (hacdias/webdav)
After=network.target

[Service]
Type=simple
User=${USERNAME}
Group=${USERNAME}
ExecStart=${BIN} --config ${CONFIG}
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# 9. 启用 & 启动服务
sudo systemctl daemon-reload
sudo systemctl enable --now webdav

echo "✅ WebDAV 已启动，监听端口 ${WEB_PORT}"
echo "   配置文件: ${CONFIG}"
echo "   数据目录: ${DATA_DIR}"
```

## 第二步 刷新目录权限

```shell
// /usr/local/webdav/refresh-auth.sh

sudo mkdir -p /data/webdav/clash
sudo chown -R webdav:webdav /data/webdav
sudo chmod -R 755 /data/webdav
```

## 第三步 配置 nginx

```conf
// /usr/local/nginx/conf/include/webdav.conf

server {
    listen 80;
    server_name webdav.haha.me;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name webdav.haha.me;

    ssl_certificate     /usr/local/nginx/conf/ssl/xxx/cert.crt;
    ssl_certificate_key /usr/local/nginx/conf/ssl/xxx/cert.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:10020;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        gzip off;
        proxy_set_header Content-Length $content_length;
        proxy_set_header Transfer-Encoding "";
        client_max_body_size 0;
    }
}

```
