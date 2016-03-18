'use strict'

angular.module('fuelCalculator')
.controller('WaterCostAndVolumeCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', 'waterService', function (fuelService, menuService, periodService, settingsService, waterService)
{
  var vm = this

  this.costOrVolume = 50
  this.counterRadius = 19
  this.withService = false

  this.radiusOptions = [
    {label: '0.5 (12mm)', value: 12},
    {label: '0.75 (19mm)', value: 19},
    {label: '1.25 (40mm)', value: 40},
    {label: '1.5 (50mm)', value: 50},
    {label: '2 أو أكثر (60mm أو أكثر)', value: 60},
  ]

  this.measureMenu = menuService.getWaterMeasureMenu()
  this.periodMenu = menuService.getWaterPeriodMenu()
  this.periodTable = periodService.getWaterTable()
  this.priceMenu = menuService.getPriceTypeMenu()

  this.calculateVolume = function (factor)
  {
    var costOrVolumePerMonth = vm.periodMenu.getValuePerMonth(vm.costOrVolume)

    switch (vm.measureMenu.getSelected())
    {
      case 'cost':
        var priceType = vm.priceMenu.getSelected()
        return waterService.calculateVolumeByPrice(priceType, vm.numberOfUnits, vm.counterRadius, vm.withService, costOrVolumePerMonth) * factor

      case 'volume':
        return costOrVolumePerMonth * factor
    }
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
}])
