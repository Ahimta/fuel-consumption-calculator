'use strict'

angular.module('fuelCalculator').service('waterService', [function ()
{
  function calculateMaintainance (radius)
  {
    if      (radius >= 50) { return 15 }
    else if (radius >= 25) { return 10 }
    else                   { return 5  }
  }

  function calculatePriceHelper (pairs, excessiveConsumptionPrice, volume)
  {
    var costOrVolumeSum = 0
    var remainingSumOrVolume = volume

    pairs.forEach(function (pair)
    {
      var quantity = pair[0]
      var value = pair[1]

      if (remainingSumOrVolume >= quantity)
      {
        costOrVolumeSum += quantity * value
        remainingSumOrVolume -= quantity
      }
      else
      {
        costOrVolumeSum += remainingSumOrVolume * value
        remainingSumOrVolume = 0
      }
    })

    return costOrVolumeSum + (remainingSumOrVolume * excessiveConsumptionPrice)
  }

  function calculateOldPriceByVolume (volume)
  { return calculatePriceHelper([[50, 0.1], [50, 0.15], [100, 2], [100, 4]], 6, volume) }

  function calculateNewPriceByVolume (withService, volume)
  {
    var cost = calculatePriceHelper([[15, 0.1], [15, 1], [15, 3], [15, 4]], 6, volume)
    return (withService ? cost * 1.5 : cost)
  }

  function calculateVolumeByOldPrice (cost)
  { return calculatePriceHelper([[50*0.1, 1/0.1], [50*0.15, 1/0.15], [100*2, 1/2], [100*4, 1/4]], 1/6, cost) }

  function calculateVolumeByNewPrice (withService, cost)
  {
    var actualCost = (withService ? cost / 1.5 : cost)
    var volume = calculatePriceHelper([[15*0.1, 1/0.1], [15*1, 1/1], [15*3, 1/3], [15*4, 1/4]], 1/6, actualCost)

    return volume
  }

  this.calculatePriceByVolume = function (priceType, units, radius, withService, volume)
  {
    var maintainance = calculateMaintainance(radius)
    var volumePerUnit = volume / units
    var costPerUnit = (priceType === 'new' ?
                       calculateNewPriceByVolume(withService, volumePerUnit) :
                       calculateOldPriceByVolume(volumePerUnit))

    return costPerUnit * units + maintainance
  }

  this.calculateVolumeByPrice = function (priceType, units, radius, withService, cost)
  {
    var maintainance = calculateMaintainance(radius)
    var costPerUnit = (cost - maintainance) / units
    var volumePerUnit = (priceType === 'new' ?
                         calculateVolumeByNewPrice(withService, costPerUnit) :
                         calculateVolumeByOldPrice(costPerUnit))

    return (cost <= maintainance ? 0 : volumePerUnit * units)
  }
}])
