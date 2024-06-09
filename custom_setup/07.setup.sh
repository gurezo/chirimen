#!/bin/bash

# gc設定
# chromium-browser &
cd /home/pi/
if [ ! -f /home/pi/gc.zip ]; then
    wget https://r.chirimen.org/gc.zip
fi
# chromiumの起動待ちダウンロード
if [ ! -d /home/pi/Desktop/gc/ ]; then
    unzip ./gc.zip -d /home/pi/Desktop
fi
# # chromiumの起動待ち
# sleep 120s
