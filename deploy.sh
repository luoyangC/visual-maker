#!/usr/bin/env sh

# 发生错误时终止
set -e

# 删除dist
rm -rf dist

# 构建
npm run build

# 进入构建文件夹
cd dist

# 初始化git
git init
git add -A
git commit -m 'deploy'

# 上传文件
git push -f git@github.com:luoyangC/visual-maker.git master:gh-pages

cd -
