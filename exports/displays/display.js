
/*
 * メニューバーに表示させるオブジェクト
 */
var Display = {
    create: (of) => {
        var display = Object.create(Display.prototype);

        display.ofData = of;

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
