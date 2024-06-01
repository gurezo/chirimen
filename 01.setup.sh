#!/bin/bash
#
# cd /home/pi/
# wget -O setup.sh https://raw.githubusercontent.com/chirimen-oh/chirimen/master/setup.sh
# chmod 777 setup.sh
# ./setup.sh
#
sudo apt-get -y update --fix-missing

# 必要な項目をインストール
sudo apt-get install at-spi2-core

# update
sudo apt-get -y update
sudo apt-get -y upgrade

# raspiはupgrade失敗しやすいので念の為2回
sudo apt-get -y update
sudo apt-get -y upgrade

# 各種ツールをインストール
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get -y install fonts-noto-cjk uim uim-mozc nodejs apache2 arduino code vim emacs libnss3-tools

# # インストール失敗しやすいので2回
# sudo apt-get -y install fonts-noto-cjk uim uim-mozc nodejs apache2 arduino code vim emacs libnss3-tools

# 不要パッケージ削除
sudo apt-get -y autoremove

# 不要パッケージクリーニング
sudo apt-get -y autoclean

# npm の最新版をインストール
sudo npm install -g npm@latest

# Node.jsのバージョンの差異による不具合を防ぐ目的
sudo apt-mark hold nodejs

# 利用者のNode.jsのバージョン管理目的
sudo npm i n -g
