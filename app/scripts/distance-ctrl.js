'use strict'

angular.module('fuelCalculator')
.controller('DistanceCtrl', ['$scope', '$window', 'fuelService', function ($scope, $window, fuelService)
{
  this.calculateByDistance = function (priceType, distanceForLiters, litersForDistance, distance)
  { return fuelService.calculateByDistance(priceType, fuelService.getFuelType(), distanceForLiters, litersForDistance, distance) }
}])
