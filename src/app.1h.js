#!/usr/local/bin/node

const Ipinfo = require('./location/ipinfo');
const systemEnv = require('./util/systemEnv');
const Tokoro = require('./location/tokoro');

console.log('☀️');

// ===== 現在地の天気予報を取得 =====
var ipinfo = Ipinfo.create();
ipinfo.execute();

// ===== 設定ファイルに記載されている住所の天気予報を取得 =====
const property = systemEnv.get();

const addressObj = property.TOKORO.ADDRESS;

if(addressObj === null){
    return null;
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
