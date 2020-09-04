'use strict';

/* global chai, sinon */

var expect = chai.expect;

describe('The esnCalendarController controller', function() {
  var $rootScope, $scope, $controller, initController, element, vm, calElement;

  beforeEach(function() {
    angular.mock.module('esn.calendar', 'linagora.esn.graceperiod');
  });

  afterEach(function() {
    $scope.$destroy();
  });

  beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;

    calElement = {
      fullCalendar: sinon.spy(),
      offset: sinon.spy(),
      find: function() { return []; }
    };

    element = {
      children: sinon.spy(function() {
        return calElement;
      })
    };

    initController = function() {
      vm = $controller('esnCalendarController', { $scope: $scope, $element: element });
      vm.config = {
        viewRender: sinon.spy(),
        data: 'data'
      };

      vm.calendarReady = sinon.spy();
    };

    initController();
  }));

  it('should pass given config to fullCalendar', function() {
    vm.$onInit();

    expect(calElement.fullCalendar).to.have.been.calledWith({
      viewRender: sinon.match.func,
      data: 'data'
    });
  });

  it('should not hide config.viewRender but wrap it to notify once when calendar is ready', function() {
    vm.$onInit();

    expect(calElement.fullCalendar).to.have.been.calledWith(sinon.match({
      viewRender: sinon.match.func.and(sinon.match(function(func) {
        func('arg1', 'arg2');

        return true;
      }))
    }));

    expect(vm.config.viewRender).to.have.been.calledWith('arg1', 'arg2');
    expect(vm.calendarReady).to.have.been.calledOnce;
  });

  describe('the calendar given to calendarReady callback', function() {

    var calendar;

    beforeEach(function() {
      vm.$onInit();
      expect(calElement.fullCalendar).to.have.been.calledWith(sinon.match({
        viewRender: sinon.match.func.and(sinon.match(function(func) {
          func();

          return true;
        }))
      }));

      expect(vm.calendarReady).to.have.been.calledWith(sinon.match(function(_calendar_) {
        calendar = _calendar_;

        return true;
      }));
    });

    it('should have a fullcalendar method that call directly the real fullcalendar jquery plugins', function() {
      calendar.fullCalendar('yolo', 'yolo');
      expect(calElement.fullCalendar).to.have.been.calledWith('yolo', 'yolo');
    });

    it('should have a offset method that call directly the real offset jquery method', function() {
      calendar.offset('yolo', 'yolo');
      expect(calElement.offset).to.have.been.calledWith('yolo', 'yolo');
    });
  });
});
