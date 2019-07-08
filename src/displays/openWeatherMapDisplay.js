const Display = require("./display");

exports.create = (weatherData, address) =>
  OpenWeatherMapDisplay.create(weatherData, address);

/**
 * openWeatherMapデータ表示に関するオブジェクト。
 */
var OpenWeatherMapDisplay = {
  create: (weatherDataList, address) => {
    const openWeatherMapDisplay = Object.create(
      OpenWeatherMapDisplay.prototype
    );

    Object.assign(openWeatherMapDisplay, Display.create(weatherDataList));

    openWeatherMapDisplay.address = address;

    return openWeatherMapDisplay;
  },
  /**
   * サブメニューを表示します。
   */
  subMenuDisplay: (subMenuList, tree) => {
    tree += Display.tree();

    subMenuList.forEach(subMenu => {
      console.log(`${tree}${subMenu.text} | color=${subMenu.color}`);

      if (subMenu.subMenu !== undefined) {
        const flatSubMenuList = subMenu.subMenu.flat();
        OpenWeatherMapDisplay.subMenuDisplay(flatSubMenuList, tree);
      }
    });
  },
  prototype: {
    /**
     * OpenWeatherMapで取得されたデータを表示します。
     */
    display() {
      Display.separator();

      console.log(this.address);

      const keys = Object.keys(this.displayData);
      keys.forEach(key => {
        const tree = Display.tree();
        console.log(tree + key);

        const { subMenuList } = this.displayData[key];
        const flatSubMenuList = subMenuList.flat();

        OpenWeatherMapDisplay.subMenuDisplay(flatSubMenuList, tree);
      });
    }
  }
};

Object.setPrototypeOf(OpenWeatherMapDisplay.prototype, Display.prototype);
