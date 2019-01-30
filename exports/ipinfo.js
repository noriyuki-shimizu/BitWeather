
const DisplayError = require('./displays/error');

exports.create = () => {
    return Ipinfo.create();
}

var Ipinfo = {
    create: () => {

        const systemEnv = require('./systemEnv');
        const Url = require('./url');

        var ipinfo = Object.create(Ipinfo.prototype);

        const property = systemEnv.get;

        // リクエストURL
        const REQUEST_URL = property.IPINFO.REQUEST_URL;
        // api token
        const apiToken = property.IPINFO.REQUEST_GET_TOKEN;

        const parameter = {
            token: apiToken
        };

        var url = Url.create(REQUEST_URL, parameter);

        ipinfo.apiUrl = url.createUrl();

        return ipinfo;
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
                    const yourLocation = JSON.parse(body);

                    const code = yourLocation.loc.split(',');

                    const latlon = {lat: code[0], lon: code[1]};

                    var openWeatherMap = OpenWeatherMap.create('現在地', latlon);

                    openWeatherMap.execute();
                });
            })
            .on('error', function(e) {
                var displayError = DisplayError.create('現在地の取得に失敗しました。');
                displayError.execute();
            });
        }
    }
}