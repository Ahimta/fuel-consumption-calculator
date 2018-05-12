'use strict'

angular.module('fuelCalculator').controller('TabsCtrl', [
  '$location',
  'locationService',
  function ($location, locationService) {
    this.isCurrentPath = function (path) {
      return path === $location.path()
    }
    this.isElectricityPage = locationService.isElectricityPage
    this.isWaterPage = locationService.isWaterPage
    this.isFuelPage = locationService.isFuelPage
  }
])
