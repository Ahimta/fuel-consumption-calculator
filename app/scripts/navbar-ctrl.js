'use strict'

angular.module('fuelCalculator').controller('NavbarCtrl', ['settingsService', function (settingsService)
{
  this.setFuelType = settingsService.fuelType

  this.isFuelType = function (fuelType) { return settingsService.fuelType() === fuelType }
}])
