
exports.get = () => {
    return SystemEnv.get();
}

/**
 * 設定ファイルを読み込みます。
 */
var SystemEnv = {
    /**
     * 設定ファイルに記載されている値を返します。
     */
    get: () => {
        var systemEnv = Object.create(SystemEnv.prototype);

        const fs = require('fs');
        const yaml = require('yaml');

        const appYml = fs.readFileSync(__dirname + '/../config/app.yml', 'utf8');

        systemEnv.ymlPropertys = yaml.parse(appYml);

        systemEnv.yamlData = {
            IPINFO: {
                REQUEST_URL:       systemEnv.load('ipinfo.request.url'),
                REQUEST_GET_TOKEN: systemEnv.load('ipinfo.request.get.token')
            },
            TOKORO: {
                ADDRESS:           systemEnv.load('tokoro.address')
            },
            OPENWEATHERMAP: {
                REQUEST_URL:       systemEnv.load('openweathermap.request.url'),
                REQUEST_GET_APPID: systemEnv.load('openweathermap.request.get.appID'),
                REQUEST_GET_CNT:   systemEnv.load('openweathermap.request.get.cnt'),
                REQUEST_GET_UNITS: systemEnv.load('openweathermap.request.get.units'),
                REQUEST_GET_MODE:  systemEnv.load('openweathermap.request.get.mode')
            }
        };

        return systemEnv.yamlData;
    },
    prototype: {
        /**
         * 設定ファイルを読み込みます。
         * @param key
         * @returns {string} yml property
         */
        load(key) {
            if(typeof key !== 'string') {
                throw new SyntaxError('key must be string.')
            }

            const filler = '.';

            if(key.indexOf(filler) >= 0) {
                var keyList = key.split(filler);

                return this.scan(keyList);
            }

            return this.ymlPropertys[key];
        },
        /**
         * keyリストから設定を取得します。
         * @param keyList
         * @returns {any}
         */
        scan(keyList) {
            var ymlProperty = Object.assign({}, this.ymlPropertys);

            keyList.forEach((key, index) => {
                ymlProperty = ymlProperty[key];
            });

            return ymlProperty;
        }
    }
}



