#!/usr/bin/env /Users/shimizunoriyuki/.nodebrew/current/bin/node

console.log('🌞');

// ===== 現在地の天気予報を取得 =====
const Ipinfo = require('./exports/ipinfo');

var ipinfo = Ipinfo.create();
ipinfo.execute();

// ===== 設定ファイルに記載されている住所の天気予報を取得 =====
const systemEnv = require('./exports/systemEnv');
const Tokoro = require('./exports/tokoro');
const DisplayError = require('./exports/displays/error');

const property = systemEnv.get;

const addressObj = property.TOKORO.ADDRESS;

if(addressObj === undefined) {
    var displayError = DisplayError.create('住所が設定されていません。');
    displayError.display();

    return ;
}

// 遅延実行
setTimeout(() => {

    for(var key in addressObj) {
        if(typeof addressObj[key] === 'string') {
            var tokoro = Tokoro.create(addressObj[key]);
            tokoro.leadLatLonFromAddress();
        }
    }

}, 1000);
