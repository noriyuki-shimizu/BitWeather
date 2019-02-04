
const DisplayError = require('./displays/error');
const systemEnv = require('./systemEnv');
const Url = require('./url');

exports.create = () => {
    return Ipinfo.create();
}

var Ipinfo = {
    create: () => {
        var ipinfo = Object.create(Ipinfo.prototype);

        const property = systemEnv.get;

        const REQUEST_URL = property.IPINFO.REQUEST_URL;

        const parameter = {
            token: property.IPINFO.REQUEST_GET_TOKEN
        };

        var url = Url.create(REQUEST_URL, parameter);

        ipinfo.apiUrl = url.createUrl();

        return ipinfo;
    },
    acquireException: () => {
        var displayError = DisplayError.create(
            '現在地の取得に失敗しました。',
            '設定を確認してください。'
        );
        displayError.display();
    },
    prototype: {
        execute() {
            const https = require('https');

            const OpenWeatherMap = require('./openWeatherMap');

            https.get(this.apiUrl, function(response) {
                var body = '';

                response.setEncoding('utf8');

                response.on('data', chunk => {
                    body += chunk;
                });

                response.on('end', chunk => {
                    try {
                        const yourLocation = JSON.parse(body);

                        const code = yourLocation.loc.split(',');

                        const latlon = {lat: code[0], lon: code[1]};

                        var openWeatherMap = OpenWeatherMap.create('現在地', latlon);

                        openWeatherMap.acquire();
                    } catch {
                        Ipinfo.acquireException();
                    }

                });
            })
            .on('error', function(e) {
                Ipinfo.acquireException();
            });
        }
    }
}