#!/bin/bash

# VSCode extension
sudo npm i eslint prettier -g
code --install-extension MS-CEINTL.vscode-language-pack-ja
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode

# VSCode設定
mkdir -p /home/pi/.config/Code/User
cat << EOF > /home/pi/.config/Code/User/settings.json
{
  "editor.fontFamily": "'Noto Sans Mono CJK JP', 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
EOF
mkdir -p /home/pi/.vscode
cat << EOF > /home/pi/.vscode/argv.json
{
  "locale": "ja"
}
EOF

# JSのデフォルトをVSCodeに
cat << EOF > /home/pi/.config/mimeapps.list
[Added Associations]
application/javascript=code.desktop;

[Default Applications]
application/javascript=code.desktop;
EOF
