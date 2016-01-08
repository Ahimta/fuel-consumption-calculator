'use script'

angular.module('fuelCalculator', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider)
{
  $routeProvider
    .when('/distance', {
      templateUrl: 'views/distance.html',
      controller: 'DistanceCtrl',
      controllerAs: 'vm'
    })
    .when('/fuel-volume', {
      templateUrl: 'views/fuel-volume.html',
      controller: 'FuelVolumeCtrl',
      controllerAs: 'vm'
    })
    .when('/tank-volume', {
      templateUrl: 'views/tank-volume.html',
      controller: 'TankVolumeCtrl',
      controllerAs: 'vm'
    })
    .when('/cost', {
      templateUrl: 'views/cost.html',
      controller: 'CostCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/distance'})
}])
