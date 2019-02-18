#!/bin/bash

function command_exists {
  command -v "$1" > /dev/null;
}

function info_display_to_bash {
    printf "\e[1;34m$1\e[m\n"
}

function success_display_to_bash {
    printf "\e[32m$1\e[m\n"
}

function error_display_to_bash {
    printf "\e[31m$1\e[m\n"
}

if ! command_exists brew ; then
    error_display_to_bash "Homebrewがインストールされていません。"
    exit 1
fi

if ! command_exists nodebrew ; then
    brew install nodebrew || brew reinstall nodebrew

    success_display_to_bash "Nodebrew installed. version is `nodebrew -v`"
fi

if ! command_exists node ; then

    if [ ! -e $HOME/.nodebrew ]; then
        mkdir $HOME/.nodebrew/
    fi

    if [ ! -e $HOME/.nodebrew/src ] ; then
        mkdir $HOME/.nodebrew/src/
    fi

fi

nodebrew install-binary v11.10.0

success_display_to_bash "Node installed. version is `nodebrew ls`"

nodebrew use v11.10.0

success_display_to_bash "Node use version v11.10.0"

ln -s $HOME/.nodebrew/current/bin/node /usr/local/bin/node

if ! command_exists npm ; then
    ln -s $HOME/.nodebrew/current/bin/npm /usr/local/bin/npm
    success_display_to_bash "npm installed. version is `npm -v`"
fi

info_display_to_bash "BitWeatherに必要なパッケージ情報をインストールします。"

npm i -S fs@0.0.1-security
npm i -S http@0.0.0
npm i -S https@^1.0.0
npm i -S tokoro@^0.2.1
npm i -S yaml@^1.3.1

if ! command_exists npx ; then
    ln -s $HOME/.nodebrew/current/bin/npx /usr/local/bin/npx
    success_display_to_bash "npx installed. version is `npx -v`"
fi