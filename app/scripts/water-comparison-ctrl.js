'use strict'

angular.module('fuelCalculator')
.controller('WaterComparisonCtrl', ['$routeParams', 'fuelService', 'menuService', 'periodService', 'priceService', 'settingsService', 'validationService', 'waterService', function ($routeParams, fuelService, menuService, periodService, priceService, settingsService, validationService, waterService)
{
  var vm = this

  this.costOrVolume1 = parseInt($routeParams.costOrVolume1) || 10
  this.costOrVolume2 = parseInt($routeParams.costOrVolume2) || 10
  this.counterRadius = parseInt(validationService.getValidCounterRadius($routeParams.counterRadius)) || 19
  this.withService = parseInt($routeParams.withService) === 1 || false
  this.showDetails = false

  this.radiusOptions = waterService.getRadiusOptions()

  this.measureMenu1 = menuService.getWaterMeasureMenu(validationService.getValidWaterMeasure($routeParams.measure1))
  this.measureMenu2 = menuService.getWaterMeasureMenu(validationService.getValidWaterMeasure($routeParams.measure2))
  this.periodMenu1 = menuService.getWaterPeriodMenu(validationService.getValidWaterPeriod($routeParams.period1))
  this.periodMenu2 = menuService.getWaterPeriodMenu(validationService.getValidWaterPeriod($routeParams.period2))
  this.periodTable = periodService.getWaterTable()
  this.priceMenu1 = menuService.getPriceTypeMenu(validationService.getValidPriceType($routeParams.priceType1))
  this.priceMenu2 = menuService.getPriceTypeMenu(validationService.getValidPriceType($routeParams.priceType2))

  this.calculateVolume = function (measureMenu, periodMenu, priceMenu, costOrVolume, factor)
  {
    var measure = measureMenu.getSelected()
    var priceType = priceMenu.getSelected()
    var costOrVolumePerMonth = periodMenu.getValuePerMonth(costOrVolume)
    var volumePerMonth = waterService.calculateVolumeByMeasure(measure, priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, costOrVolumePerMonth)

    return volumePerMonth * factor
  }

  this.calculatePrice = function (measureMenu, periodMenu, priceMenu, priceType, costOrVolume, factor)
  {
    var volumePerMonth;

    switch (measureMenu.getSelected())
    {
      case 'cost':
        volumePerMonth = vm.calculateVolume(measureMenu, periodMenu, priceMenu, costOrVolume, factor) / factor
        return waterService.calculatePriceByVolume(priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, volumePerMonth) * factor

      case 'volume':
        volumePerMonth = periodMenu.getValuePerMonth(costOrVolume)
        return waterService.calculatePriceByVolume(priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, volumePerMonth) * factor
    }
  }

  this.calculatePriceDifference = function (measureMenu1, periodMenu1, priceMenu1, costOrVolume1, measureMenu2, periodMenu2, priceMenu2, costOrVolume2, factor)
  {
    var price1 = vm.calculatePrice(measureMenu1, periodMenu1, priceMenu1, 'new', costOrVolume1, factor)
    var price2 = vm.calculatePrice(measureMenu2, periodMenu2, priceMenu2, 'new', costOrVolume2, factor)

    return Math.abs(price1 - price2)
  }

  this.calculateVolumeDifference = function (measureMenu1, periodMenu1, priceMenu1, costOrVolume1, measureMenu2, periodMenu2, priceMenu2, costOrVolume2, factor)
  {
    var volume1 = vm.calculateVolume(measureMenu1, periodMenu1, priceMenu1, costOrVolume1, factor)
    var volume2 = vm.calculateVolume(measureMenu2, periodMenu2, priceMenu2, costOrVolume2, factor)

    return Math.abs(volume1 - volume2)
  }

  this.getDifferencePercentage = function (measureMenu, periodMenu, priceMenu, costOrVolume)
  {
    var oldPrice = vm.calculatePrice(measureMenu, periodMenu, priceMenu, 'old', costOrVolume, 1)
    var newPrice = vm.calculatePrice(measureMenu, periodMenu, priceMenu, 'new', costOrVolume, 1)

    return priceService.getPercentageDifference(oldPrice, newPrice)
  }

  this.getPriceDifferencePercentage = function (measureMenu1, periodMenu1, priceMenu1, costOrVolume1, measureMenu2, periodMenu2, priceMenu2, costOrVolume2)
  {
    var price1 = vm.calculatePrice(measureMenu1, periodMenu1, priceMenu1, 'new', costOrVolume1, 1)
    var price2 = vm.calculatePrice(measureMenu2, periodMenu2, priceMenu2, 'new', costOrVolume2, 1)

    return priceService.getPercentageDifference(price1, price2)
  }

  this.getVolumeDifferencePercentage = function (measureMenu1, periodMenu1, priceMenu1, costOrVolume1, measureMenu2, periodMenu2, priceMenu2, costOrVolume2)
  {
    var volume1 = vm.calculateVolume(measureMenu1, periodMenu1, priceMenu1, costOrVolume1, 1)
    var volume2 = vm.calculateVolume(measureMenu2, periodMenu2, priceMenu2, costOrVolume2, 1)

    return priceService.getPercentageDifference(volume1, volume2)
  }
}])
