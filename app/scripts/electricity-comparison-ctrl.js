'use strict'

angular.module('fuelCalculator')
.controller('ElectricityComparisonCtrl', ['electricityService', 'menuService', 'priceService', function (electricityService, menuService, priceService)
{
  var vm = this

  this.categoryOptions = electricityService.getCategoryOptions()

  this.category = 'metropolitan'
  this.consumptionOrCost = 200
  this.consumptionOrCost2 = 200
  this.meter = 20
  this.showDetails = false

  this.periodTable = electricityService.getPeriodTable()
  this.priceMenu = menuService.getPriceTypeMenu()
  this.measureMenu = menuService.getElectricityMeasureMenu()
  this.priceMenu2 = menuService.getPriceTypeMenu()
  this.measureMenu2 = menuService.getElectricityMeasureMenu()

  function getConsumption (priceMenu, measure, category, meter, consumptionOrCost)
  {
    if (measure === 'consumption') { return consumptionOrCost }
    else
    {
      var cost = consumptionOrCost
      return electricityService.calculateConsumptionByCost(priceMenu.getSelected(), category, meter, cost)
    }
  }

  function getConsumptions (priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
  {
    var consumption1 = getConsumption(priceMenu1, measure1, category, meter, consumptionOrCost1)
    var consumption2 = getConsumption(priceMenu2, measure2, category, meter, consumptionOrCost2)

    return [consumption1, consumption2]
  }

  function getPrices (priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
  {
    var price1 = vm.calculatePrice(priceMenu1, measure1, 'new', category, meter, consumptionOrCost1)
    var price2 = vm.calculatePrice(priceMenu2, measure2, 'new', category, meter, consumptionOrCost2)

    return [price1, price2]
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

  this.calculatePriceDifference = function (priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
  {
    var prices = getPrices(priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
    return Math.abs(prices[0] - prices[1])
  }

  this.calculateConsumptionDifference = function (priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
  {
    var consumptions = getConsumptions(priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
    return Math.abs(consumptions[0] - consumptions[1])
  }

  this.getCostDifferencePercentage = function (priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
  {
    var prices = getPrices(priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
    return priceService.getPercentageDifference(prices[0], prices[1])
  }

  this.getConsumptionDifferencePercentage = function (priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
  {
    var consumptions = getConsumptions(priceMenu1, measure1, priceMenu2, measure2, category, meter, consumptionOrCost1, consumptionOrCost2)
    return priceService.getPercentageDifference(consumptions[0], consumptions[1])
  }
}])
