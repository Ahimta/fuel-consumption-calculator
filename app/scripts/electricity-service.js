'use strict'

angular.module('fuelCalculator').service('electricityService', ['unitService', function (unitService)
{
  var self = this
  var TARIFFS = {}

  TARIFFS['old'] = {
    metropolitan: {regular: [[2000, 5], [2000, 10], [2000, 12], [1000, 15], [1000, 20], [1000, 22], [1000, 24]], excessive: 26},
    profit: {regular: [[4000, 12], [4000, 20]], excessive: 26},
    government: {regular: [], excessive: 26},
    enterprise: {regular: [], excessive: 14},
    agriculture: {regular: [[2000, 5], [2000, 10], [1000, 10], [3000, 12]], excessive: 12}
  }

  TARIFFS['new'] = {
    metropolitan: {regular: [[2000, 5], [2000, 10], [2000, 20]], excessive: 30},
    profit: {regular: [[4000, 16], [4000, 24]], excessive: 30},
    government: {regular: [], excessive: 32},
    enterprise: {regular: [], excessive: 18},
    agriculture: {regular: [[2000, 10], [2000, 10], [1000, 12], [3000, 12]], excessive: 16}
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

  this.calculateConsumptionByCost = function (priceType, category, meter, cost)
  {
    if (TARIFFS[priceType] && TARIFFS[priceType][category])
    {
      var tariff = TARIFFS[priceType][category]
      var meterCost = calculateMeterCost(meter)
      var electricityCost = cost - meterCost

      return unitService.calculateInvertedUnit(tariff.regular, tariff.excessive, electricityCost)
    }
    else { return -1 }
  }

  this.calculateCostByConsumption = function (priceType, category, meter, consumption)
  {
    if (TARIFFS[priceType] && TARIFFS[priceType][category])
    {
      var tariff = TARIFFS[priceType][category]
      var meterCost = calculateMeterCost(meter)

      return unitService.calculateUnit(tariff.regular, tariff.excessive, consumption) + meterCost
    }
    else { return -1 }
  }
}])