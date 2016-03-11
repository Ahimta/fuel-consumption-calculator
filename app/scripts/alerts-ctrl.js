'use strict'

angular.module('fuelCalculator').controller('AlertsCtrl', ['$window', 'settingsService', function ($window, settingsService)
{
  var isNewerVersionAvailable = false

  this.alertsRead = function () { return !isNewerVersionAvailable && settingsService.alertsRead() }

  this.dismiss = function () { settingsService.alertsRead(true) }

  this.isNewerVersionAvailable = function () { return isNewerVersionAvailable; }

  this.update = function (event)
  {
    event.preventDefault()
    $window.location.reload()
  }

  if ($window.applicationCache)
  {
    function onUpdateReady() { isNewerVersionAvailable = true }

    $window.applicationCache.addEventListener('updateready', onUpdateReady)

    if ($window.applicationCache.status === $window.applicationCache.UPDATEREADY) { onUpdateReady() }
  }
}])
