'use strict'

angular.module('fuelCalculator')
.controller('ComparisonCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', function (fuelService, menuService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.costOrDistance = 15

  this.distanceForLiters1 = settingsService.consumption()
  this.distanceForLiters2 = settingsService.consumption()

  this.periodTable = periodService.getPeriodTable()
  this.periodMenu = menuService.getPeriodMenu()
  this.measureMenu = menuService.getMeasureMenu()

  this.getSelectedUnit = function ()
  {
    switch (vm.measureMenu.getSelected())
    {
      case 'distance': return 'كيلو'
      case 'cost':     return 'ريال'
    }
  }

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

  this.cost = {}

  this.cost.calculateDistance = function (distanceForLiters, factor)
  {
    var costPerPeriod = vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor
    var fuelType = settingsService.fuelType()

    return fuelService.calculateDistanceByPrice('new', fuelType, distanceForLiters, vm.litersForDistance, costPerPeriod)
  }

  this.cost.calculatePrice = function (factor)
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
    return costPerDay * factor
  }

  this.cost.calculateDistanceDifference = function (factor)
  {
    var distance1 = vm.cost.calculateDistance(vm.distanceForLiters1, factor)
    var distance2 = vm.cost.calculateDistance(vm.distanceForLiters2, factor)

    return Math.abs(fuelService.roundPrice(distance2) - fuelService.roundPrice(distance1))
  }

  this.distance = {}

  this.distance.calculateDistance = function (factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
    return distancePerDay * factor
  }

  this.distance.calculatePrice = function (distanceForLiters, factor)
  {
    var distancePerPeriod = vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance('new', fuelType, distanceForLiters, vm.litersForDistance, distancePerPeriod)
  }

  this.distance.calculatePriceDifference = function (factor)
  {
    var distance1 = vm.distance.calculatePrice(vm.distanceForLiters1, factor)
    var distance2 = vm.distance.calculatePrice(vm.distanceForLiters2, factor)

    return Math.abs(fuelService.roundPrice(distance2) - fuelService.roundPrice(distance1))
  }
}])
