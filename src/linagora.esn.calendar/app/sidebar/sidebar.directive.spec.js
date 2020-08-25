'use strict';

/* global chai: false */
var expect = chai.expect;

describe('The calSidebar directive', function() {
  var CAL_LEFT_PANEL_BOTTOM_MARGIN;
  var CAL_EVENTS;
  var calendarServiceMock;

  beforeEach(function() {
    calendarServiceMock = {
      listPersonalAndAcceptedDelegationCalendars: function() {
        return $q.when([]);
      }
    };

    angular.mock.module('linagora.esn.graceperiod');
    angular.mock.module('esn.calendar');
    angular.mock.module('esn.calendar.libs');
    angular.mock.module('esn.resource.libs');
    angular.mock.module(function($provide) {
      $provide.value('calendarService', calendarServiceMock);
    });
  });

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, $q) {
    this.$compile = _$compile_;
    this.$rootScope = _$rootScope_;
    this.$scope = this.$rootScope.$new();
    this.$q = $q;

    this.initDirective = function(scope) {
      var element = this.$compile('<cal-sidebar/>')(scope);

      scope.$digest();

      return element;
    };

    angular.mock.inject(function(_CAL_LEFT_PANEL_BOTTOM_MARGIN_, _CAL_EVENTS_) {
      CAL_LEFT_PANEL_BOTTOM_MARGIN = _CAL_LEFT_PANEL_BOTTOM_MARGIN_;
      CAL_EVENTS = _CAL_EVENTS_;
    });
  }));

  it('change element height on calendar:height', function() {
    var element = this.initDirective(this.$scope);

    this.$rootScope.$broadcast(CAL_EVENTS.CALENDAR_HEIGHT, 1200);
    expect(element.height()).to.equal(1200 - CAL_LEFT_PANEL_BOTTOM_MARGIN);
  });
});
