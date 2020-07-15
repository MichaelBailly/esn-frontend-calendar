require('../constants.js');
require('../services/calendar-current-view.js');

(function(angular) {
  'use strict';

  angular.module('esn.calendar')
    .directive('calendarDateIndicator', calendarDateIndicator);

  function calendarDateIndicator() {
    var directive = {
      restrict: 'A',
      scope: true,
      controller: CalendarDateIndicatorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function CalendarDateIndicatorController($scope, CAL_EVENTS, calendarCurrentView) {
    var self = this;
    var miniCalendarIsShown = false;

    $scope.$on(CAL_EVENTS.HOME_CALENDAR_VIEW_CHANGE, onCalendarHomeViewChange);
    $scope.$on(CAL_EVENTS.MINI_CALENDAR.VIEW_CHANGE, onMiniCalendarHomeViewChange);
    $scope.$on(CAL_EVENTS.MINI_CALENDAR.TOGGLE, onMiniCalendarToggle);

    activate();

    ////////////

    function activate() {
      var view = calendarCurrentView.get();
      view && _calendarDateIndicator(view);
    }

    function onCalendarHomeViewChange(event, view) { // eslint-disable-line
      _calendarDateIndicator(view || calendarCurrentView.get());
    }

    function onMiniCalendarHomeViewChange(event, view) { // eslint-disable-line
      if (miniCalendarIsShown) {
        _calendarDateIndicator(view || calendarCurrentView.getMinicalendarView());
      }
    }

    function onMiniCalendarToggle() {
      miniCalendarIsShown = !miniCalendarIsShown;
      _calendarDateIndicator(miniCalendarIsShown ? calendarCurrentView.getMiniCalendarView() : calendarCurrentView.get());
    }

    function _calendarDateIndicator(view) {
      self.dateIndicator = view.title;
    }
  }

})(angular);
