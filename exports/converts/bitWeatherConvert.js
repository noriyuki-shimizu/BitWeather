const WeatherConditionCodes = require('../openWeatherMapParts/weatherConditionCodes');
const WeatherWindDigree = require('../openWeatherMapParts/weatherWindDigree');

exports.create = weatherDataList => {
    return BitWeatherConvert.create(weatherDataList);
}

/**
 * openWeatherMapから取得されたデータを変換します。
 */
const BitWeatherConvert = {
    create: weatherDataList => {
        var bitWeatherConvert = Object.create(BitWeatherConvert.prototype);

        bitWeatherConvert.greenwich = 9;

        bitWeatherConvert.weatherDataList = weatherDataList.copyWithin();

        return bitWeatherConvert;
    },
    prototype: {
        getCurrentWeatherIcon() {
            if(!Array.isArray(this.weatherDataList)) return ;

            var currentWeatherDay = this.weatherDataList[0];
            var condition = WeatherConditionCodes.get(currentWeatherDay.weather[0].id);

            return condition.icon;
        },
        convert() {
            this.weatherDataList.map(weatherDay => {
                var dateTime = new Date(weatherDay.dt_txt);

                dateTime.setHours(dateTime.getHours() + this.greenwich);

                var year = dateTime.getFullYear();
                var month = dateTime.getMonth() + 1;
                var date = dateTime.getDate();

                var hour = dateTime.getHours();

                var condition = WeatherConditionCodes.get(weatherDay.weather[0].id);
                var digree = WeatherWindDigree.get(weatherDay.wind.deg);

                weatherDay.convert = {
                    text: `${year}年${month}月${date}日`,
                    subMenu: [{
                        text: `${hour}時`,
                        subMenu: [
                            {
                                text: `${condition.icon} : ${condition.meaning}`,
                                color: 'black'
                            },
                            {
                                text: `気温: ${weatherDay.main.temp}℃`,
                                color: 'black'
                            },
                            {
                                text: `最低気温: ${weatherDay.main.temp_min}℃`,
                                color: 'black'
                            },
                            {
                                text: `最高気温: ${weatherDay.main.temp_max}℃`,
                                color: 'black'
                            },
                            {
                                text: `湿度: ${weatherDay.main.humidity}%`,
                                color: 'black'
                            },
                            {
                                text: `風: ${weatherDay.wind.speed}m(${digree.windDigree})`,
                                color: 'black'
                            }
                        ]
                    }]
                };

                return weatherDay.convert;
            });

            return this;
        },
        grouping() {
            var group = {};
            this.weatherDataList.forEach(weatherDay => {

                var text = weatherDay.convert.text;
                var subMenu = weatherDay.convert.subMenu;

                if(group[text] === undefined) {
                    group[text] = {
                        subMenuList: []
                    };
                }

                group[text].subMenuList.push(subMenu);
            });

            return group;
        }
    }
}

