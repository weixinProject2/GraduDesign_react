echo "Start pull"
git pull
echo "Start instll development"
npm i
echo "Start build file"
npm run build
cp ./build/* ../../www/
echo "End"
