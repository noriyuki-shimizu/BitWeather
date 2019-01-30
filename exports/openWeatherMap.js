// ===== パッケージ =====
const http = require('http');

// ===== exportsオブジェクト =====
const systemEnv = require('./systemEnv');
const Url = require('./url');
const OpenWeatherMapDisplay = require('./displays/openWeatherMapDisplay');
const DisplayError = require('./displays/error');

exports.create = (address, latlon) => {
    return OpenWeatherMap.create(address, latlon);
}

var OpenWeatherMap = {
    create: (address, latlon) => {
        var openWeatherMap = Object.create(OpenWeatherMap.prototype);

        // 住所
        openWeatherMap.address = address;
        // apiから取得される天気情報
        openWeatherMap.weatherData;
        // 緯度、経度情報
        openWeatherMap.latlon = latlon;

        // 設定ファイルからHTTP通信のためのパラメータ取得
        const property = systemEnv.get;

        // リクエストURL
        const REQUEST_URL = property.OPENWEATHERMAP.REQUEST_URL;
        // 取得件数
        const CNT = property.OPENWEATHERMAP.REQUEST_GET_CNT;
        // ユニット
        const UNITS = property.OPENWEATHERMAP.REQUEST_GET_UNITS;
        // レスポンスデータの形式（json）
        const MODE = property.OPENWEATHERMAP.REQUEST_GET_MODE;
        // api ID
        const APPID = property.OPENWEATHERMAP.REQUEST_GET_APPID;

        const parameter = {
            lat: latlon.lat,
            lon: latlon.lon,
            cnt: CNT,
            units: UNITS,
            mode: MODE,
            appid:APPID
        };

        var url = Url.create(REQUEST_URL, parameter);

        openWeatherMap.apiUrl = url.createUrl();

        return openWeatherMap;
    },
    prototype: {
        execute() {

            var address = this.address;

            http.get(this.apiUrl, function(response) {
                var body = '';

                response.setEncoding('utf8');

                response.on('data', function(chunk) {
                    body += chunk;
                });

                response.on('end', function(chunk) {
                    var weatherData = JSON.parse(body);
                    var openWeatherMapDisplay = OpenWeatherMapDisplay.create(weatherData.list, address);

                    openWeatherMapDisplay.execute();
                });
            })
           .on('error', function(e) {
                var displayError = DisplayError.create('天気予報が取得出来ませんでした。');
                displayError.execute();
           });
        }
    }
}



