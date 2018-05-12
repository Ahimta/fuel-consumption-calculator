'use strict'

angular.module('fuelCalculator').controller('WaterComparisonCtrl', [
  '$routeParams',
  'fuelService',
  'menuService',
  'periodService',
  'priceService',
  'settingsService',
  'validationService',
  'waterService',
  function (
    $routeParams,
    fuelService,
    menuService,
    periodService,
    priceService,
    settingsService,
    validationService,
    waterService
  ) {
    var vm = this

    this.costOrVolume1 = parseInt($routeParams.costOrVolume1) || 10
    this.costOrVolume2 = parseInt($routeParams.costOrVolume2) || 10
    this.counterRadius =
      parseInt(
        validationService.getValidCounterRadius($routeParams.counterRadius)
      ) || 19
    this.withService = parseInt($routeParams.withService) === 1 || false
    this.showDetails = false

    this.radiusOptions = waterService.getRadiusOptions()

    this.measureMenu1 = menuService.getWaterMeasureMenu(
      validationService.getValidWaterMeasure($routeParams.measure1)
    )
    this.measureMenu2 = menuService.getWaterMeasureMenu(
      validationService.getValidWaterMeasure($routeParams.measure2)
    )
    this.periodMenu1 = menuService.getWaterPeriodMenu(
      validationService.getValidWaterPeriod($routeParams.period1)
    )
    this.periodMenu2 = menuService.getWaterPeriodMenu(
      validationService.getValidWaterPeriod($routeParams.period2)
    )
    this.periodTable = periodService.getWaterTable()

    this.calculateVolume = function (
      measureMenu,
      periodMenu,
      costOrVolume,
      factor
    ) {
      var measure = measureMenu.getSelected()
      var costOrVolumePerMonth = periodMenu.getValuePerMonth(costOrVolume)
      var volumePerMonth = waterService.calculateVolumeByMeasure(
        measure,
        vm.numberOfUnits,
        vm.counterRadius,
        vm.withService,
        costOrVolumePerMonth
      )

      return volumePerMonth * factor
    }

    this.calculatePrice = function (
      measureMenu,
      periodMenu,
      costOrVolume,
      factor
    ) {
      var volumePerMonth

      switch (measureMenu.getSelected()) {
        case 'cost':
          volumePerMonth =
            vm.calculateVolume(measureMenu, periodMenu, costOrVolume, factor) /
            factor
          return (
            waterService.calculatePriceByVolume(
              vm.numberOfUnits,
              vm.counterRadius,
              vm.withService,
              volumePerMonth
            ) * factor
          )

        case 'volume':
          volumePerMonth = periodMenu.getValuePerMonth(costOrVolume)
          return (
            waterService.calculatePriceByVolume(
              vm.numberOfUnits,
              vm.counterRadius,
              vm.withService,
              volumePerMonth
            ) * factor
          )
      }
    }

    this.calculatePriceDifference = function (
      measureMenu1,
      periodMenu1,
      costOrVolume1,
      measureMenu2,
      periodMenu2,
      costOrVolume2,
      factor
    ) {
      var price1 = vm.calculatePrice(
        measureMenu1,
        periodMenu1,
        costOrVolume1,
        factor
      )
      var price2 = vm.calculatePrice(
        measureMenu2,
        periodMenu2,
        costOrVolume2,
        factor
      )

      return Math.abs(price1 - price2)
    }

    this.calculateVolumeDifference = function (
      measureMenu1,
      periodMenu1,
      costOrVolume1,
      measureMenu2,
      periodMenu2,
      costOrVolume2,
      factor
    ) {
      var volume1 = vm.calculateVolume(
        measureMenu1,
        periodMenu1,
        costOrVolume1,
        factor
      )
      var volume2 = vm.calculateVolume(
        measureMenu2,
        periodMenu2,
        costOrVolume2,
        factor
      )

      return Math.abs(volume1 - volume2)
    }

    this.getPriceDifferencePercentage = function (
      measureMenu1,
      periodMenu1,
      costOrVolume1,
      measureMenu2,
      periodMenu2,
      costOrVolume2
    ) {
      var price1 = vm.calculatePrice(
        measureMenu1,
        periodMenu1,
        costOrVolume1,
        1
      )
      var price2 = vm.calculatePrice(
        measureMenu2,
        periodMenu2,
        costOrVolume2,
        1
      )

      return priceService.getPercentageDifference(price1, price2)
    }

    this.getVolumeDifferencePercentage = function (
      measureMenu1,
      periodMenu1,
      costOrVolume1,
      measureMenu2,
      periodMenu2,
      costOrVolume2
    ) {
      var volume1 = vm.calculateVolume(
        measureMenu1,
        periodMenu1,
        costOrVolume1,
        1
      )
      var volume2 = vm.calculateVolume(
        measureMenu2,
        periodMenu2,
        costOrVolume2,
        1
      )

      return priceService.getPercentageDifference(volume1, volume2)
    }
  }
])
