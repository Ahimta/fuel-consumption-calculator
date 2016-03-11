'use strict'

angular.module('fuelCalculator')
.controller('AlertsCtrl', ['$scope', '$window', 'settingsService', function ($scope, $window, settingsService)
{
  var isNewerVersionAvailable = false

  this.alertsRead = function () { return settingsService.alertsRead() }

  this.dismiss = function () { settingsService.alertsRead(true) }

  this.isNewerVersionAvailable = function () { return isNewerVersionAvailable }

  this.update = function (event)
  {
    event.preventDefault()
    $window.location.reload()
  }

  if ($window.applicationCache)
  {
    function onUpdateReady()
    {
      console.log('updateready')
      isNewerVersionAvailable = true
      $scope.digest()
    }

    $window.applicationCache.addEventListener('updateready', onUpdateReady)

    if ($window.applicationCache.status === $window.applicationCache.UPDATEREADY) { onUpdateReady() }
  }
}])
