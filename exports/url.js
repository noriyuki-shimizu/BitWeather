
exports.create = (requestUrl, parameter) => {
    return Url.create(requestUrl, parameter);
}

/**
 * URLに関するオブジェクトです。
 */
var Url = {
    create: (requestUrl, parameter) => {
        var url = Object.create(Url.prototype);

        url.requestUrl = requestUrl;

        url.parameter = parameter;

        return url;
    },
    prototype: {
        /**
         * リクエストURLを返します。
         */
        getRequestUrl() {

            if(this.parameter === undefined) {
                return this.requestUrl;
            }

            var keys = Object.keys(this.parameter);

            var mappingKeys = keys.map((key, index) => {
                return key + '=' + this.parameter[key];
            });

            return this.requestUrl + '?' + mappingKeys.join('&');
        }
    }
}