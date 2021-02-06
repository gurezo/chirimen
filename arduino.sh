#!/bin/bash

# update
sudo apt-get -y update
sudo apt-get -y upgrade

wget https://downloads.arduino.cc/arduino-1.8.13-linuxaarch64.tar.xz


# cd /home/pi/
# mkdir /home/pi/Applications/
if [ ! -d /home/pi/Applications/arduino-1.8.13/ ]; then
    tar xvf arduino-1.8.13-linuxaarch64.tar.xz
    mv arduino-1.8.13 /home/pi/Applications/
fi
cd /home/pi/Applications/
# FIXME: ln が失敗する
ln -s arduino-1.8.13 arduino
# sudo ln -s arduino-1.8.13 arduino
cd /home/pi/Applications/arduino/
./install.sh
rm -f /home/pi/arduino-1.8.13-linuxaarch64.tar.xz
cd /home/pi/
