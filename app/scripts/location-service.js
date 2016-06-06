'use strict'

angular.module('fuelCalculator').service('locationService', ['$location', function ($location)
{
  function isCurrentPath (path) { return path === $location.path() }
  function isElectricityPage () { return $location.path() === '/electricity' }
  function isWaterPage () { return $location.path() === '/water/cost-and-volume' || $location.path() === '/water/comparison' }

  this.isFuelPage = function () { return !isElectricityPage() && !isWaterPage() }

  this.isElectricityPage = isElectricityPage
  this.isWaterPage = isWaterPage
}])