'use strict'

angular.module('fuelCalculator')
.controller('FuelVolumeCtrl', ['fuelService', 'settingsService', function (fuelService, settingsService)
{
  var vm = this

  this.volume = 1
  this.periodTable = fuelService.getPeriodTable()

  this.calculatePrice = function (priceType)
  { return fuelService.calculateByVolume(priceType, settingsService.fuelType(), vm.volume) }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
