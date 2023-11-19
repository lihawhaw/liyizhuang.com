---
nav:
  title: 运维
  order: 2
group:
  title: 服务器配置
  order: 2
title: Install mysql8
---

# CentOS Install mysql8

官网 [mysql](https://dev.mysql.com/downloads/mysql/)

## 第一步 安装 mysql8

```shell
# 创建目录
mkdir -p /usr/local/softwares/packages && cd /usr/local/softwares/packages
# 查看 glibc版本
ldd --version
# 下载
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.34-linux-glibc2.28-x86_64.tar.gz
# 解压
tar -xf mysql-8.0.34-linux-glibc2.28-x86_64.tar.gz
# 移动到安装软件目录
mv mysql-8.0.34-linux-glibc2.28-x86_64 /usr/local/mysql
# 查看版本号
/usr/local/mysql/bin/mysql --version
```

## 第二步 配置环境变量

```shell
# 修改文件
vim /etc/profile
# mysql
export MYSQL_HOME=/usr/local/mysql
export PATH=$PATH:$MYSQL_HOME/bin
# 重载
source /etc/profile
```

## 第三步 创建用户组和用户

```shell
# 创建用户组和用户
groupadd mysql
useradd -g mysql mysql
# 赋予权限
chown -R mysql.mysql /usr/local/mysql/
```

## 第四步 设置开机启动

```shell
# 创建文件
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
# 添加到服务列表
chkconfig --add mysql
# 查看服务列表
chkconfig --list
chkconfig mysql on
```

## 第五步 创建配置文件

```shell
vim /etc/my.cnf

[mysql]
# 默认字符集
default-character-set=utf8mb4
[client]
port=3306
socket=/tmp/mysql.sock
[mysqld]
port=3306
server-id=3306
user=mysql
socket=/tmp/mysql.sock
# 安装目录
basedir=/usr/local/mysql
# 数据存放目录
datadir=/usr/local/mysql/data
log-bin=/usr/local/mysql/data/mysql-bin
innodb_data_home_dir=/usr/local/mysql/data
innodb_log_group_home_dir=/usr/local/mysql/data
# 日志及进程数据的存放目录
log-error=/usr/local/mysql/data/mysql.log
pid-file=/usr/local/mysql/data/mysql.pid
# 服务端字符集
character-set-server=utf8mb4
lower_case_table_names=1
autocommit=1
#####以上涉及的文件夹，注意修改
skip-external-locking
key_buffer_size=256M
max_allowed_packet=1M
table_open_cache=1024
sort_buffer_size=4M
net_buffer_length=8K
read_buffer_size=4M
read_rnd_buffer_size=512K
myisam_sort_buffer_size=64M
thread_cache_size=128
# query_cache_size=128M
tmp_table_size=128M
explicit_defaults_for_timestamp=true
max_connections=500
max_connect_errors=100
open_files_limit=65535
binlog_format=mixed
binlog_expire_logs_seconds=864000
# 创建表时使用的默认存储引擎
default_storage_engine=InnoDB
innodb_data_file_path=ibdata1:10M:autoextend
innodb_buffer_pool_size=1024M
innodb_log_file_size=256M
innodb_log_buffer_size=8M
innodb_flush_log_at_trx_commit=1
innodb_lock_wait_timeout=50
transaction-isolation=READ-COMMITTED
[mysqldump]
quick
max_allowed_packet=16M
[myisamchk]
key_buffer_size=256M
sort_buffer_size=4M
read_buffer = 2M
write_buffer = 2M
[mysqlhotcopy]
interactive-timeout

```

## 第六步 启动

```shell
# 初始化
mysqld --defaults-file=/etc/my.cnf --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --user=mysql --initialize-insecure
# 启动
service mysql start
# 查看状态
service mysql status
```

## 第七步 设置密码

```shell
# 无密码登录(直接回车)
mysql -u root -p
# 设置密码
alter user 'root'@'localhost' identified by 'password';
# 刷新权限
flush privileges;
# 退出
exit

```

## 第八步 创建远程root用户

```shell
# 登录
mysql -u root -p;
# 创建用户
CREATE user 'root'@'%';
# 设置密码
alter user 'root'@'%' identified by 'newpassword';
# 授权用户所有权限
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
# 刷新权限
FLUSH PRIVILEGES;
# 查看所有用户状态
select user,host,plugin,authentication_string from mysql.user;
```
