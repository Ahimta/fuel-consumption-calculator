'use strict'

angular.module('fuelCalculator').controller('TabsCtrl', ['$location', function ($location)
{
  this.isCurrentPath = function (path) { return path === $location.path() }
}])
