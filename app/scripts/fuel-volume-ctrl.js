'use strict'

angular.module('fuelCalculator')
.controller('FuelVolumeCtrl', ['fuelService', 'periodService', 'settingsService', function (fuelService, periodService, settingsService)
{
  var vm = this

  this.periodTable = fuelService.getPeriodTable()
  this.periodMenu = periodService.getPeriodMenu()
  this.volume = 1

  this.calculatePrice = function (priceType, factor)
  {
    var volumePerDay = vm.periodMenu.getValuePerDay(vm.volume) * factor
    return fuelService.calculateByVolume(priceType, settingsService.fuelType(), volumePerDay)
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
  }
}])
