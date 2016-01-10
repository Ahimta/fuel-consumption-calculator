'use strict'

angular.module('fuelCalculator')
.controller('MainCtrl', ['$location', 'settingsService', function ($location, settingsService)
{
  this.setFuelType = settingsService.fuelType

  this.isCurrentPath = function (path)
  {
    return path === $location.path()
  }

  this.isFuelType = function (fuelType)
  {
    return settingsService.fuelType() === fuelType
  }
}])
