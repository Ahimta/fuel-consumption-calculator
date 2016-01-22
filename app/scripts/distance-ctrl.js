'use strict'

angular.module('fuelCalculator')
.controller('DistanceCtrl', ['fuelService', 'periodService', 'settingsService', function (fuelService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.distance = 15

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption
  this.periodTable = fuelService.getPeriodTable()
  this.periodMenu = periodService.getPeriodMenu()

  this.calculateDistance = function (factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.distance)
    return distancePerDay * factor
  }

  this.calculatePrice = function (priceType, factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.distance) * factor
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distancePerDay)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
  }
}])
