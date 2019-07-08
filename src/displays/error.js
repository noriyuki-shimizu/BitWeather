const Display = require("./display");

exports.create = (...message) => Error.create(message);

/**
 * エラーを表示に関するオブジェクト。
 */
var Error = {
  create: message => {
    const error = Object.create(Error.prototype);

    Object.assign(error, Display.create(message));

    return error;
  },
  prototype: {
    /**
     * エラーを表示します。
     */
    display() {
      Display.separator();

      if (!Array.isArray(this.displayData)) {
        console.log(`${this.displayData} | color:red`);
        return;
      }

      this.displayData.forEach(text => {
        console.log(`${text} | color:red`);
      });
    }
  }
};

Object.setPrototypeOf(Error.prototype, Display.prototype);
