const WeatherConditionCodes = require("../openWeatherMap/openWeatherMapParts/weatherConditionCodes");
const WeatherWindDigree = require("../openWeatherMap/openWeatherMapParts/weatherWindDigree");

exports.create = weatherDataList => BitWeatherConvert.create(weatherDataList);

/**
 * openWeatherMapデータの変換に関するオブジェクト。
 */
const BitWeatherConvert = {
  create: weatherDataList => {
    const bitWeatherConvert = Object.create(BitWeatherConvert.prototype);

    bitWeatherConvert.greenwich = 9;

    bitWeatherConvert.weatherDataList = weatherDataList.copyWithin();

    return bitWeatherConvert;
  },
  prototype: {
    /**
     * 当日の天気予報の最初の天気アイコンを取得します。
     */
    getCurrentWeatherIcon() {
      if (!Array.isArray(this.weatherDataList)) return;

      const currentWeatherDay = this.weatherDataList[0];
      const condition = WeatherConditionCodes.get(
        currentWeatherDay.weather[0].id
      );

      return condition.icon;
    },
    /**
     * openWeatherMapから取得されたデータを変換します。
     */
    convert() {
      const weekChars = [
        "(日)",
        "(月)",
        "(火)",
        "(水)",
        "(木)",
        "(金)",
        "(土)"
      ];

      this.weatherDataList.map(weatherDay => {
        const dateTime = new Date(weatherDay.dt_txt);

        dateTime.setHours(dateTime.getHours() + this.greenwich);

        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1;
        const date = dateTime.getDate();

        const hour = dateTime.getHours();

        const weekIndex = dateTime.getDay();

        const condition = WeatherConditionCodes.get(weatherDay.weather[0].id);
        const digree = WeatherWindDigree.get(weatherDay.wind.deg);

        weatherDay.convert = {
          text: `${year}年${month}月${date}日${weekChars[weekIndex]}`,
          subMenu: [
            {
              text: `${hour}時`,
              subMenu: [
                {
                  text: `${condition.icon} : ${condition.meaning}`,
                  color: "black"
                },
                {
                  text: `気温: ${weatherDay.main.temp}℃`,
                  color: "black"
                },
                {
                  text: `最低気温: ${weatherDay.main.temp_min}℃`,
                  color: "black"
                },
                {
                  text: `最高気温: ${weatherDay.main.temp_max}℃`,
                  color: "black"
                },
                {
                  text: `湿度: ${weatherDay.main.humidity}%`,
                  color: "black"
                },
                {
                  text: `風: ${weatherDay.wind.speed}m(${digree.windDigree})`,
                  color: "black"
                }
              ]
            }
          ]
        };

        return weatherDay.convert;
      });

      return this;
    },
    /**
     * グループ化します。
     */
    grouping() {
      const group = {};
      this.weatherDataList.forEach(weatherDay => {
        const { text } = weatherDay.convert;
        const { subMenu } = weatherDay.convert;

        if (group[text] === undefined) {
          group[text] = {
            subMenuList: []
          };
        }

        group[text].subMenuList.push(subMenu);
      });

      return group;
    }
  }
};
