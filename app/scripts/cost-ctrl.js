'use strict'

angular.module('fuelCalculator')
.controller('CostCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', function (fuelService, menuService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.cost = 1

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption
  this.periodTable = periodService.getPeriodTable()

  this.periodMenu = menuService.getPeriodMenu()
  this.priceMenu = menuService.getPriceTypeMenu()

  this.calculateDistance = function (factor)
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.cost) * factor
    var priceType = vm.priceMenu.getSelected()
    var fuelType = settingsService.fuelType()

    return fuelService.calculateDistanceByPrice(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, costPerDay)
  }

  this.calculatePrice = function (priceType, factor)
  {
    var fuelType = settingsService.fuelType()
    var distance = vm.calculateDistance(factor)

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
  }
}])
