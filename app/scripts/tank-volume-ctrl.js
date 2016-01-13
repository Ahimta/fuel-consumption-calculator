'use strict'

angular.module('fuelCalculator')
.controller('TankVolumeCtrl', ['fuelService', 'settingsService', function (fuelService, settingsService)
{
  var vm = this

  this.litersForDistance = 1
  this.tankVolume = 64

  this.distanceForLiters = settingsService.consumption()
  this.setConsumption = settingsService.consumption

  this.calculateDistance = function ()
  {
    return fuelService.calculateDistanceByVolume(vm.distanceForLiters, vm.litersForDistance, vm.tankVolume)
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
