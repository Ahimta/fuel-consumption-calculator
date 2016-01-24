'use strict'

angular.module('fuelCalculator')
.controller('ComparisonCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', function (fuelService, menuService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.distance = 15

  this.distanceForLiters1 = settingsService.consumption()
  this.distanceForLiters2 = settingsService.consumption()

  this.periodTable = periodService.getPeriodTable()
  this.periodMenu = menuService.getPeriodMenu()

  this.getFirstClass = function ()
  {
    if      (vm.distanceForLiters1 > vm.distanceForLiters2) { return 'success' }
    else if (vm.distanceForLiters1 < vm.distanceForLiters2) { return 'warning' }
    else                                                    { return 'success' }
  }

  this.getSecondClass = function ()
  {
    if      (vm.distanceForLiters2 > vm.distanceForLiters1) { return 'success' }
    else if (vm.distanceForLiters2 < vm.distanceForLiters1) { return 'warning' }
    else                                                    { return 'success' }
  }

  this.calculateDistance = function (factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.distance)
    return distancePerDay * factor
  }

  this.calculatePrice = function (distanceForLiters, factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.distance) * factor
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance('new', fuelType, distanceForLiters, vm.litersForDistance, distancePerDay)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice(vm.distanceForLiters1, factor)
    var newPrice = vm.calculatePrice(vm.distanceForLiters2, factor)

    return Math.abs(fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice))
  }
}])
