'use strict'

angular.module('fuelCalculator')
.controller('TankVolumeCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', function (fuelService, menuService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.tankVolume = 64
  this.fillTimes = 1

  this.periodTable = periodService.getPeriodTable()
  this.periodMenu = menuService.getPeriodMenu('week')

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption

  this.calculateDistance = function (factor)
  {
    var fillTimesPerDay = vm.periodMenu.getValuePerDay(vm.fillTimes) * factor
    var volumePerDay = vm.tankVolume * fillTimesPerDay

    return fuelService.calculateDistanceByVolume(vm.distanceForLiters, vm.litersForDistance, volumePerDay)
  }

  this.calculatePrice = function (priceType, factor)
  {
    var distance = vm.calculateDistance(factor)
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
  }
}])
