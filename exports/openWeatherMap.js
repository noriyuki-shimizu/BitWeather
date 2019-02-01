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

        openWeatherMap.address = address;

        openWeatherMap.weatherData;

        openWeatherMap.latlon = latlon;

        const property = systemEnv.get;

        const REQUEST_URL = property.OPENWEATHERMAP.REQUEST_URL;

        const parameter = {
            lat: latlon.lat,
            lon: latlon.lon,
            cnt: property.OPENWEATHERMAP.REQUEST_GET_CNT,
            units: property.OPENWEATHERMAP.REQUEST_GET_UNITS,
            mode: property.OPENWEATHERMAP.REQUEST_GET_MODE,
            appid: property.OPENWEATHERMAP.REQUEST_GET_APPID
        };

        var url = Url.create(REQUEST_URL, parameter);

        openWeatherMap.apiUrl = url.createUrl();

        return openWeatherMap;
    },
    acquireException: () => {
        var displayError = DisplayError.create(
            '天気予報の取得に失敗しました。',
            '設定を確認してください。'
        );
        displayError.display();
    },
    prototype: {
        acquire() {

            var address = this.address;

            http.get(this.apiUrl, function(response) {
                var body = '';

                response.setEncoding('utf8');

                response.on('data', function(chunk) {
                    body += chunk;
                });

                response.on('end', function(chunk) {
                    try {
                        var weatherData = JSON.parse(body);
                        var openWeatherMapDisplay = OpenWeatherMapDisplay.create(weatherData.list, address);

                        openWeatherMapDisplay.addressDisplay();
                        openWeatherMapDisplay.dateDisplay();
                    } catch(e) {
                        console.log(e);
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



