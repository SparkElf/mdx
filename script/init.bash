#!/usr/bin/bash
if [[ $PWD != "/home/ubuntu" ]];#https://stackoverflow.com/questions/3427872/whats-the-difference-between-and-in-bash
then
    echo $PWD is invalid working dirctory
    exit
else
    cd project/blog #保证安全
    permission=$(stat -c '%a' script)
    if [[ $permission != 555 ]];
    then
    echo auto alter the permission $permission for script as 555 #可读可执行
    chmod 555 script
    fi
    permission=$(stat -c '%a' node_modules)
    if [[ $permission != 555 ]];
    then
    echo auto alter the permission $permission for node_modules as 555 #可读可执行
    chmod 555 node_modules
    fi
fi
shopt -s extglob #...
rm -rfv server.js
echo project has inited successfully

#远程服务器的部署脚本，植入到远程服务器的script文件夹下。
#为了支持高亮，远程服务器还需要安装nodejs、yarn,运行yarn add shiki