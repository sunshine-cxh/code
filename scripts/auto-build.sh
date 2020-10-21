###
 # @Descripttion : 
 # @Author       : wuhaidong
 # @Date         : 2020-07-21 11:54:43
 # @LastEditors  : wuhaidong
 # @LastEditTime : 2020-07-22 11:14:22
### 
#!/bin/bash
yum install -y dos2unix

if [ "x$1" != "x" ]; then
    sed -i "s/iomp.test.ilng.cn/$1/g" scripts/ilng-iomp-web.conf
fi

cnpm install
npm run build
mv build ilng-iomp-web
cp -rf /mnt/nas-scripts/docker-19.03.5.sh scripts/
dos2unix scripts/*
tar -zcvf ilng-iomp-web.tar.gz ilng-iomp-web scripts/auto-publish.sh scripts/ilng-iomp-web.conf scripts/docker-19.03.5.sh
rm -rf ilng-iomp-web