'use strict'

angular.module('fuelCalculator').controller('NavbarCtrl', ['$location', function ($location)
{
    function isElectricityPage () { return $location.path() === '/electricity' }
    function isWaterPage () { return $location.path() === '/water/cost-and-volume' }

    this.isFuelPage = function () { return !isElectricityPage() && !isWaterPage() }

    this.isElectricityPage = isElectricityPage
    this.isWaterPage = isWaterPage
}])
