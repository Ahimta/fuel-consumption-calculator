'use strict'

angular.module('fuelCalculator').controller('TankVolumeCtrl', ['fuelService', function (fuelService)
{
  var vm = this

  this.distanceForLiters = fuelService.getConsumption()
  this.setConsumption = fuelService.setConsumption

  this.calculateDistance = function ()
  {
    return fuelService.calculateDistance(vm.distanceForLiters, vm.litersForDistance, vm.tankVolume)
  }

  this.calculatePrice = function (priceType)
  {
    var distance = vm.calculateDistance()
    var fuelType = fuelService.getFuelType()

    return fuelService.calculateByDistance(priceType, fuelType, vm.distanceForLiters, vm.litersForDistance, distance)
  }

  this.calculatePriceDifference = function ()
  {
    var oldPrice = vm.calculatePrice('old')
    var newPrice = vm.calculatePrice('new')

    return newPrice - oldPrice
  }
}])
