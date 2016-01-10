'use strict'

angular.module('fuelCalculator').controller('DistanceCtrl', ['fuelService', function (fuelService)
{
  var vm = this

  this.distanceForLiters = fuelService.getConsumption()
  this.setConsumption = fuelService.setConsumption
  this.periodTable = fuelService.getPeriodTable()

  this.calculatePrice = function (priceType)
  {
    var fuelType = fuelService.getFuelType()
    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, vm.distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
