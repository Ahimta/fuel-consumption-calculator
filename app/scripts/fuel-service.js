'use strict'

angular.module('fuelCalculator').service('fuelService', [
  'priceService',
  function (priceService) {
    function calculateDistanceByVolume (
      distanceForLiters,
      litersForDistance,
      volume
    ) {
      return distanceForLiters / litersForDistance * volume
    }

    function getLiterPrice (fuelType) {
      return fuelType === '91' ? 1.37 : 2.04
    }

    function calculateLitersByPrice (fuelType, price) {
      var pricePerLiter = getLiterPrice(fuelType)
      var volume = price / pricePerLiter

      return volume
    }

    function calculateDistanceByPrice (
      fuelType,
      distanceForLiters,
      litersForDistance,
      price
    ) {
      var volume = calculateLitersByPrice(fuelType, price)
      var distance = volume * distanceForLiters / litersForDistance

      return distance
    }

    function calculateByVolume (fuelType, volume) {
      return volume * getLiterPrice(fuelType)
    }

    function calculateByDistance (
      fuelType,
      distanceForLiters,
      litersForDistance,
      distance
    ) {
      var literPerKilometer = litersForDistance / distanceForLiters
      var volume = literPerKilometer * distance

      return calculateByVolume(fuelType, volume)
    }

    function getPricePerKilo (fuelType, distanceForLiter) {
      return getLiterPrice(fuelType) / distanceForLiter
    }

    this.roundPrice = function (price) {
      if (price < 10) {
        return price
      } else {
        return Math.round(price)
      }
    }

    this.getPercentageDifference = function (
      fuelType1,
      distanceForLiters1,
      fuelType2,
      distanceForLiters2
    ) {
      var pricePerKilo1 = getPricePerKilo(fuelType1, distanceForLiters1)
      var pricePerKilo2 = getPricePerKilo(fuelType2, distanceForLiters2)

      return priceService.getPercentageDifference(pricePerKilo1, pricePerKilo2)
    }

    this.whichBetter = function (
      fuelType1,
      distanceForLiters1,
      fuelType2,
      distanceForLiters2
    ) {
      var pricePerKilo1 = getPricePerKilo(fuelType1, distanceForLiters1)
      var pricePerKilo2 = getPricePerKilo(fuelType2, distanceForLiters2)

      if (pricePerKilo1 < pricePerKilo2) {
        return 'first'
      } else if (pricePerKilo2 < pricePerKilo1) {
        return 'second'
      } else {
        return 'same'
      }
    }

    this.getLitersByPrice = function (fuelType, price) {
      var literPrice = getLiterPrice(fuelType)
      return price / literPrice
    }

    this.calculateByDistance = calculateByDistance
    this.calculateByVolume = calculateByVolume

    this.calculateDistanceByVolume = calculateDistanceByVolume
    this.calculateDistanceByPrice = calculateDistanceByPrice

    this.getLiterPrice = getLiterPrice

    this.getPriceDifferencePercentage = function (fuelType) {
      console.log(fuelType)
      return fuelType === '91' ? 82.66666666666669 : 126.66666666666666
    }
  }
])
