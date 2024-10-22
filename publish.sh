#!/bin/bash
# 添加 Gitee 远程仓库
# if git remote | grep -q "gitee\|github"; then
if git remote | grep -q "github"; then
    echo "远程仓库已存在，执行下一步..."
else
    # git remote add gitee https://gitee.com/hzihhuang/h-design.git
    git remote add github https://github.com/hzihhuang-site/h-design.git
    echo "成功添加远程仓库..."
fi

# 推送 gh-pages 分支到 gitee 的 master 分支
git pull
if [ $? -eq 0 ]; then
    echo "获取最新代码成功，执行下一步..."
    # git push gitee origin/gh-pages:master -f
    git push github origin/gh-pages:master -f
else
    echo "获取代码失败，本地代码开始进行提交..."
    git add -A
    git commit -m "docs: 发布-同步本地"
    git pull
    # git push gitee origin/gh-pages:master -f
    git push github origin/gh-pages:master -f
fi

# 检查推送是否成功
if [ $? -eq 0 ]; then
    echo "推送成功"
else
    echo "出现错误，请检查..."
    exit 1
fi
