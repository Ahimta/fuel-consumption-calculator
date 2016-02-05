'use strict'

angular.module('fuelCalculator')
.service('menuService', ['$window', 'periodService', 'priceService', 'settingsService', 'vehicleService', function ($window, periodService, priceService, settingsService, vehicleService)
{
  this.getVehiclesMenu = function (initialYear, initalManufacturer, initialModel, dontSave)
  {
    var selectedManufacturer = initalManufacturer || 'Toyota'
    var selectedModel = initialModel || 'Hilux'
    var selectedYear = initialYear || '2015'

    return {
      getSelectedManufacturer: function () { return selectedManufacturer },
      getSelectedModel: function () { return selectedModel },
      getSelectedYear: function () { return selectedYear },

      getDistanceForLiter: function ()
      { return vehicleService.getDistanceForLiter(selectedYear, selectedManufacturer, selectedModel) },

      selectManufacturer: function (manufacturer)
      {
        selectedManufacturer = manufacturer
        selectedModel = vehicleService.getFirstModel(selectedYear, manufacturer, selectedModel)

        if (!dontSave)
        {
          settingsService.manufacturer(selectedManufacturer)
          settingsService.model(selectedModel)
        }
      },
      selectModel: function (model)
      {
        selectedModel = model
        if (!dontSave) { settingsService.model(model) }
      },
      selectYear: function (year)
      {
        selectedYear = year
        selectedManufacturer = vehicleService.getFirstManufacturer(year, selectedManufacturer)
        selectedModel = vehicleService.getFirstModel(year, selectedManufacturer, selectedModel)

        if (!dontSave)
        {
          settingsService.manufacturer(selectedManufacturer)
          settingsService.model(selectedModel)
          settingsService.year(selectedYear)
        }
      },

      isSelectedManufacturer: function (manufacturer) { return manufacturer === selectedManufacturer },
      isSelectedModel: function (model) { return model === selectedModel },
      isSelectedYear: function (year) { return year === selectedYear },

      getAvailableManufacturers: function () { return vehicleService.getAvailableManufacturers(selectedYear) },
      getAvailableModels: function () { return vehicleService.getAvailableModels(selectedYear, selectedManufacturer) },
      getAvailableYears: vehicleService.getAvailableYears
    }
  }

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

  this.getVehicleOptionMenu = function (initialValue, dontSave)
  {
    var menuModel = getMenuModel('Vehicle Option', initialValue || 'vehicle')
    var oldSelect = menuModel.select

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'effeciency': return 'كفاءة استهلاك المركبة'
        case 'vehicle':    return 'المركبة'
      }
    }

    menuModel.select = function (option)
    {
      if (!dontSave) { settingsService.vehicleOption(option) }
      oldSelect(option)
    }

    return menuModel
  }

  this.getOctaneMenu = function (initialValue, dontSave)
  {
    var menuModel = getMenuModel('New Octane', initialValue || '91')

    menuModel.getSelectedLabel = menuModel.getSelected

    if (!dontSave)
    {
      var oldSelect = menuModel.select
      menuModel.select = function (octane)
      {
        settingsService.fuelType(octane)
        oldSelect(octane)
      }
    }

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
