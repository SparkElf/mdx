$config = ConvertFrom-Json -InputObject ./config/config.json
git push -u origin master
scp ./env config/config.json ${config.server.username}@${config.server.ip}:${config.server.projectDir}
#ssh ${config.server.username}@${config.server.ip} "bash ${config.server.projectDir}/script/server/deploy.bash"