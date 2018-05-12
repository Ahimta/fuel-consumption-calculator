'use strict'

angular.module('fuelCalculator').controller('CostAndDistanceCtrl', [
  'fuelService',
  'menuService',
  'periodService',
  'settingsService',
  function (fuelService, menuService, periodService, settingsService) {
    var vm = this

    this.litersForDistance = 1
    this.costOrDistance = 50

    this.distanceForLiters = settingsService.averageOrEfficiency()
    this.updateAverageOrEfficiency = settingsService.averageOrEfficiency
    this.periodTable = periodService.getPeriodTable()

    this.vehicleOptionMenu = menuService.getVehicleOptionMenu(
      settingsService.vehicleOption()
    )
    this.vehiclesMenu = menuService.getVehiclesMenu(
      settingsService.year(),
      settingsService.manufacturer(),
      settingsService.model()
    )
    this.octaneMenu = menuService.getOctaneMenu(settingsService.fuelType())
    this.periodMenu = menuService.getPeriodMenu()
    this.measureMenu = menuService.getMeasureMenu('distance')

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
      switch (vm.measureMenu.getSelected()) {
        case 'cost':
          var distanceForLiters = getDistanceForLiter()
          var costPerPeriod =
            vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor
          var fuelType = settingsService.fuelType()

          return fuelService.calculateDistanceByPrice(
            fuelType,
            distanceForLiters,
            vm.litersForDistance,
            costPerPeriod
          )

        case 'distance':
          var distancePerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
          return distancePerDay * factor
      }
    }

    this.calculatePrice = function (factor) {
      var distanceForLiters = getDistanceForLiter()
      var fuelType = settingsService.fuelType()

      switch (vm.measureMenu.getSelected()) {
        case 'cost':
          var distance = vm.calculateDistance(factor)
          return fuelService.calculateByDistance(
            fuelType,
            distanceForLiters,
            vm.litersForDistance,
            distance
          )

        case 'distance':
          var distancePerPeriod =
            vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor
          return fuelService.calculateByDistance(
            fuelType,
            distanceForLiters,
            vm.litersForDistance,
            distancePerPeriod
          )
      }
    }
  }
])
