# 将 gh-pages 分支同步到 gitee 仓库 master 上

#!/bin/bash

# 添加 Gitee 远程仓库
if git remote | grep -q gitee; then
    echo "远程仓库已存在，执行下一步..."
else
    git remote add gitee https://gitee.com/hzihhuang/h-design.git
    echo "成功添加 Gitee 远程仓库..."
    exit 1
fi

# 推送 gh-pages 分支到 gitee 的 master 分支
git push gitee origin/gh-pages:master -f

# 检查推送是否成功
if [ $? -eq 0 ]; then
    echo "推送 gitee 成功"
else
    echo "出现错误，请检查..."
    exit 1
fi
