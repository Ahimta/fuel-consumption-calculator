'use strict'

angular.module('fuelCalculator').controller('NavbarCtrl', ['$location', 'settingsService', function ($location, settingsService)
{
  this.setFuelType = settingsService.fuelType

  this.isFuelType = function (fuelType) { return settingsService.fuelType() === fuelType }

  this.octaneHidden = function ()
  {
    var path = $location.path()
    return path === '/comparison' || path === '/fuel-volume' || path === '/distance'
  }
}])
