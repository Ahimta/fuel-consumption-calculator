'use strict'

angular.module('fuelCalculator')
.controller('TankVolumeCtrl', ['fuelService', 'periodService', 'settingsService', function (fuelService, periodService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.tankVolume = 64
  this.fillTimes = 1

  this.periodTable = fuelService.getPeriodTable()
  this.periodMenu = periodService.getPeriodMenu('week')

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption

  this.calculateDistance = function ()
  {
    var fillTimesPerDay = vm.periodMenu.getValuePerDay(vm.fillTimes)
    var volumePerDay = vm.tankVolume * fillTimesPerDay

    return fuelService.calculateDistanceByVolume(vm.distanceForLiters, vm.litersForDistance, volumePerDay)
  }

  this.calculatePrice = function (priceType)
  {
    var distance = vm.calculateDistance()
    var fuelType = settingsService.fuelType()

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
