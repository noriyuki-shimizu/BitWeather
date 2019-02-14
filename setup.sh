#!/bin/bash

npm -v >/dev/null 2>&1

if [ ! $? = 0 ] ; then
    echo "npmがインストールされていません。"
fi

echo "必要なpackage情報をインストールします。"

npm i -S fs@0.0.1-security
npm i -S http@0.0.0
npm i -S https@^1.0.0
npm i -S tokoro@^0.2.1
npm i -S yaml@^1.3.2
