#!/bin/bash
#
# cd /home/pi/
# wget -O setup.sh https://raw.githubusercontent.com/chirimen-oh/chirimen/master/setup.sh
# chmod 777 setup.sh
# ./setup.sh
#
# 一時的にスリープを無効
sudo xset s off
sudo xset -dpms
sudo xset s noblank
# スリープを無効
grep 'consoleblank=0' /boot/cmdline.txt
if [ $? -ge 1 ]; then
    sudo sed '1s/$/ consoleblank=0/' /boot/cmdline.txt |\
        sudo tee /tmp/cmdline && sudo cat /tmp/cmdline |\
        sudo tee /boot/cmdline.txt && sudo rm -f /tmp/cmdline
fi

if [ ! -f /etc/xdg/lxsession/LXDE-pi/autostart.orig ]; then
    sudo cp /etc/xdg/lxsession/LXDE-pi/autostart /etc/xdg/lxsession/LXDE-pi/autostart.orig
fi
sudo sh -c "cat << EOF > /etc/xdg/lxsession/LXDE-pi/autostart
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@/usr/bin/chromium-browser https://localhost/top
EOF"
