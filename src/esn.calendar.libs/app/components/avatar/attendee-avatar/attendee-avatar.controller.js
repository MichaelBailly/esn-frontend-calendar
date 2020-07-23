'use strict';

angular.module('esn.calendar.libs')
  .controller('CalAttendeeAvatarController', CalAttendeeAvatarController);

function CalAttendeeAvatarController() {
  var self = this;

  self.getDisplayName = getDisplayName;

  function getDisplayName() {
    return self.attendee.name || self.attendee.displayName;
  }
}