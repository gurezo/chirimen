#!/bin/bash
#
# cd /home/pi/
# wget -O setup.sh https://raw.githubusercontent.com/chirimen-oh/chirimen/master/setup.sh
# chmod 777 setup.sh
# ./setup.sh
#

# _gc設定
cd /home/pi/
if [ ! -f /home/pi/_gc.zip ]; then
    wget https://r.chirimen.org/_gc.zip
fi
if [ ! -d /home/pi/_gc/ ]; then
    unzip ./_gc.zip
fi
cd /home/pi/_gc/srv
npm i
sudo npm i forever -g
cd /home/pi/
crontab -l > /tmp/tmp_crontab
grep '/home/pi/_gc/srv/startup.sh' /tmp/tmp_crontab
if [ $? = 1 ]; then
    echo "@reboot sudo -u pi /home/pi/_gc/srv/startup.sh" | crontab
fi
ln -s /home/pi/_gc/srv/reset.sh /home/pi/Desktop/reset.sh
# mkdir /home/pi/.config/chromium/
# mkdir /home/pi/.config/chromium/Default/
cp /home/pi/_gc/bookmark/Bookmarks /home/pi/.config/chromium/Default/Bookmarks
pcmanfm --set-wallpaper /home/pi/_gc/wallpaper/wallpaper-720P.png

# Web Bluetooth有効化
cat << EOF > '/home/pi/.config/chromium/Local State'
{"browser":{"enabled_labs_experiments":["enable-experimental-web-platform-features"]}}
EOF
