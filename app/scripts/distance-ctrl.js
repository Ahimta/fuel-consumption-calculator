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

  this.calculatePrice = function (priceType)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.distance)
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distancePerDay)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
