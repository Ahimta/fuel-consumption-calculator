'use strict'

angular.module('fuelCalculator').controller('CostCtrl', ['fuelService', function (fuelService)
{
  var vm = this

  function calculateLitersByPrice (fuelType, price)
  {
    var pricePerLiter = fuelService.getLiterPrice('new', fuelType)
    var volume = price / pricePerLiter

    return volume
  }

  function calculateDistanceByPrice (fuelType, distanceForLiters, litersForDistance, price)
  {
    var volume = calculateLitersByPrice(fuelType, price)
    var distance = volume * distanceForLiters / litersForDistance

    return Math.round(distance)
  }

  function calculateByDistance (priceType, distanceForLiters, litersForDistance, distance)
  { return fuelService.calculateByDistance(priceType, fuelService.getFuelType(), distanceForLiters, litersForDistance, distance) }

  this.calculateDistance = function (distanceForLiters, litersForDistance, price)
  {
    return calculateDistanceByPrice(fuelService.getFuelType(), distanceForLiters, litersForDistance, price)
  }

  this.calculatePrice = function (priceType, distanceForLiters, litersForDistance, price)
  {
    var distance = calculateDistanceByPrice(fuelService.getFuelType(), distanceForLiters, litersForDistance, price)
    return calculateByDistance(priceType, distanceForLiters, litersForDistance, distance)
  }

  this.calculatePriceDifference = function (distanceForLiters, litersForDistance, price)
  {
    var oldPrice = vm.calculatePrice('old', distanceForLiters, litersForDistance, price)
    var newPrice = vm.calculatePrice('new', distanceForLiters, litersForDistance, price)

    return newPrice - oldPrice
  }
}])
