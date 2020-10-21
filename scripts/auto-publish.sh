#!/bin/bash

##安装docker-19.03.5
bash scripts/docker-19.03.5.sh

##创建挂载点
mkdir -p /docker-nginx/data/www
mkdir -p /docker-nginx/data/conf
mkdir -p /docker-nginx/data/logs

##检查nginx容器是否在运行
docker ps | grep ilngfrontend
if [ $? = 0 ]; then
    echo "nginx container running"
else
    echo "preparing to run nginx container"
    docker pull nginx
    docker run -itd -v /docker-nginx/data/www:/usr/share/nginx/html -v /docker-nginx/data/conf:/etc/nginx/conf.d -v /docker-nginx/data/logs:/var/log/nginx -p 80:80 --restart always --name ilngfrontend nginx
fi


##部署Nginx配置
rm -rf /docker-nginx/data/conf/ilng-iomp-web.conf || exit 0
cp scripts/ilng-iomp-web.conf /docker-nginx/data/conf/

##部署项目
rm -rf /docker-nginx/data/www/ilng-iomp-web-bak || exit 0
if [ -d "/docker-nginx/data/www/ilng-iomp-web" ]; then
    echo "Coping the ilng-iomp-web"
    mv /docker-nginx/data/www/ilng-iomp-web /docker-nginx/data/www/ilng-iomp-web-bak
fi
mv ilng-iomp-web /docker-nginx/data/www/ilng-iomp-web


##重启nginx
docker restart ilngfrontend
