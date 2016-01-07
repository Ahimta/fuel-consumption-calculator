'use strict'

angular.module('fuelCalculator').controller('TankVolumeCtrl', ['fuelService', function (fuelService)
{
  this.calculateDistance = fuelService.calculateDistance

  this.calculateByDistance = function (priceType, distanceForLiters, litersForDistance, distance)
  { return fuelService.calculateByDistance(priceType, fuelService.getFuelType(), distanceForLiters, litersForDistance, distance) }
}])
