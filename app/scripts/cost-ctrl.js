'use strict'

angular.module('fuelCalculator')
.controller('CostCtrl', ['fuelService', 'settingsService', function (fuelService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.cost = 1

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption
  this.periodTable = fuelService.getPeriodTable()

  this.calculateDistance = function ()
  {
    return fuelService.calculateDistanceByPrice(settingsService.fuelType(), vm.distanceForLiters, vm.litersForDistance, vm.cost)
  }

  this.calculatePrice = function (priceType)
  {
    var fuelType = settingsService.fuelType()
    var distance = fuelService.calculateDistanceByPrice(fuelType, vm.distanceForLiters, vm.litersForDistance, vm.cost)

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
