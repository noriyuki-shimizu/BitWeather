// ===== パッケージ =====
const tokoro = require('tokoro');

// ===== exportsオブジェクト =====
const systemEnv = require('./systemEnv');
const OpenWeatherMap = require('./openWeatherMap');
const DisplayError = require('./displays/error');

exports.create = () => {
    return Tokoro.create();
}

var Tokoro = {
    create: () => {
        var tokoro = Object.create(Tokoro.prototype);

        // 住所
        tokoro.address;

        tokoro.cron = 500;

        return tokoro;
    },
    prototype: {
        presentLocation() {
            var address = [];
            var execute = function(code) {
                if (code) {

                    const latlon = {lat: code[0], lon: code[1]};

                    // ====== weather ======
                    const openWeatherMap = OpenWeatherMap.create(address[0], latlon);
                    openWeatherMap.execute();
                    // =====================

                    address.shift();

                    return ;
                }

                var displayError = DisplayError.create('住所が不正です。');
                displayError.execute();
            }

            const property = systemEnv.get;

            const addressObj = property.TOKORO.ADDRESS;
            for(var key in addressObj) {
                if(typeof addressObj[key] === 'string') {
                    address.push(addressObj[key]);

                    tokoro(addressObj[key], execute);
                }
            }
        }
    }
}

