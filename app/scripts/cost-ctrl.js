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

  this.calculateDistance = function ()
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.cost)
    return fuelService.calculateDistanceByPrice(settingsService.fuelType(), vm.distanceForLiters, vm.litersForDistance, costPerDay)
  }

  this.calculatePrice = function (priceType)
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.cost)
    var fuelType = settingsService.fuelType()
    var distance = fuelService.calculateDistanceByPrice(fuelType, vm.distanceForLiters, vm.litersForDistance, costPerDay)

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
