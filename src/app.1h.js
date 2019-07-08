#!/usr/local/bin/node

console.log('☀️');

// ===== 現在地の天気予報を取得 =====
const Ipinfo = require('./location/ipinfo');

var ipinfo = Ipinfo.create();
ipinfo.execute();

// ===== 設定ファイルに記載されている住所の天気予報を取得 =====
const systemEnv = require('./util/systemEnv');
const Tokoro = require('./location/tokoro');

const property = systemEnv.get();

const addressObj = property.TOKORO.ADDRESS;

if(addressObj === null){
    return ;
}

// 遅延実行
setTimeout(() => {

    for(var key in addressObj) {
        if(typeof addressObj[key] === 'string') {
            var tokoro = Tokoro.create();
            tokoro.leadLatLonFromAddress(addressObj[key]);
        }
    }

}, 1000);
