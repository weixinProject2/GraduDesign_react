echo "开始拉取代码"
git pull
echo "开始安装依赖"
npm i
echo "开始打包项目"
npm run build
echo "开始复制文件"
cp ./build/* ../../www/