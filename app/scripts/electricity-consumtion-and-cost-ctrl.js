'use strict'

angular
  .module('fuelCalculator')
  .controller('ElectricityConsumptionAndCostCtrl', [
    'electricityService',
    'menuService',
    'priceService',
    function (electricityService, menuService, priceService) {
      this.categoryOptions = electricityService.getCategoryOptions()

      this.category = 'metropolitan'
      this.consumptionOrCost = 200
      this.meter = 20

      this.periodTable = electricityService.getPeriodTable()
      this.measureMenu = menuService.getElectricityMeasureMenu()

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
    }
  ])
