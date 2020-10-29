require('../app.constants.js');

angular.module('esn.calendar.libs')
  .factory('calDavRequest', calDavRequest);

function calDavRequest($http, $q, tokenAPI, calCalDAVURLService, CAL_GRACE_DELAY_IS_ACTIVE) {
  let davServerUrlPromise = null;

  return request;

  ////////////

  function request(method, path, headers, body, params) {
    return _configureRequest(method, path, headers, body, params).then($http);
  }

  function _configureRequest(method, path, headers, body, params) {
    if (!CAL_GRACE_DELAY_IS_ACTIVE) {
      params && delete params.graceperiod;
    }

    headers = headers || {};

    return $q.all([tokenAPI.getNewToken(), _getDavServerUrl()])
      .then(([token, serverBaseUrl]) => {
        const config = {
          url: `${serverBaseUrl}${path}`,
          method: method,
          headers: { ...headers, ESNToken: token.data.token },
          params: params
        };

        if (body) {
          config.data = body;
        }

        return config;
      });
  }

  function _getDavServerUrl() {
    davServerUrlPromise = davServerUrlPromise || calCalDAVURLService.getFrontendURL();

    return davServerUrlPromise;
  }
}
