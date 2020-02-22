console.log('开始拉取代码')
echo "开始拉取代码"
git pull
console.log('开始安装依赖')
echo "开始安装依赖"
npm i
console.log('开始打包项目')
echo "开始打包项目"
npm run build
console.log('开始复制文件')
echo "开始复制文件"
cp ./build/* ../../www/