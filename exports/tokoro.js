// ===== パッケージ =====
const tokoro = require('tokoro');

// ===== exportsオブジェクト =====
const systemEnv = require('./systemEnv');
const OpenWeatherMap = require('./openWeatherMap');
const DisplayError = require('./displays/error');

exports.create = (address) => {
    return Tokoro.create(address);
}

var Tokoro = {
    create: (address) => {
        var tokoro = Object.create(Tokoro.prototype);

        tokoro.address = address;

        return tokoro;
    },
    addressException: () => {
        var displayError = DisplayError.create(
            '住所が不正です。',
            '設定を確認してください。'
        );
        displayError.display();
    },
    prototype: {
        leadLatLonFromAddress() {
            var address = this.address;
            var processAfterAcquisition = function(code) {
                if (code) {

                    const latlon = {lat: code[0], lon: code[1]};

                    // ====== weather ======
                    const openWeatherMap = OpenWeatherMap.create(address, latlon);
                    openWeatherMap.acquire();
                    // =====================

                    return ;
                }

                Tokoro.addressException();
            }

            tokoro(address, processAfterAcquisition);
        }
    }
}

