'use strict'

angular.module('fuelCalculator')
.controller('DistanceCtrl', ['fuelService', 'settingsService', function (fuelService, settingsService)
{
  var vm = this

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption
  this.periodTable = fuelService.getPeriodTable()

  this.calculatePrice = function (priceType)
  {
    var fuelType = settingsService.fuelType()
    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, vm.distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
