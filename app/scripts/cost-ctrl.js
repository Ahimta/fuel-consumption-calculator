'use strict'

angular.module('fuelCalculator').controller('CostCtrl', ['fuelService', function (fuelService)
{
  var vm = this

  this.distanceForLiters = fuelService.getConsumption()
  this.setConsumption = fuelService.setConsumption
  this.periodTable = fuelService.getPeriodTable()

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

  this.calculateDistance = function ()
  {
    return calculateDistanceByPrice(fuelService.getFuelType(), vm.distanceForLiters, vm.litersForDistance, vm.cost)
  }

  this.calculatePrice = function (priceType)
  {
    var distance = calculateDistanceByPrice(fuelService.getFuelType(), vm.distanceForLiters, vm.litersForDistance, vm.cost)
    return calculateByDistance(priceType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
