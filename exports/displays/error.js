
const Display = require('./display');

exports.create = (...message) => {
    return Error.create(message);
}

/**
 * エラーを表示させます。
 */
var Error = {
    create: (message) => {
        var error = Object.create(Error.prototype);

        Object.assign(error, Display.create(message));

        return error;
    },
    isArray: (target) => {
        var toString = Object.prototype.toString;
        return toString.call(target).slice(8, -1) === 'Array';
    },
    prototype: {
        display() {
            Display.separator();

            if(!Error.isArray(this.displayData)) {
                console.log(`${this.displayData} | color:red`);
                return ;
            }

            this.displayData.forEach(text => {
                console.log(`${text} | color:red`);
            });

        }
    }
}

Object.setPrototypeOf(Error.prototype, Display.prototype);