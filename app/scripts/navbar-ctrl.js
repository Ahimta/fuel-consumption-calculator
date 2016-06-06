'use strict'

angular.module('fuelCalculator').controller('NavbarCtrl', ['locationService', function (locationService)
{
    this.isElectricityPage = locationService.isElectricityPage
    this.isWaterPage = locationService.isWaterPage
    this.isFuelPage = locationService.isFuelPage
}])
