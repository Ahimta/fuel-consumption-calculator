'use strict'

angular.module('fuelCalculator').service('waterService', ['unitService', function (unitService)
{
  var self = this

  function calculateMaintainance (radius)
  {
    if      (radius >= 50) { return 15 }
    else if (radius >= 25) { return 10 }
    else                   { return 5  }
  }

  function calculateOldPriceByVolume (units, volume)
  { return unitService.calculateUnit([[50, 0.1], [50, 0.15], [100, 2], [100, 4]], 6, volume / units) * units }

  function calculateNewPriceByVolume (units, radius, withService, volume)
  {
    var maintainance = calculateMaintainance(radius)
    var cost = unitService.calculateUnit([[15, 0.1], [15, 1], [15, 3], [15, 4]], 6, volume / units) * units
    return (withService ? cost * 1.5 : cost) + maintainance
  }

  function calculateVolumeByOldPrice (units, cost)
  { return unitService.calculateUnit([[50*0.1, 1/0.1], [50*0.15, 1/0.15], [100*2, 1/2], [100*4, 1/4]], 1/6, cost / units) * units }

  function calculateVolumeByNewPrice (units, radius, withService, cost)
  {
    var maintainance = calculateMaintainance(radius)
    var costPerUnit = (cost - maintainance) / units
    var actualCost = (withService ? costPerUnit / 1.5 : costPerUnit)
    var volume = unitService.calculateUnit([[15*0.1, 1/0.1], [15*1, 1/1], [15*3, 1/3], [15*4, 1/4]], 1/6, actualCost) * units

    return (cost <= maintainance ? 0 : volume)
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

  this.calculateVolumeByMeasure = function (measure, priceType, units, radius, withService, costOrVolume)
  {
    switch (measure)
    {
      case 'cost':   return self.calculateVolumeByPrice(priceType, units, radius, withService, costOrVolume)
      case 'volume': return costOrVolume
    }
  }

  this.getRadiusOptions = function ()
  {
    return [
        {label: '0.5 (12mm)', value: 12},
        {label: '0.75 (19mm)', value: 19},
        {label: '1.25 (40mm)', value: 40},
        {label: '1.5 (50mm)', value: 50},
        {label: '2 أو أكثر (60mm أو أكثر)', value: 60},
      ]
  }
}])
