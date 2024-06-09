#!/bin/bash

echo 'Apache設定 @@@@@@@@@@@@@@@@@@@@@@@@@'

# localhost ディレクトリのアクセス権限変更
sudo chmod +X /home/pi/Desktop
sudo chmod +X /home/pi/Desktop/gc

if [ ! -f /etc/apache2/sites-available/000-default.conf.orig ]; then
    sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.orig
fi
sudo sh -c 'cat << EOF > /etc/apache2/sites-available/000-default.conf
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /home/pi/Desktop/gc

        ErrorLog \${APACHE_LOG_DIR}/error.log
        CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF'
if [ ! -f /etc/apache2/apache2.conf.orig ]; then
    sudo cp /etc/apache2/apache2.conf /etc/apache2/apache2.conf.orig
fi
sudo sh -c 'cat << EOF > /etc/apache2/apache2.conf
DefaultRuntimeDir \${APACHE_RUN_DIR}
PidFile \${APACHE_PID_FILE}
Timeout 300
KeepAlive On
MaxKeepAliveRequests 100
KeepAliveTimeout 5

User \${APACHE_RUN_USER}
Group \${APACHE_RUN_GROUP}

HostnameLookups Off

ErrorLog \${APACHE_LOG_DIR}/error.log
LogLevel warn

