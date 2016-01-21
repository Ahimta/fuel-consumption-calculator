'use strict'

angular.module('fuelCalculator').service('settingsService', ['$window', function ($window)
{
  var self = this

  this.fuelType = function (value)
  {
    if (value)
    {
      var currentFuelType = self.fuelType()
      $window.localStorage.setItem('fuelType', value)
      if ($window.ga) { $window.ga('send', 'event', 'Octane', 'change', (currentFuelType + '->' + value)) }
    }
    else { return $window.localStorage.getItem('fuelType') || '91' }
  }

  this.consumption = function (value)
  {
    if (value) { $window.localStorage.setItem('consumption', parseFloat(value) || 8) }
    else       { return parseFloat($window.localStorage.getItem('consumption')) || 8 }
  }

  this.alertsRead = function (value)
  {
    if (value) { $window.localStorage.setItem('alertsRead', !!value) }
    else       { return !!$window.localStorage.getItem('alertsRead') }
  }
}])
