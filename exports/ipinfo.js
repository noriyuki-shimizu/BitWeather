
exports.create = () => {
    return Ipinfo.create();
}

/**
 * ipinfoに関するオブジェクト。
 */
var Ipinfo = {
    create: () => {
        var ipinfo = Object.create(Ipinfo.prototype);

        const systemEnv = require('./systemEnv');
        const property = systemEnv.get();

        const REQUEST_URL = property.IPINFO.REQUEST_URL;

        const parameter = {
            token: property.IPINFO.REQUEST_GET_TOKEN
        };

        const Url = require('./url');
        var url = Url.create(REQUEST_URL, parameter);

        ipinfo.apiUrl = url.getRequestUrl();

        return ipinfo;
    },
    /**
     * 現在地の取得に失敗した際に、メニューバーにエラーを表示します。
     */
    acquireException: () => {
        const DisplayError = require('./displays/error');
        var displayError = DisplayError.create(
            '現在地の取得に失敗しました。',
            '設定を確認してください。'
        );
        displayError.display();
    },
    prototype: {
        /**
         * API通信を実行します。
         */
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

                        var openWeatherMap = OpenWeatherMap.create(latlon);

                        openWeatherMap.execute('現在地');
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