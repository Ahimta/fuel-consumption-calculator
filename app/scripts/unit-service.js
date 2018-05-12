'use strict'

angular.module('fuelCalculator').service('unitService', [
  function () {
    var self = this

    this.calculateUnit = function (pairs, excessiveConsumptionPrice, volume) {
      var costOrVolumeSum = 0
      var remainingSumOrVolume = volume

      pairs.forEach(function (pair) {
        var quantity = pair[0]
        var value = pair[1]

        if (remainingSumOrVolume >= quantity) {
          costOrVolumeSum += quantity * value
          remainingSumOrVolume -= quantity
        } else {
          costOrVolumeSum += remainingSumOrVolume * value
          remainingSumOrVolume = 0
        }
      })

      return costOrVolumeSum + remainingSumOrVolume * excessiveConsumptionPrice
    }

    this.calculateInvertedUnit = function (
      pairs,
      excessiveConsumptionPrice,
      quantity
    ) {
      var invertedPairs = pairs.map(function (pair) {
        var from = pair[0]
        var to = pair[1]

        return [from * to, 1 / to]
      })

      return self.calculateUnit(
        invertedPairs,
        excessiveConsumptionPrice,
        quantity
      )
    }
  }
])
