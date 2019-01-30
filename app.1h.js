#!/usr/bin/env /Users/shimizunoriyuki/.nodebrew/current/bin/node

console.log('🌞');

// ===== 現在地の天気予報を取得 =====
const Ipinfo = require('./exports/ipinfo');

var ipinfo = Ipinfo.create();
ipinfo.execute();

// ===== 設定ファイルに記載されている住所の天気予報を取得 =====
// 遅延実行
setTimeout(() => {
    const Tokoro = require('./exports/tokoro');

    var tokoro = Tokoro.create();
    tokoro.presentLocation();
}, 1000);
