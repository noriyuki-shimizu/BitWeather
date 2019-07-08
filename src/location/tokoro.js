exports.create = () => Tokoro.create();

/**
 * Tokoroライブラリを用いた住所変換に関するオブジェクト。
 */
var Tokoro = {
  create: () => {
    const tokoro = Object.create(Tokoro.prototype);

    tokoro.tokoro = require("tokoro");

    return tokoro;
  },
  /**
   * 住所不正の場合にメニューバーにエラーメッセージを表示します。
   */
  addressException: () => {
    const DisplayError = require("../displays/error");
    const displayError = DisplayError.create(
      "住所が不正です。",
      "設定を確認してください。"
    );
    displayError.display();
  },
  prototype: {
    /**
     * 住所から緯度、経度に変換し、OpenWeatherMapへパラメータを渡します。
     * @param {string} 住所
     */
    leadLatLonFromAddress(address) {
      const OpenWeatherMap = require("../openWeatherMap/openWeatherMap");

      const processAfterAcquisition = function(code) {
        if (code) {
          const latlon = { lat: code[0], lon: code[1] };

          // ====== weather ======
          const openWeatherMap = OpenWeatherMap.create(latlon);
          openWeatherMap.execute(address);
          // =====================

          return;
        }

        Tokoro.addressException();
      };

      this.tokoro(address, processAfterAcquisition);
    }
  }
};
