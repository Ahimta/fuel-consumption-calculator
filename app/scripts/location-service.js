'use strict'

angular.module('fuelCalculator').service('locationService', [
  '$location',
  function ($location) {
    function isElectricityPage () {
      return (
        $location.path() === '/electricity/consumption-and-cost' ||
        $location.path() === '/electricity/comparison'
      )
    }
    function isWaterPage () {
      return (
        $location.path() === '/water/cost-and-volume' ||
        $location.path() === '/water/comparison'
      )
    }

    this.isFuelPage = function () {
      return !isElectricityPage() && !isWaterPage()
    }

    this.isElectricityPage = isElectricityPage
    this.isWaterPage = isWaterPage
  }
])
