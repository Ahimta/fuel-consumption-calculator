'use strict'

angular.module('fuelCalculator')
.controller('ElectricityConsumptionAndCostCtrl', ['electricityService', 'menuService', 'priceService', function (electricityService, menuService, priceService)
{
  var vm = this

  this.categoryOptions = electricityService.getCategoryOptions()

  this.category = 'metropolitan'
  this.consumptionOrCost = 200
  this.meter = 20

  this.periodTable = electricityService.getPeriodTable()
  this.priceMenu = menuService.getPriceTypeMenu()
  this.measureMenu = menuService.getElectricityMeasureMenu()

  function getConsumption (priceMenu, measure, category, meter, consumptionOrCost)
  {
    if (measure === 'consumption') { return consumptionOrCost }
    else
    {
      var cost = consumptionOrCost
      return electricityService.calculateConsumptionByCost(priceMenu.getSelected(), category, meter, cost)
    }
  }

  this.calculateConsumption = function (priceMenu, measure, priceType, category, meter, consumptionOrCost)
  {
    return getConsumption(priceMenu, measure, category, meter, consumptionOrCost)
  }

  this.calculatePrice = function (priceMenu, measure, priceType, category, meter, consumptionOrCost)
  {
    var consumption = getConsumption(priceMenu, measure, category, meter, consumptionOrCost)
    return electricityService.calculateCostByConsumption(priceType, category, meter, consumption)
  }

  this.calculatePriceDifference = function (priceMenu, measure, category, meter, consumptionOrCost)
  {
    var oldPrice = vm.calculatePrice(priceMenu, measure, 'old', category, meter, consumptionOrCost)
    var newPrice = vm.calculatePrice(priceMenu, measure, 'new', category, meter, consumptionOrCost)

    return newPrice - oldPrice
  }

  this.getDifferencePercentage = function (priceMenu, measure, category, meter, consumptionOrCost)
  {
    var oldPrice = vm.calculatePrice(priceMenu, measure, 'old', category, meter, consumptionOrCost)
    var newPrice = vm.calculatePrice(priceMenu, measure, 'new', category, meter, consumptionOrCost)

    return priceService.getPercentageDifference(oldPrice, newPrice)
  }
}])
