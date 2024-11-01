#!/bin/bash
# 当前仓库分支名称
REMOTE_BRANCH_NAME="origin/gh-pages"

# 远程仓库分支名称
LOCAL_BRANCH_NAME="gh-pages"

# 远程仓库别名
REMOTE_ALIAS="site"

# 设置远程仓库地址
REMOTE_REPO_URL="https://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@github.com/hzihhuang-site/h-design.git"

# 添加远程仓库
if git remote | grep -q $REMOTE_ALIAS; then
    echo "远程仓库已存在，执行下一步..."
else
    git remote add $REMOTE_ALIAS $REMOTE_REPO_URL
    echo "成功添加远程仓库..."
fi

# 获取最新代码
git pull
# 推送制定发展到远程仓库分支
git push $REMOTE_ALIAS $REMOTE_BRANCH_NAME:$LOCAL_BRANCH_NAME

# 检查推送是否成功
if [ $? -eq 0 ]; then
  echo "推送成功！"
else
  echo "推送失败，请检查是否有权限或远程仓库地址是否正确。"
  exit 1
fi