IncludeOptional mods-enabled/*.load
IncludeOptional mods-enabled/*.conf
Include ports.conf

<Directory />
        Options FollowSymLinks
        AllowOverride None
        Require all denied
</Directory>

<Directory /usr/share>
        AllowOverride None
        Require all granted
</Directory>

<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>

<Directory /home/pi/Desktop/gc>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>

AccessFileName .htaccess

<FilesMatch "^\.ht">
        Require all denied
</FilesMatch>

LogFormat "%v:%p %h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" vhost_combined
LogFormat "%h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
LogFormat "%h %l %u %t \"%r\" %>s %O" common
LogFormat "%{Referer}i -> %U" referer
LogFormat "%{User-agent}i" agent

IncludeOptional conf-enabled/*.conf
IncludeOptional sites-enabled/*.conf
EOF'

sudo sh -c 'cat << EOF > /etc/apache2/sites-available/vhost-ssl.conf
<IfModule mod_ssl.c>
        <VirtualHost _default_:443>
                ServerAdmin webmaster@localhost

                DocumentRoot /home/pi/Desktop/gc

                ErrorLog \${APACHE_LOG_DIR}/error.log
                CustomLog \${APACHE_LOG_DIR}/access.log combined

                SSLEngine on
                SSLCertificateFile        /home/pi/_gc/srv/crt/server.crt
                SSLCertificateKeyFile /home/pi/_gc/srv/crt/server.key

                <FilesMatch "\.(cgi|shtml|phtml|php)$">
                                SSLOptions +StdEnvVars
                </FilesMatch>
                <Directory /usr/lib/cgi-bin>
                                SSLOptions +StdEnvVars
                </Directory>
        </VirtualHost>
</IfModule>
EOF'

echo 'apache2 restart @@@@@@@@@@@@@@@@@@@@@@@@@'

sudo a2ensite vhost-ssl
sudo a2enmod ssl
sudo systemctl restart apache2

# 証明書追加
echo '証明書追加 @@@@@@@@@@@@@@@@@@@@@@@@@'
certfile="/home/pi/_gc/srv/crt/ca.crt"
certname="org-TripArts"

for certDB in $(find ~/ -name "cert9.db")
do
    certdir=$(dirname ${certDB});
    certutil -A -n "${certname}" -t "TCu,Cu,Tu" -i ${certfile} -d sql:${certdir}
done

# # Apache設定
# echo 'Apache設定 @@@@@@@@@@@@@@@@@@@@@@@@@'

# # localhost ディレクトリのアクセス権限変更
# sudo chmod +w /home/pi/Desktop/gc

# if [ ! -f /etc/apache2/sites-available/000-default.conf.orig ]; then
#     sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.orig
# fi
# sudo sh -c 'cat << EOF > /etc/apache2/sites-available/000-default.conf
# <VirtualHost *:80>
#         ServerAdmin webmaster@localhost
#         DocumentRoot /home/pi/Desktop/gc

#         ErrorLog \${APACHE_LOG_DIR}/error.log
#         CustomLog \${APACHE_LOG_DIR}/access.log combined
# </VirtualHost>
# EOF'
# if [ ! -f /etc/apache2/apache2.conf.orig ]; then
#     sudo cp /etc/apache2/apache2.conf /etc/apache2/apache2.conf.orig
# fi
# sudo sh -c 'cat << EOF > /etc/apache2/apache2.conf
# DefaultRuntimeDir \${APACHE_RUN_DIR}
# PidFile \${APACHE_PID_FILE}
# Timeout 300
# KeepAlive On
# MaxKeepAliveRequests 100
# KeepAliveTimeout 5

# User \${APACHE_RUN_USER}
# Group \${APACHE_RUN_GROUP}

# HostnameLookups Off

# ErrorLog \${APACHE_LOG_DIR}/error.log
# LogLevel warn

# IncludeOptional mods-enabled/*.load
# IncludeOptional mods-enabled/*.conf
# Include ports.conf

# <Directory />
#         Options FollowSymLinks
#         AllowOverride None
#         Require all denied
# </Directory>

# <Directory /usr/share>
#         AllowOverride None
#         Require all granted
# </Directory>

# <Directory /var/www/>
#         Options Indexes FollowSymLinks
#         AllowOverride None
#         Require all granted
# </Directory>

# <Directory /home/pi/Desktop/gc>
#         Options Indexes FollowSymLinks
#         AllowOverride None
#         Require all granted
# </Directory>

# AccessFileName .htaccess

# <FilesMatch "^\.ht">
#         Require all denied
# </FilesMatch>

# LogFormat "%v:%p %h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" vhost_combined
# LogFormat "%h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
# LogFormat "%h %l %u %t \"%r\" %>s %O" common
# LogFormat "%{Referer}i -> %U" referer
# LogFormat "%{User-agent}i" agent

# IncludeOptional conf-enabled/*.conf
# IncludeOptional sites-enabled/*.conf
# EOF'

# sudo sh -c 'cat << EOF > /etc/apache2/sites-available/vhost-ssl.conf
# <IfModule mod_ssl.c>
#         <VirtualHost _default_:443>
#                 ServerAdmin webmaster@localhost

#                 DocumentRoot /home/pi/Desktop/gc

#                 ErrorLog \${APACHE_LOG_DIR}/error.log
#                 CustomLog \${APACHE_LOG_DIR}/access.log combined

#                 SSLEngine on
#                 SSLCertificateFile        /home/pi/_gc/srv/crt/server.crt
#                 SSLCertificateKeyFile /home/pi/_gc/srv/crt/server.key

#                 <FilesMatch "\.(cgi|shtml|phtml|php)$">
#                                 SSLOptions +StdEnvVars
#                 </FilesMatch>
#                 <Directory /usr/lib/cgi-bin>
#                                 SSLOptions +StdEnvVars
#                 </Directory>
#         </VirtualHost>
# </IfModule>
# EOF'

# echo 'apache2 restart @@@@@@@@@@@@@@@@@@@@@@@@@'

# sudo a2ensite vhost-ssl
# sudo a2enmod ssl
# sudo systemctl restart apache2

# # 証明書追加
# echo '証明書追加 @@@@@@@@@@@@@@@@@@@@@@@@@'
# certfile="/home/pi/_gc/srv/crt/ca.crt"
# certname="org-TripArts"

# for certDB in $(find ~/ -name "cert9.db")
# do
#     certdir=$(dirname ${certDB});
#     certutil -A -n "${certname}" -t "TCu,Cu,Tu" -i ${certfile} -d sql:${certdir}
# done
