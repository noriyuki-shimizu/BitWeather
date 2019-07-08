/*
 * メニューバーに表示させるオブジェクト
 */
var Display = {
  create: displayData => {
    const display = Object.create(Display.prototype);

    display.displayData = displayData;

    return display;
  },
  separator: () => {
    console.log("---");
  },
  tree: () => "--",
  prototype: {}
};

module.exports = Display;
