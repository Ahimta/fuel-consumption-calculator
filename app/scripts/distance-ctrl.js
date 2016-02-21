'use strict'

angular.module('fuelCalculator')
.controller('DistanceCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', 'vehicleService', function (fuelService, menuService, periodService, settingsService, vehicleService)
{
  var vm = this

  this.litersForDistance = 1
  this.distance = 15

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption

  this.periodTable = periodService.getPeriodTable()

  this.vehicleOptionMenu = menuService.getVehicleOptionMenu(settingsService.vehicleOption())
  this.vehiclesMenu = menuService.getVehiclesMenu(settingsService.year(), settingsService.manufacturer(), settingsService.model())
  this.octaneMenu = menuService.getOctaneMenu(settingsService.fuelType())
  this.periodMenu = menuService.getPeriodMenu()

  function getDistanceForLiter ()
  {
    switch (vm.vehicleOptionMenu.getSelected())
    {
      case 'average':    return 100 / vm.distanceForLiters
      case 'effeciency': return vm.distanceForLiters
      case 'vehicle':    return vm.vehiclesMenu.getDistanceForLiter()
    }
  }

  this.calculateDistance = function (factor)
  {
    var distancePerDay = vm.periodMenu.getValuePerDay(vm.distance)
    return distancePerDay * factor
  }

  this.calculatePrice = function (priceType, factor)
  {
    var distancePerPeriod = vm.periodMenu.getValuePerDay(vm.distance) * factor
    var distanceForLiters = getDistanceForLiter()
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance(priceType, fuelType, distanceForLiters, vm.litersForDistance, distancePerPeriod)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
  }
}])
