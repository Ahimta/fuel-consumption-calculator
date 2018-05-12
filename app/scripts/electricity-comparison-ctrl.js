'use strict'

angular.module('fuelCalculator').controller('ElectricityComparisonCtrl', [
  'electricityService',
  'menuService',
  'priceService',
  function (electricityService, menuService, priceService) {
    var vm = this

    this.categoryOptions = electricityService.getCategoryOptions()

    this.category = 'metropolitan'
    this.consumptionOrCost = 200
    this.consumptionOrCost2 = 200
    this.meter = 20
    this.showDetails = false

    this.periodTable = electricityService.getPeriodTable()
    this.measureMenu = menuService.getElectricityMeasureMenu()
    this.measureMenu2 = menuService.getElectricityMeasureMenu()

    function getConsumption (measure, category, meter, consumptionOrCost) {
      if (measure === 'consumption') {
        return consumptionOrCost
      } else {
        var cost = consumptionOrCost
        return electricityService.calculateConsumptionByCost(
          category,
          meter,
          cost
        )
      }
    }

    function getConsumptions (
      measure1,
      measure2,
      category,
      meter,
      consumptionOrCost1,
      consumptionOrCost2
    ) {
      var consumption1 = getConsumption(
        measure1,
        category,
        meter,
        consumptionOrCost1
      )
      var consumption2 = getConsumption(
        measure2,
        category,
        meter,
        consumptionOrCost2
      )

      return [consumption1, consumption2]
    }

    function getPrices (
      measure1,
      measure2,
      category,
      meter,
      consumptionOrCost1,
      consumptionOrCost2
    ) {
      var price1 = vm.calculatePrice(
        measure1,
        category,
        meter,
        consumptionOrCost1
      )
      var price2 = vm.calculatePrice(
        measure2,
        category,
        meter,
        consumptionOrCost2
      )

      return [price1, price2]
    }

    this.calculateConsumption = function (
      measure,
      category,
      meter,
      consumptionOrCost
    ) {
      return getConsumption(measure, category, meter, consumptionOrCost)
    }

    this.calculatePrice = function (
      measure,
      category,
      meter,
      consumptionOrCost
    ) {
      var consumption = getConsumption(
        measure,
        category,
        meter,
        consumptionOrCost
      )
      return electricityService.calculateCostByConsumption(
        category,
        meter,
        consumption
      )
    }

    this.calculatePriceDifference = function (
      measure1,
      measure2,
      category,
      meter,
      consumptionOrCost1,
      consumptionOrCost2
    ) {
      var prices = getPrices(
        measure1,
        measure2,
        category,
        meter,
        consumptionOrCost1,
        consumptionOrCost2
      )
      return Math.abs(prices[0] - prices[1])
    }

    this.calculateConsumptionDifference = function (
      measure1,
      measure2,
      category,
      meter,
      consumptionOrCost1,
      consumptionOrCost2
    ) {
      var consumptions = getConsumptions(
        measure1,
        measure2,
        category,
        meter,
        consumptionOrCost1,
        consumptionOrCost2
      )
      return Math.abs(consumptions[0] - consumptions[1])
    }

    this.getCostDifferencePercentage = function (
      measure1,
      measure2,
      category,
      meter,
      consumptionOrCost1,
      consumptionOrCost2
    ) {
      var prices = getPrices(
        measure1,
        measure2,
        category,
        meter,
        consumptionOrCost1,
        consumptionOrCost2
      )
      return priceService.getPercentageDifference(prices[0], prices[1])
    }

    this.getConsumptionDifferencePercentage = function (
      measure1,
      measure2,
      category,
      meter,
      consumptionOrCost1,
      consumptionOrCost2
    ) {
      var consumptions = getConsumptions(
        measure1,
        measure2,
        category,
        meter,
        consumptionOrCost1,
        consumptionOrCost2
      )
      return priceService.getPercentageDifference(
        consumptions[0],
        consumptions[1]
      )
    }
  }
])
