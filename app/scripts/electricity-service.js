'use strict'

angular.module('fuelCalculator').service('electricityService', ['unitService', function (unitService)
{
  var self = this
  var TARIFFS = {
    metropolitan: {regular: [[6000, 0.18]], excessive: 0.30},
    profit: {regular: [[6000, 0.20]], excessive: 0.30},
    government: {regular: [], excessive: 0.32},
    enterprise: {regular: [], excessive: 0.18},
    agriculture: {regular: [[6000, 0.16]], excessive: 0.20}
  }

  this.getCategoryOptions = function ()
  {
    return [
        {label: 'سكني', value: 'metropolitan'},
        {label: 'تجاري', value: 'profit'},
        {label: 'حكومي', value: 'government'},
        {label: 'صناعي', value: 'enterprise'},
        {label: 'زراعي', value: 'agriculture'},
      ]
  }

  this.getPeriodTable = function ()
  {
    var MONTH = 'شهر'
    var THREE_MONTHS = '3 شهور'
    var SIX_MONTHS = '6 شهور'
    var YEAR = 'سنة'

    return [
      [MONTH, 1],
      [THREE_MONTHS, 3],
      [SIX_MONTHS, 6],
      [YEAR, 12]
    ]
  }

  function calculateMeterCost (meter)
  {
    if      (meter  <  100) { return 10 }
    else if (meter  <  200) { return 15 }
    else if (meter  <  300) { return 21 }
    else if (meter  <  400) { return 22 }
    else if (meter === 400) { return 25 }
    else                    { return 30 }
  }

  this.calculateConsumptionByCost = function (category, meter, cost)
  {
    const tariff = TARIFFS[category]

    if (!tariff)
    {
      return -1
    }

    var meterCost = calculateMeterCost(meter)
    var electricityCost = cost - meterCost

    return unitService.calculateInvertedUnit(tariff.regular, tariff.excessive, electricityCost)
  }

  this.calculateCostByConsumption = function (category, meter, consumption)
  {
    const tariff = TARIFFS[category]

    if (!tariff)
    {
      return -1
    }

    var meterCost = calculateMeterCost(meter)
    return unitService.calculateUnit(tariff.regular, tariff.excessive, consumption) + meterCost
  }
}])
