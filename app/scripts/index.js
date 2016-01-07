'use strict'

angular.module('fuelCalculator', []).controller('MainCtrl', ['$window', function ($window)
{
  this.volume = 1
  this.mode = 'distance'

  function calculateDistance (distanceForLiters, litersForDistance, volume)
  {
    return distanceForLiters / litersForDistance * volume
  }

  function getLiterPrice (priceType, fuelType)
  {
    if (priceType === 'new') { return fuelType === '91' ? 0.75 : 0.90 }
    else                     { return fuelType === '91' ? 0.45 : 0.60 }
  }

  function calculateByVolume (priceType, fuelType, volume) { return volume * getLiterPrice(priceType, fuelType) }

  function getFuelType ()
  {
    return $window.localStorage.getItem('fuelType') || '91'
  }

  function calculateByDistance (priceType, fuelType, distanceForLiters, litersForDistance, distance)
  {
    var literPerKilometer = litersForDistance / distanceForLiters
    var volume = literPerKilometer * distance

    return calculateByVolume(priceType, fuelType, volume)
  }

  this.calculateDistance = calculateDistance

  this.isFuelType = function (fuelType)
  {
    return getFuelType() === fuelType
  }

  this.setFuelType = function (fuelType)
  {
    $window.localStorage.setItem('fuelType', fuelType)
  }

  this.calculateByVolume = function (priceType, volume)
  { return calculateByVolume(priceType, getFuelType(), volume) }

  this.calculateByDistance = function (priceType, distanceForLiters, litersForDistance, distance)
  { return calculateByDistance(priceType, getFuelType(), distanceForLiters, litersForDistance, distance) }
}])
