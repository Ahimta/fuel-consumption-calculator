angular.module('fuelCalculator')
.controller('FuelVolumeCtrl', ['fuelService', function (fuelService)
{
  this.calculateByVolume = function (priceType, volume)
  { return fuelService.calculateByVolume(priceType, fuelService.getFuelType(), volume) }
}])
