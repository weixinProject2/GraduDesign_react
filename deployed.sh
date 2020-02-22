# !/bin/bash

WEB_PATH='/root/frontend/GraduDesign_react/'

echo "Start pull"
git pull
echo "Start instll development"
npm i
echo "Start build file"
npm run build
echo "delete old file in www file"
cd /root/www/
rm -rf *
cd $WEB_PATH
echo "copy files"
cp -r ./build/* ../../www/
echo "End"
