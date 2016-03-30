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

  function calculateOldPriceByVolume (units, volume)
  { return calculatePriceHelper([[50, 0.1], [50, 0.15], [100, 2], [100, 4]], 6, volume / units) * units }

  function calculateNewPriceByVolume (units, radius, withService, volume)
  {
    var maintainance = calculateMaintainance(radius)
    var cost = calculatePriceHelper([[15, 0.1], [15, 1], [15, 3], [15, 4]], 6, volume / units) * units
    return (withService ? cost * 1.5 : cost) + maintainance
  }

  function calculateVolumeByOldPrice (units, cost)
  { return calculatePriceHelper([[50*0.1, 1/0.1], [50*0.15, 1/0.15], [100*2, 1/2], [100*4, 1/4]], 1/6, cost / units) * units }

  function calculateVolumeByNewPrice (units, radius, withService, cost)
  {
    var maintainance = calculateMaintainance(radius)
    var costPerUnit = (cost - maintainance) / units
    var actualCost = (withService ? costPerUnit / 1.5 : costPerUnit)
    var volume = calculatePriceHelper([[15*0.1, 1/0.1], [15*1, 1/1], [15*3, 1/3], [15*4, 1/4]], 1/6, actualCost) * units

    return (actualCost <= maintainance ? 0 : volume)
  }

  this.calculatePriceByVolume = function (priceType, units, radius, withService, volume)
  {
    return (priceType === 'new' ?
            calculateNewPriceByVolume(units, radius, withService, volume) :
            calculateOldPriceByVolume(units, volume))
  }

  this.calculateVolumeByPrice = function (priceType, units, radius, withService, cost)
  {
    return (priceType === 'new' ?
            calculateVolumeByNewPrice(units, radius, withService, cost) :
            calculateVolumeByOldPrice(units, cost))
  }
}])
