angular.module('fuelCalculator')
.controller('FuelVolumeCtrl', ['$window', function ($window)
{
  function getLiterPrice (priceType, fuelType)
  {
    if (priceType === 'new') { return fuelType === '91' ? 0.75 : 0.90 }
    else                     { return fuelType === '91' ? 0.45 : 0.60 }
  }

  function calculateByVolume (priceType, fuelType, volume) { return volume * getLiterPrice(priceType, fuelType) }

  function getFuelType ()
  {
    return $window.localStorage.getItem('fuelType') || '91'
  }
  
  this.calculateByVolume = function (priceType, volume)
  { return calculateByVolume(priceType, getFuelType(), volume) }
}])
