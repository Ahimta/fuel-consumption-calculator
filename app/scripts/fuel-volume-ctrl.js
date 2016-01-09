'use strict'

angular.module('fuelCalculator').controller('FuelVolumeCtrl', ['fuelService', function (fuelService)
{
  var vm = this

  this.periodTable = fuelService.getPeriodTable()

  this.calculatePrice = function (priceType)
  { return fuelService.calculateByVolume(priceType, fuelService.getFuelType(), vm.volume) }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
