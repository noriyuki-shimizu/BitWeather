
/*
 * メニューバーに表示させるオブジェクト
 */
var Display = {
    create: (displayData) => {
        var display = Object.create(Display.prototype);

        display.displayData = displayData;

        return display;
    },
    separator: () => {
        console.log('---');
    },
    toDisplay: (text) => {
        // TODO: BitBarみたいに実装したいな〜~
    },
    prototype: {}
}

module.exports = Display;
