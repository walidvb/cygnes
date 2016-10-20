#! /bin/bash

cd ~/Desktop/cygnes;
git pull -f;
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk --app=http://localhost:8080/watcher.html >/dev/null &disown;
php -S localhost:8080 >/dev/null &disown;
