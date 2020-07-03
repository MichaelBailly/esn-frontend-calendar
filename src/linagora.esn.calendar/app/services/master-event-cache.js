(function() {
  'use strict';

  angular.module('esn.calendar')
    .factory('calMasterEventCache', calMasterEventCache);

  function calMasterEventCache($timeout, CAL_MASTER_EVENT_CACHE_TTL) {
    var map = {};
    var service = {
      save: save,
      get: get,
      remove: remove
    };

    return service;

    ////////////

    function save(shell) {
      if (!shell.isInstance()) {
        remove(shell);
        map[shell.path] = {
          shell: shell,
          deletionPromise: $timeout(function() {
            delete map[shell.path];
          }, CAL_MASTER_EVENT_CACHE_TTL)
        };
      }
    }

    function get(path) {
      return map[path] && map[path].shell;
    }

    function remove(shell) {
      map[shell.path] && $timeout.cancel(map[shell.path].deletionPromise);
      delete map[shell.path];
    }
  }

})();
