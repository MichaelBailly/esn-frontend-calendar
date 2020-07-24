require('../../app.constants.js');

(function(angular) {
  'use strict';

  angular.module('esn.calendar.libs')
    .factory('CalVAlarmShell', CalVAlarmShellFactory);

  function CalVAlarmShellFactory(CAL_ALARM_MODIFY_COMPARE_KEYS) {
    function CalVAlarmShell(valarm, vevent) {
      this.valarm = valarm;
      this.vevent = vevent;
    }

    CalVAlarmShell.prototype = {
      get action() { return this.valarm.getFirstPropertyValue('action'); },
      get trigger() { return this.valarm.getFirstPropertyValue('trigger'); },
      get description() { return this.valarm.getFirstPropertyValue('description'); },
      get summary() { return this.valarm.getFirstPropertyValue('summary'); },
      get attendee() { return this.valarm.getFirstPropertyValue('attendee'); },
      equals: equals
    };

    return CalVAlarmShell;

    ////////////

    function equals(that) {
      if (!that) { return false; }
      if (that === this) { return true; }
      var self = this;

      return CAL_ALARM_MODIFY_COMPARE_KEYS.every(function(key) {
        if (key === 'trigger') {
          return self.trigger.compare(that.trigger) === 0;
        } else {
          return angular.equals(self[key], that[key]);
        }
      });
    }
  }
})(angular);
