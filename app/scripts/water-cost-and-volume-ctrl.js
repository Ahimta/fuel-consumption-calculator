'use strict'

angular.module('fuelCalculator')
.controller('WaterCostAndVolumeCtrl', ['$routeParams', 'fuelService', 'menuService', 'periodService', 'priceService', 'settingsService', 'validationService', 'waterService', function ($routeParams, fuelService, menuService, periodService, priceService, settingsService, validationService, waterService)
{
  var vm = this

  this.costOrVolume = parseInt($routeParams.costOrVolume) || 30
  this.counterRadius = parseInt(validationService.getValidCounterRadius($routeParams.counterRadius)) || 19
  this.withService = parseInt($routeParams.withService) === 1 || false

  this.radiusOptions = [
    {label: '0.5 (12mm)', value: 12},
    {label: '0.75 (19mm)', value: 19},
    {label: '1.25 (40mm)', value: 40},
    {label: '1.5 (50mm)', value: 50},
    {label: '2 أو أكثر (60mm أو أكثر)', value: 60},
  ]

  this.measureMenu = menuService.getWaterMeasureMenu(validationService.getValidWaterMeasure($routeParams.measure))
  this.periodMenu = menuService.getWaterPeriodMenu(validationService.getValidWaterPeriod($routeParams.period))
  this.periodTable = periodService.getWaterTable()
  this.priceMenu = menuService.getPriceTypeMenu(validationService.getValidPriceType($routeParams.priceType))

  this.calculateVolume = function (factor)
  {
    var measure = vm.measureMenu.getSelected()
    var priceType = vm.priceMenu.getSelected()
    var costOrVolumePerMonth = vm.periodMenu.getValuePerMonth(vm.costOrVolume)
    var volumePerMonth = waterService.calculateVolumeByMeasure(measure, priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, costOrVolumePerMonth)

    return volumePerMonth * factor
  }

  this.calculatePrice = function (priceType, factor)
  {
    var volumePerMonth;

    switch (vm.measureMenu.getSelected())
    {
      case 'cost':
        volumePerMonth = vm.calculateVolume(factor) / factor
        return waterService.calculatePriceByVolume(priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, volumePerMonth) * factor

      case 'volume':
        volumePerMonth = vm.periodMenu.getValuePerMonth(vm.costOrVolume)
        return waterService.calculatePriceByVolume(priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, volumePerMonth) * factor
    }
  }

  this.calculatePriceDifference = function (factor)
  {
    var oldPrice = vm.calculatePrice('old', factor)
    var newPrice = vm.calculatePrice('new', factor)

    return newPrice - oldPrice
  }

  this.getDifferencePercentage = function ()
  {
    var oldPrice = vm.calculatePrice('old', 1)
    var newPrice = vm.calculatePrice('new', 1)

    return priceService.getPercentageDifference(oldPrice, newPrice)
  }
}])
