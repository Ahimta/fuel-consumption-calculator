'use strict'

angular.module('fuelCalculator').controller('AlertsCtrl', ['settingsService', function (settingsService)
{
  this.alertsRead = function () { return settingsService.alertsRead() }

  this.dismiss = function () { settingsService.alertsRead(true) }
}])
