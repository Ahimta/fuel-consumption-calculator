'use strict'

angular.module('fuelCalculator').controller('ComparisonCtrl', [
  'fuelService',
  'menuService',
  'periodService',
  'settingsService',
  function (fuelService, menuService, periodService, settingsService) {
    var vm = this

    this.litersForDistance = 1
    this.costOrDistance = 50

    this.distanceForLiters1 = settingsService.averageOrEfficiency()
    this.distanceForLiters2 = settingsService.averageOrEfficiency()

    this.periodTable = periodService.getPeriodTable()

    this.vehicleOptionMenu1 = menuService.getVehicleOptionMenu(
      'effeciency',
      true
    )
    this.vehicleOptionMenu2 = menuService.getVehicleOptionMenu(
      'effeciency',
      true
    )
    this.vehiclesMenu1 = menuService.getVehiclesMenu(
      settingsService.year(),
      settingsService.manufacturer(),
      settingsService.model(),
      true
    )
    this.vehiclesMenu2 = menuService.getVehiclesMenu(
      settingsService.year(),
      settingsService.manufacturer(),
      settingsService.model(),
      true
    )
    this.octaneMenu1 = menuService.getOctaneMenu(
      settingsService.fuelType(),
      true
    )
    this.octaneMenu2 = menuService.getOctaneMenu(
      settingsService.fuelType(),
      true
    )
    this.measureMenu = menuService.getMeasureMenu('distance')
    this.periodMenu = menuService.getPeriodMenu()

    function getDistanceForLiter (
      vehicleOptionMenu,
      vehiclesMenu,
      distanceForLiters
    ) {
      switch (vehicleOptionMenu.getSelected()) {
        case 'average':
          return 100 / distanceForLiters
        case 'effeciency':
          return distanceForLiters
        case 'vehicle':
          return vehiclesMenu.getDistanceForLiter()
      }
    }

    this.getDistanceForLiter1 = function () {
      return getDistanceForLiter(
        vm.vehicleOptionMenu1,
        vm.vehiclesMenu1,
        vm.distanceForLiters1
      )
    }

    this.getDistanceForLiter2 = function () {
      return getDistanceForLiter(
        vm.vehicleOptionMenu2,
        vm.vehiclesMenu2,
        vm.distanceForLiters2
      )
    }

    this.getSelectedUnit = function () {
      switch (vm.measureMenu.getSelected()) {
        case 'distance':
          return 'كيلو'
        case 'cost':
          return 'ريال'
      }
    }

    this.whichBetter = function () {
      return fuelService.whichBetter(
        vm.octaneMenu1.getSelected(),
        vm.getDistanceForLiter1(),
        vm.octaneMenu2.getSelected(),
        vm.getDistanceForLiter2()
      )
    }

    this.getFirstClass = function () {
      switch (vm.whichBetter()) {
        case 'second':
          return 'warning'
        case 'first':
        case 'same':
          return 'success'
      }
    }

    this.getSecondClass = function () {
      switch (vm.whichBetter()) {
        case 'first':
          return 'warning'
        case 'second':
        case 'same':
          return 'success'
      }
    }

    this.getPercentage = function () {
      return fuelService.getPercentageDifference(
        vm.octaneMenu1.getSelected(),
        vm.getDistanceForLiter1(),
        vm.octaneMenu2.getSelected(),
        vm.getDistanceForLiter2()
      )
    }

    this.cost = {}

    this.cost.calculateDistance = function (
      fuelType,
      distanceForLiters,
      factor
    ) {
      var costPerPeriod =
        vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor

      return fuelService.calculateDistanceByPrice(
        fuelType,
        distanceForLiters,
        vm.litersForDistance,
        costPerPeriod
      )
    }

    this.cost.calculatePrice = function (factor) {
      var costPerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
      return costPerDay * factor
    }

    this.cost.calculateDistanceDifference = function (factor) {
      var distance1 = vm.cost.calculateDistance(
        vm.octaneMenu1.getSelected(),
        vm.getDistanceForLiter1(),
        factor
      )
      var distance2 = vm.cost.calculateDistance(
        vm.octaneMenu2.getSelected(),
        vm.getDistanceForLiter2(),
        factor
      )

      return Math.abs(
        fuelService.roundPrice(distance2) - fuelService.roundPrice(distance1)
      )
    }

    this.distance = {}

    this.distance.calculateDistance = function (factor) {
      var distancePerDay = vm.periodMenu.getValuePerDay(vm.costOrDistance)
      return distancePerDay * factor
    }

    this.distance.calculatePrice = function (
      fuelType,
      distanceForLiters,
      factor
    ) {
      var distancePerPeriod =
        vm.periodMenu.getValuePerDay(vm.costOrDistance) * factor

      return fuelService.calculateByDistance(
        fuelType,
        distanceForLiters,
        vm.litersForDistance,
        distancePerPeriod
      )
    }

    this.distance.calculatePriceDifference = function (factor) {
      var distance1 = vm.distance.calculatePrice(
        vm.octaneMenu1.getSelected(),
        vm.getDistanceForLiter1(),
        factor
      )
      var distance2 = vm.distance.calculatePrice(
        vm.octaneMenu2.getSelected(),
        vm.getDistanceForLiter2(),
        factor
      )

      return Math.abs(
        fuelService.roundPrice(distance2) - fuelService.roundPrice(distance1)
      )
    }
  }
])
