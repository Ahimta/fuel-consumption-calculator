'use strict'

angular.module('fuelCalculator').controller('NavbarCtrl', ['$location', 'settingsService', function ($location, settingsService)
{
  this.setFuelType = settingsService.fuelType

  this.isFuelType = function (fuelType) { return settingsService.fuelType() === fuelType }

  this.isComparisonPage = function () { return $location.path() === '/comparison' }
}])
