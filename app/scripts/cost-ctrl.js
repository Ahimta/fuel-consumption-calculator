'use strict'

angular.module('fuelCalculator')
.controller('CostCtrl', ['fuelService', 'periodService', 'settingsService', function (fuelService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.cost = 1

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption
  this.periodTable = fuelService.getPeriodTable()
  this.periodMenu = periodService.getPeriodMenu()

  this.calculateDistance = function (factor)
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.cost) * factor
    return fuelService.calculateDistanceByPrice(settingsService.fuelType(), vm.distanceForLiters, vm.litersForDistance, costPerDay)
  }

  this.calculatePrice = function (priceType, factor)
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.cost) * factor
    var fuelType = settingsService.fuelType()
    var distance = fuelService.calculateDistanceByPrice(fuelType, vm.distanceForLiters, vm.litersForDistance, costPerDay)

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
  }
}])
