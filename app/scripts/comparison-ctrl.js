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
  this.octaneMenu1 = menuService.getOctaneMenu(settingsService.fuelType(), true)
  this.octaneMenu2 = menuService.getOctaneMenu(settingsService.fuelType(), true)

  this.getSelectedUnit = function ()
  {
    switch (vm.measureMenu.getSelected())
    {
      case 'distance': return 'كيلو'
      case 'cost':     return 'ريال'
    }
  }

  this.whichBetter = function()
  {
    return fuelService.whichBetter('new', vm.octaneMenu1.getSelected(), vm.distanceForLiters1, vm.octaneMenu2.getSelected(), vm.distanceForLiters2)
  }

  this.getFirstClass = function ()
  {
    switch (vm.whichBetter())
    {
      case 'second': return 'warning'
      case 'first':
      case 'same':  return 'success'
    }
  }

  this.getSecondClass = function ()
  {
    switch (vm.whichBetter())
    {
      case 'first': return 'warning'
      case 'second':
      case 'same':  return 'success'
    }
  }

  this.cost = {}

  this.cost.calculateDistance = function (fuelType, distanceForLiters, factor)
  {
    var costPerPeriod = vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor

    return fuelService.calculateDistanceByPrice('new', fuelType, distanceForLiters, vm.litersForDistance, costPerPeriod)
  }

  this.cost.calculatePrice = function (factor)
  {
    var costPerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
    return costPerDay * factor
  }

  this.cost.calculateDistanceDifference = function (factor)
  {
    var distance1 = vm.cost.calculateDistance(vm.octaneMenu1.getSelected(), vm.distanceForLiters1, factor)
    var distance2 = vm.cost.calculateDistance(vm.octaneMenu2.getSelected(), vm.distanceForLiters2, factor)

    return Math.abs(fuelService.roundPrice(distance2) - fuelService.roundPrice(distance1))
  }

  this.distance = {}

  this.distance.calculateDistance = function (factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
    return distancePerDay * factor
  }

  this.distance.calculatePrice = function (fuelType, distanceForLiters, factor)
  {
    var distancePerPeriod = vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor

    return fuelService.calculateByDistance('new', fuelType, distanceForLiters, vm.litersForDistance, distancePerPeriod)
  }

  this.distance.calculatePriceDifference = function (factor)
  {
    var distance1 = vm.distance.calculatePrice(vm.octaneMenu1.getSelected(), vm.distanceForLiters1, factor)
    var distance2 = vm.distance.calculatePrice(vm.octaneMenu2.getSelected(), vm.distanceForLiters2, factor)

    return Math.abs(fuelService.roundPrice(distance2) - fuelService.roundPrice(distance1))
  }
}])
