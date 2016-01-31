'use strict'

angular.module('fuelCalculator')
.service('menuService', ['$window', 'periodService', 'priceService', function ($window, periodService, priceService)
{
  function getMenuModel (menuName, initialValue)
  {
    var selectedValue = initialValue || null

    return {
      getSelected: function () { return selectedValue },
      isSelected: function (value) { return value === selectedValue },
      select: function (value)
      {
        var currentSelected = selectedValue
        selectedValue = value
        if ($window.ga) { $window.ga('send', 'event', menuName, 'change', (currentSelected + '->' + value)) }
      }
    }
  }

  this.getOctaneMenu = function (initialValue)
  {
    var menuModel = getMenuModel('New Octane', initialValue || '91')

    menuModel.getSelectedLabel = menuModel.getSelected

    return menuModel
  }

  this.getMeasureMenu = function (initialValue)
  {
    var menuModel = getMenuModel('Measure', initialValue || 'distance')

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'distance': return 'المسافة'
        case 'cost':     return 'التكلفة'
      }
    }

    return menuModel
  }

  this.getPriceTypeMenu = function (initialValue)
  {
    var menuModel = getMenuModel('PriceType', initialValue || 'new')

    menuModel.getSelectedLabel = function () { return priceService.getPriceTypeLabel(menuModel.getSelected()) }

    return menuModel
  }

  this.getPeriodMenu = function (initialValue)
  {
    var menuModel = getMenuModel('Period', initialValue || 'day')

    menuModel.getSelectedLabel = function () { return periodService.getPeriodLabel(menuModel.getSelected()) }

    menuModel.getValuePerDay = function (valuePerPeriod)
    { return periodService.getValuePerDay(menuModel.getSelected(), valuePerPeriod) }

    return menuModel
  }
}])
