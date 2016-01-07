'use strict'

angular.module('fuelCalculator')
.controller('MainCtrl', ['$window', '$location', 'fuelService', function ($window, $location, fuelService)
{
  this.isCurrentPath = function (path)
  {
    return path === $location.path()
  }

  this.isFuelType = function (fuelType)
  {
    return fuelService.getFuelType() === fuelType
  }

  this.setFuelType = function (fuelType)
  {
    $window.localStorage.setItem('fuelType', fuelType)
  }
}])
