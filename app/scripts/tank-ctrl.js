'use strict'

angular.module('fuelCalculator').controller('TankCtrl', [
  'fuelService',
  'menuService',
  'periodService',
  'settingsService',
  function (fuelService, menuService, periodService, settingsService) {
    var vm = this

    this.distanceForLiters = settingsService.averageOrEfficiency()
    this.tankCostOrVolume = settingsService.tankCostOrVolume()

    this.litersForDistance = 1
    this.fillTimes = 1

    this.periodTable = periodService.getPeriodTable()

    this.updateTankCostOrVolume = settingsService.tankCostOrVolume
    this.updateAverageOrEfficiency = settingsService.averageOrEfficiency

    this.vehicleOptionMenu = menuService.getVehicleOptionMenu(
      settingsService.vehicleOption()
    )
    this.vehiclesMenu = menuService.getVehiclesMenu(
      settingsService.year(),
      settingsService.manufacturer(),
      settingsService.model()
    )
    this.octaneMenu = menuService.getOctaneMenu(settingsService.fuelType())
    this.periodMenu = menuService.getPeriodMenu('month')

    function getDistanceForLiter () {
      switch (vm.vehicleOptionMenu.getSelected()) {
        case 'average':
          return 100 / vm.distanceForLiters
        case 'effeciency':
          return vm.distanceForLiters
        case 'vehicle':
          return vm.vehiclesMenu.getDistanceForLiter()
      }
    }

    this.calculateDistance = function (factor) {
      var distanceForLiter = getDistanceForLiter()
      var fillTimesPerDay = vm.periodMenu.getValuePerDay(vm.fillTimes) * factor
      var totalVolume = vm.tankCostOrVolume * fillTimesPerDay
      var volumePerDay =
        vm.octaneMenu.getSelected() === 'volume'
          ? totalVolume
          : fuelService.getLitersByPrice(
            vm.octaneMenu.getSelected(),
            totalVolume
          )

      return fuelService.calculateDistanceByVolume(
        distanceForLiter,
        vm.litersForDistance,
        volumePerDay
      )
    }

    this.calculatePrice = function (factor) {
      var distanceForLiter = getDistanceForLiter()
      var distance = vm.calculateDistance(factor)
      var fuelType = settingsService.fuelType()

      return fuelService.calculateByDistance(
        fuelType,
        distanceForLiter,
        vm.litersForDistance,
        distance
      )
    }
  }
])
