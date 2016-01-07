'use strict'

angular.module('fuelCalculator')
.controller('DistanceCtrl', ['$scope', '$window', 'fuelService', function ($scope, $window, fuelService)
{
  var YEAR = 'سنة'
  var MONTH = 'شهر'
  var WEEK = 'اسبوع'
  var DAY = 'يوم'

  var vm = this

  function cb ()
  {
    if ($scope.consumptionForm.$valid && $scope.distanceForm.$valid) { draw() }
  }

  $scope.$watch('vm.litersForDistance', cb)
  $scope.$watch('vm.distanceForLiters', cb)
  $scope.$watch('vm.distance', cb)

  this.calculateByDistance = function (priceType, distanceForLiters, litersForDistance, distance)
  { return fuelService.calculateByDistance(priceType, fuelService.getFuelType(), distanceForLiters, litersForDistance, distance) }

  function draw ()
  {
    var dayOldCost = vm.calculateByDistance('old', vm.distanceForLiters, vm.litersForDistance, vm.distance)
    var dayNewCost = vm.calculateByDistance('new', vm.distanceForLiters, vm.litersForDistance, vm.distance)
    var data = {
      labels: [DAY, WEEK, MONTH, YEAR],
      series: [
        [dayNewCost, dayNewCost * 7, dayNewCost * 30, dayNewCost * 360],
        [dayOldCost, dayOldCost * 7, dayOldCost * 30, dayOldCost * 360]
      ]
    }
    var options = {
      horizontalBars: true,
      stackBars: true,
      axisX: {
        labelInterpolationFnc: function (value) { return (' ريال' + value) }
      }
    }

    new Chartist.Bar('.ct-chart', data, options).on('draw', function (datum)
    {
      if (datum.type === 'bar') { datum.element.attr({style: 'stroke-width: 30px'}) }
    })
  }
}])
