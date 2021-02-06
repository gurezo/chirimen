#!/bin/bash

# update
sudo apt-get -y update
sudo apt-get -y full-upgrade

# npm セットアップ
# https://github.com/nodesource/distributions 参照
# curl -sL https://deb.nodesource.com/setup_lts.x | bash -
# curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
# curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
# node バージョンは下記変数に入れて指定
nodeVer=12
nodeInstallCmd=`curl -sL https://deb.nodesource.com/setup_${nodeVer}.x | sudo -E bash -`
eval ${nodeInstallCmd}
sudo apt install nodejs -y

# npm アップデート
sudo npm install -g npm 
