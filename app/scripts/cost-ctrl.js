'use strict'

angular.module('fuelCalculator')
.controller('CostCtrl', ['fuelService', 'settingsService', function (fuelService, settingsService)
{
  var vm = this

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption
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

    return Math.floor(distance)
  }

  this.calculateDistance = function ()
  {
    return calculateDistanceByPrice(settingsService.fuelType(), vm.distanceForLiters, vm.litersForDistance, vm.cost)
  }

  this.calculatePrice = function (priceType)
  {
    var fuelType = settingsService.fuelType()
    var distance = calculateDistanceByPrice(fuelType, vm.distanceForLiters, vm.litersForDistance, vm.cost)

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
