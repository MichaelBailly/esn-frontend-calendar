'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The calendar configuration tab delegation controller', function() {
  var $rootScope,
    $controller,
    $scope,
    CalendarConfigurationTabDelegationController,
    CAL_CALENDAR_SHARED_RIGHT;

  function initController() {
    return $controller('CalendarConfigurationTabDelegationController', { $scope: $scope });
  }

  beforeEach(function() {
    angular.mock.module('esn.calendar');

    angular.mock.inject(function(_$rootScope_, _$controller_, _CAL_CALENDAR_SHARED_RIGHT_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;
      CAL_CALENDAR_SHARED_RIGHT = _CAL_CALENDAR_SHARED_RIGHT_;
    });
  });

  beforeEach(function() {
    CalendarConfigurationTabDelegationController = initController();
  });

  describe('the $onInit function', function() {
    it('should initialize self.delegationTypes with an array contains the different rights', function() {
      var delegationTypesExpected = [
        {
          value: CAL_CALENDAR_SHARED_RIGHT.SHAREE_ADMIN,
          name: CAL_CALENDAR_SHARED_RIGHT.SHAREE_ADMIN_LABEL_LONG
        }, {
          value: CAL_CALENDAR_SHARED_RIGHT.SHAREE_READ_WRITE,
          name: CAL_CALENDAR_SHARED_RIGHT.SHAREE_READ_WRITE_LABEL_LONG
        }, {
          value: CAL_CALENDAR_SHARED_RIGHT.SHAREE_READ,
          name: CAL_CALENDAR_SHARED_RIGHT.SHAREE_READ_LABEL_LONG
        }];

      CalendarConfigurationTabDelegationController.$onInit();

      expect(CalendarConfigurationTabDelegationController.delegationTypes).to.deep.equal(delegationTypesExpected);
    });
  });

  describe('the onAddingUser function', function() {
    var $tag;

    it('should return false if the $tag do not contain the _id field', function() {
      $tag = {};

      CalendarConfigurationTabDelegationController.$onInit();

      expect(CalendarConfigurationTabDelegationController.onAddingUser($tag)).to.be.false;
    });

    it('should return true if the $tag contain the _id field', function() {
      $tag = {
        _id: '11111111'
      };

      CalendarConfigurationTabDelegationController.$onInit();

      expect(CalendarConfigurationTabDelegationController.onAddingUser($tag)).to.be.true;
    });

    it('should return true when the $tag is not already added in the delegations', function() {
      $tag = {
        _id: '11111111'
      };

      CalendarConfigurationTabDelegationController.$onInit();

      CalendarConfigurationTabDelegationController.delegations = [
        {
          user: {
            _id: '123'
          }
        }
      ];

      expect(CalendarConfigurationTabDelegationController.onAddingUser($tag)).to.be.true;
    });

    it('should return false when the $tag does already exist in the delegations', function() {
      $tag = {
        _id: '123'
      };

      CalendarConfigurationTabDelegationController.$onInit();

      CalendarConfigurationTabDelegationController.delegations = [
        {
          user: {
            _id: '123'
          }
        }
      ];

      expect(CalendarConfigurationTabDelegationController.onAddingUser($tag)).to.be.false;
    });
  });
});
