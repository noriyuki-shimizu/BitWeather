
const Display = require('./display');

exports.create = (message) => {
    return Error.create(message);
}

var Error = {
    create: (message) => {
        var error = Object.create(Error.prototype);

        Object.assign(error, Display.create(message));

        return error;
    },
    prototype: {
        execute() {
            Display.separator();
            console.log(`${this.ofData} | color:red`);
        }
    }
}