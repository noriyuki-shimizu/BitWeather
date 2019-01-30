
const Display = require('./display');
const WeatherConditionCodes = require('../openWeatherMapParts/weatherConditionCodes');
const WeatherWindDigree = require('../openWeatherMapParts/weatherWindDigree');

exports.create = (weatherData, address) => {
    return OpenWeatherMapDisplay.create(weatherData, address);
}

var OpenWeatherMapDisplay = {
    create: (weatherData, address) => {
        var openWeatherMapDisplay = Object.create(OpenWeatherMapDisplay.prototype);

        Object.assign(openWeatherMapDisplay, Display.create(weatherData));

        openWeatherMapDisplay.address = address;

        return openWeatherMapDisplay;
    },
    toDisplay: (text) => {

    },
    prototype: {
        execute() {
            const greenwich = 9;

            var beforeDate = '';

            Display.separator();

            var parentWeatherId = this.ofData[0].weather[0].id;
            var parentCondition = WeatherConditionCodes.get(parentWeatherId);
            console.log(parentCondition.icon + this.address);

            this.ofData.forEach(weatherDay => {
                var dateTime = new Date(weatherDay.dt_txt);

                dateTime.setHours(dateTime.getHours() + greenwich);

                var year = dateTime.getFullYear();
                var month = dateTime.getMonth() + 1;
                var date = dateTime.getDate();

                var hour = dateTime.getHours();

                var afterDate = `${year}年${month}月${date}日`;

                 if(beforeDate !== afterDate) {
                     beforeDate = afterDate;

                     console.log(`--${beforeDate}`);
                 }

                 console.log(`----${hour}時`);

                 var condition = WeatherConditionCodes.get(weatherDay.weather[0].id);
                 var digree = WeatherWindDigree.get(weatherDay.wind.deg);

                 console.log(`------${condition.icon} : ${condition.meaning} | color:black`);
                 console.log(`------気温: ${weatherDay.main.temp}℃ | color:black`);
                 console.log(`------最低気温: ${weatherDay.main.temp_min}℃ | color:black`);
                 console.log(`------最高気温: ${weatherDay.main.temp_max}℃ | color:black`);
                 console.log(`------湿度: ${weatherDay.main.humidity}% | color:black`);
                 console.log(`------風: ${weatherDay.wind.speed}m(${digree.windDigree}) | color:black`);
            });
        }
    }
}

Object.setPrototypeOf(OpenWeatherMapDisplay.prototype, Display.prototype);
