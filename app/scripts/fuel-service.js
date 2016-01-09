'use strict'

angular.module('fuelCalculator').service('fuelService', ['$window', function ($window)
{
  function roundPrice (price, fractionSize)
  {
    if (price < 1)  { return price            }
    else            { return Math.ceil(price) }
  }

  function calculateDistance (distanceForLiters, litersForDistance, volume)
  {
    return Math.round(distanceForLiters / litersForDistance * volume)
  }

  function getLiterPrice (priceType, fuelType)
  {
    if (priceType === 'new') { return fuelType === '91' ? 0.75 : 0.90 }
    else                     { return fuelType === '91' ? 0.45 : 0.60 }
  }

  function calculateByVolume (priceType, fuelType, volume) { return volume * getLiterPrice(priceType, fuelType) }

  function getConsumption ()
  {
    return parseFloat($window.localStorage.getItem('consumption')) || 10
  }

  function setConsumption (consumption)
  {
    $window.localStorage.setItem('consumption', parseFloat(consumption) || 10)
  }

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

  this.calculateByDistance = calculateByDistance
  this.calculateByVolume = calculateByVolume
  this.calculateDistance = calculateDistance

  this.getLiterPrice = getLiterPrice
  this.getFuelType = getFuelType
  this.roundPrice = roundPrice

  this.getConsumption = getConsumption
  this.setConsumption = setConsumption
}])
