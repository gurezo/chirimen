#!/bin/bash

# 日本語設定
# デフォルトの設定が en_GB.UTF-8 になっている
sudo sed 's/#\sen_GB\.UTF-8\sUTF-8/en_GB\.UTF-8 UTF-8/g' /etc/locale.gen |\
    sudo tee /tmp/locale && sudo cat /tmp/locale |\
    sudo tee /etc/locale.gen && sudo rm -f /tmp/locale
sudo sed 's/#\sja_JP\.EUC-JP\sEUC-JP/ja_JP\.EUC-JP EUC-JP/g' /etc/locale.gen  |\
    sudo tee /tmp/locale && sudo cat /tmp/locale |\
    sudo tee /etc/locale.gen && sudo rm -f /tmp/locale
sudo sed 's/#\sja_JP\.UTF-8\sUTF-8/ja_JP\.UTF-8 UTF-8/g' /etc/locale.gen  |\
    sudo tee /tmp/locale && sudo cat /tmp/locale |\
    sudo tee /etc/locale.gen && sudo rm -f /tmp/locale
sudo locale-gen ja_JP.UTF-8
sudo update-locale LANG=ja_JP.UTF-8

# 時間設定
sudo raspi-config nonint do_change_timezone Asia/Tokyo

# キーボード設定
sudo raspi-config nonint do_configure_keyboard jp

# Wi-Fi設定
sudo raspi-config nonint do_wifi_country JP
