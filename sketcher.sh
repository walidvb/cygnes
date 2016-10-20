#! /bin/bash

cd ~/Documents/cygnes;
git pull -f;
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk --app=http://localhost:8080/sketcher.html >/dev/null &disown;
php -S localhost:8080 >/dev/null &disown;
