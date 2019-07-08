
exports.create = (latlon) => {
    return OpenWeatherMap.create(latlon);
}

/**
 * OpenWeatherMap APIに関するオブジェクト
 */
var OpenWeatherMap = {
    create: (latlon) => {

        var openWeatherMap = Object.create(OpenWeatherMap.prototype);

        openWeatherMap.weatherData;

        openWeatherMap.latlon = latlon;

        const systemEnv = require('../util/systemEnv');
        const property = systemEnv.get();

        const REQUEST_URL = property.OPENWEATHERMAP.REQUEST_URL;

        const parameter = {
            lat: latlon.lat,
            lon: latlon.lon,
            cnt: property.OPENWEATHERMAP.REQUEST_GET_CNT,
            units: property.OPENWEATHERMAP.REQUEST_GET_UNITS,
            mode: property.OPENWEATHERMAP.REQUEST_GET_MODE,
            appid: property.OPENWEATHERMAP.REQUEST_GET_APPID
        };

        const Url = require('../url');
        var url = Url.create(REQUEST_URL, parameter);

        openWeatherMap.apiUrl = url.getRequestUrl();

        return openWeatherMap;
    },
    /**
     * 天気予報取得に失敗した際にメニューバーにエラーを表示します。
     */
    acquireException: () => {
        const DisplayError = require('../displays/error');

        var displayError = DisplayError.create(
            '天気予報の取得に失敗しました。',
            '設定を確認してください。'
        );
        displayError.display();
    },
    prototype: {
        /**
         * API通信を実行します。
         */
        execute(address) {
            const http = require('http');

            const BitWeatherConvert = require('../converts/bitWeatherConvert');
            const OpenWeatherMapDisplay = require('../displays/openWeatherMapDisplay');

            http.get(this.apiUrl, function(response) {
                var body = '';

                response.setEncoding('utf8');

                response.on('data', function(chunk) {
                    body += chunk;
                });

                response.on('end', function(chunk) {
                    try {
                        var parseWeatherData = JSON.parse(body);

                        var bitWeatherConvert = BitWeatherConvert.create(parseWeatherData.list);
                        var displayAddress = bitWeatherConvert.getCurrentWeatherIcon() + address;
                        var displayData = bitWeatherConvert.convert()
                                                           .grouping();

                        var openWeatherMapDisplay = OpenWeatherMapDisplay.create(displayData, displayAddress);

                        openWeatherMapDisplay.display();
                    } catch {
                        OpenWeatherMap.acquireException();
                    }
                });
            })
           .on('error', function(e) {
                OpenWeatherMap.acquireException();
           });
        }
    }
}



