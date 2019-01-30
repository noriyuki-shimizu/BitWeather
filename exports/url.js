
/**
 *
 * @param {string} url URL
 * @param {object} requestParameter リクエストパラメーター
 * @returns {string} リクエストURL
 */
exports.create = (url, parameter) => {
    return Url.create(url, parameter);
}

var Url = {
    create: (requestUrl, requestParameter) => {
        var url = Object.create(Url.prototype);

        url.requestUrl = requestUrl;

        url.requestParameter = requestParameter;

        return url;
    },
    prototype: {
        /**
         * 引数のパラメータオブジェクトからリクエストパラメータを作成する。
         *
         * @param {object} parameter
         */
        createUrl() {

            if(this.requestParameter === undefined) {
                return this.requestUrl;
            }

            var keys = Object.keys(this.requestParameter);

            var mappingKeys = keys.map((key, index) => {
                return key + '=' + this.requestParameter[key];
            });

            return this.requestUrl + '?' + mappingKeys.join('&');
        }
    }
}