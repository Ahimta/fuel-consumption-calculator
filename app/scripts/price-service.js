'use strict'

angular.module('fuelCalculator').service('priceService', [function ()
{
  var NEW_PRICE_LABEL = 'حاليا'
  var OLD_PRICE_LABEL = 'سابقا'

  this.getPriceTypeLabel = function (priceType) { return priceType === 'new' ? NEW_PRICE_LABEL : OLD_PRICE_LABEL }

  this.getPercentageDifference = function (value1, value2)
  {
    if      (value1 > value2) { return value1 / value2 * 100 - 100 }
    else if (value2 > value1) { return value2 / value1 * 100 - 100 }
    else                      { return 0                           }
  }
}])
