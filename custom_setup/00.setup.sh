#!/bin/bash
#

ehco "grep 'consoleblank=0' /boot/cmdline.txt"
./01.setup.sh


ehco "apt-get update, upgrade, install, autoclean, autoremove"
./02.setup.sh

ehco "日本語設定、時間設定、キーボード設定、Wi-Fi設定"
./03.setup.sh

ehco "VSCode"
./04.setup.sh

ehco "I2Cを有効化"
./05.setup.sh

ehco "_gc設定"
./06.setup.sh

ehco "gc設定"
./07.setup.sh

ehco "Apache設定"
./08.setup.sh

# ####
# # 最後にダイアログをOKにしてrebootして完了
# ####

# sudo reboot
