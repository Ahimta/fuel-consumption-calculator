'use strict'

angular.module('fuelCalculator')
  .controller('TankCtrl', ['fuelService', 'menuService', 'periodService', 'settingsService', function (fuelService, menuService, periodService, settingsService) {
    var vm = this

    this.distanceForLiters = settingsService.averageOrEfficiency()
    this.tankCostOrVolume = settingsService.tankCostOrVolume()

    this.litersForDistance = 1
    this.fillTimes = 1

    this.periodTable = periodService.getPeriodTable()

    this.updateTankCostOrVolume = settingsService.tankCostOrVolume
    this.updateAverageOrEfficiency = settingsService.averageOrEfficiency

    this.vehicleOptionMenu = menuService.getVehicleOptionMenu(settingsService.vehicleOption())
    this.vehiclesMenu = menuService.getVehiclesMenu(settingsService.year(), settingsService.manufacturer(), settingsService.model())
    this.octaneMenu = menuService.getOctaneMenu(settingsService.fuelType())
    this.periodMenu = menuService.getPeriodMenu('week')
    this.priceMenu = menuService.getPriceTypeMenu()
    this.tankMeasureMenu = menuService.getTankMeasureMenu()

    function getDistanceForLiter() {
      switch (vm.vehicleOptionMenu.getSelected()) {
        case 'average': return 100 / vm.distanceForLiters
        case 'effeciency': return vm.distanceForLiters
        case 'vehicle': return vm.vehiclesMenu.getDistanceForLiter()
      }
    }

    this.calculateDistance = function (factor) {
      var distanceForLiter = getDistanceForLiter()
      var fillTimesPerDay = vm.periodMenu.getValuePerDay(vm.fillTimes) * factor
      var volumePerDay = vm.tankMeasureMenu.getLiters(vm.priceMenu.getSelected(), vm.octaneMenu.getSelected(), vm.tankCostOrVolume * fillTimesPerDay)

      return fuelService.calculateDistanceByVolume(distanceForLiter, vm.litersForDistance, volumePerDay)
    }

    this.calculatePrice = function (priceType, factor) {
      var distanceForLiter = getDistanceForLiter()
      var distance = vm.calculateDistance(factor)
      var fuelType = settingsService.fuelType()

      return fuelService.calculateByDistance(priceType, fuelType, distanceForLiter, vm.litersForDistance, distance)
    }

    this.calculatePriceDifference = function (factor) {
      var oldPrice = vm.calculatePrice('old', factor)
      var newPrice = vm.calculatePrice('new', factor)

      return fuelService.roundPrice(newPrice) - fuelService.roundPrice(oldPrice)
    }

    this.getPriceDifferencePercentage = fuelService.getPriceDifferencePercentage
  }])
