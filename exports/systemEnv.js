
const fs = require('fs');
const yaml = require('yaml');

const appYml = fs.readFileSync(__dirname + '/../config/app.yml', 'utf8');

const ymlPropertys = yaml.parse(appYml);

/**
 * yaml設定ファイルからプロパティを取得します。
 *
 * @type {{OPENWEATHERMAP: {REQUEST_URL: (*|*), REQUEST_GET_CNT: (*|*), REQUEST_GET_APPID: (*|*)}, TOKORO: {ADDRESS: (*|*)}}}
 */
exports.get = {
    IPINFO: {
        REQUEST_URL: load('ipinfo.request.url'),
        REQUEST_GET_TOKEN: load('ipinfo.request.get.token')
    },
    TOKORO: {
        ADDRESS: load('tokoro.address')
    },
    OPENWEATHERMAP: {
        REQUEST_URL: load('openweathermap.request.url'),
        REQUEST_GET_APPID: load('openweathermap.request.get.appID'),
        REQUEST_GET_CNT: load('openweathermap.request.get.cnt'),
        REQUEST_GET_UNITS: load('openweathermap.request.get.units'),
        REQUEST_GET_MODE: load('openweathermap.request.get.mode')
    }
}

/**
 * 設定ファイルを読み込みます。
 * @param key
 * @returns {string} yml property
 */
function load(key) {

    if(typeof key !== 'string') {
        throw new SyntaxError('key must be string.')
    }

    const filler = '.';

    if(key.indexOf(filler) >= 0) {
        var keyList = key.split(filler);

        return scan(keyList);
    }

    return ymlPropertys[key];
}

/**
 * keyリストから設定を取得します。
 * @param keyList
 * @returns {any}
 */
function scan(keyList) {
    var ymlProperty = Object.assign({}, ymlPropertys);

    keyList.forEach((key, index) => {
        ymlProperty = ymlProperty[key];
    });

    return ymlProperty;
}


