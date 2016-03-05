'use strict'

angular.module('fuelCalculator', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider)
{
  $routeProvider
    .when('/comparison', {
      templateUrl: 'views/comparison.html',
      controller: 'ComparisonCtrl',
      controllerAs: 'vm'
    })
    .when('/cost', {
      templateUrl: 'views/cost.html',
      controller: 'CostCtrl',
      controllerAs: 'vm'
    })
    .when('/distance', {
      templateUrl: 'views/distance.html',
      controller: 'DistanceCtrl',
      controllerAs: 'vm'
    })
    .when('/tank', {
      templateUrl: 'views/tank-volume.html',
      controller: 'TankVolumeCtrl',
      controllerAs: 'vm'
    })
    .when('/tank-volume', {redirectTo: '/tank'})
    .otherwise({redirectTo: '/distance'})
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
