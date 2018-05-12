'use strict'

angular.module('fuelCalculator').service('settingsService', [
  '$window',
  function ($window) {
    this.vehicleOption = function (value) {
      if (value) {
        $window.localStorage.setItem('vehicleOption', value)
      } else {
        return $window.localStorage.getItem('vehicleOption') || 'vehicle'
      }
    }

    this.manufacturer = function (value) {
      if (value) {
        $window.localStorage.setItem('manufacturer', value)
      } else {
        return $window.localStorage.getItem('manufacturer') || 'Toyota'
      }
    }

    this.model = function (value) {
      if (value) {
        $window.localStorage.setItem('model', value)
      } else {
        return $window.localStorage.getItem('model') || 'Hilux'
      }
    }

    this.year = function (value) {
      if (value) {
        $window.localStorage.setItem('year', parseInt(value) || 2015)
      } else {
        return parseInt($window.localStorage.getItem('year')) || 2015
      }
    }

    this.fuelType = function (value) {
      if (value) {
        $window.localStorage.setItem('fuelType', value)
      } else {
        return $window.localStorage.getItem('fuelType') || '91'
      }
    }

    this.tankCostOrVolume = function (value) {
      if (value) {
        $window.localStorage.setItem('tankVolume', parseFloat(value) || 65)
      } else {
        return parseFloat($window.localStorage.getItem('tankVolume')) || 65
      }
    }

    this.averageOrEfficiency = function (value) {
      if (value) {
        $window.localStorage.setItem('consumption', parseFloat(value) || 8)
      } else {
        return parseFloat($window.localStorage.getItem('consumption')) || 8
      }
    }

    this.alertsRead = function (value) {
      if (value) {
        $window.localStorage.setItem('alertsRead', !!value)
      } else {
        return !!$window.localStorage.getItem('alertsRead')
      }
    }
  }
])
