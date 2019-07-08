exports.create = (requestUrl, parameter) => Url.create(requestUrl, parameter);

/**
 * URLに関するオブジェクトです。
 */
var Url = {
  create: (requestUrl, parameter) => {
    const url = Object.create(Url.prototype);

    url.requestUrl = requestUrl;

    url.parameter = parameter;

    return url;
  },
  prototype: {
    /**
     * リクエストURLを返します。
     */
    getRequestUrl() {
      if (this.parameter === undefined) {
        return this.requestUrl;
      }

      const keys = Object.keys(this.parameter);

      const mappingKeys = keys.map(
        (key, index) => `${key}=${this.parameter[key]}`
      );

      return `${this.requestUrl}?${mappingKeys.join("&")}`;
    }
  }
};
