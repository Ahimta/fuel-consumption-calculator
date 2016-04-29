'use strict'

angular.module('fuelCalculator', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider)
{
  $routeProvider
    .when('/vehicle-comparison', {
      templateUrl: 'views/comparison.html',
      controller: 'ComparisonCtrl',
      controllerAs: 'vm'
    })
    .when('/cost-and-distance', {
      templateUrl: 'views/cost-and-distance.html',
      controller: 'CostAndDistanceCtrl',
      controllerAs: 'vm'
    })
    .when('/tank', {
      templateUrl: 'views/tank.html',
      controller: 'TankCtrl',
      controllerAs: 'vm'
    })
    .when('/water/cost-and-volume', {
      templateUrl: 'views/water-cost-and-volume.html',
      controller: 'WaterCostAndVolumeCtrl',
      controllerAs: 'vm'
    })
    .when('/water/comparison', {
      templateUrl: 'views/water-comparison.html',
      controller: 'WaterComparisonCtrl',
      controllerAs: 'vm'
    })
    .when('/comparison', {redirectTo: '/vehicle-comparison'})
    .when('/cost', {redirectTo: '/cost-and-distance'})
    .when('/distance', {redirectTo: '/cost-and-distance'})
    .when('/tank-volume', {redirectTo: '/tank'})
    .otherwise({redirectTo: '/cost-and-distance'})
}])
.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window)
{
  var previousPath = null

  $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute)
  {
    var currentPath = $location.path()

    if ($window.ga && currentPath !== previousPath) { $window.ga('send', 'pageview', {page: currentPath}) }

    previousPath = currentPath
  })
}])
