'use strict'

angular.module('fuelCalculator')
.service('menuService', ['$window', 'fuelService', 'periodService', 'priceService', 'settingsService', 'vehicleService', function ($window, fuelService, periodService, priceService, settingsService, vehicleService)
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
      isSelectedYear: function (year) { return (''+year) === (''+selectedYear) },

      getAvailableManufacturers: function () { return vehicleService.getAvailableManufacturers(selectedYear) },
      getAvailableModels: function () { return vehicleService.getAvailableModels(selectedYear, selectedManufacturer) },
      getAvailableYears: vehicleService.getAvailableYears
    }
  }

  this.getTankMeasureMenu = function (initialValue)
  {
    var menuModel = getMenuModel('Tank Measure', initialValue || 'price')

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'price':  return 'تكلفة التعبئة'
        case 'volume': return 'حجم التانكي'
      }
    }

    menuModel.getSelectedUnit = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'price':  return 'ريال'
        case 'volume': return 'لتر'
      }
    }

    menuModel.getLiters = function (priceType, fuelType, priceOrVolume)
    {
      switch (menuModel.getSelected())
      {
        case 'price':  return fuelService.getLitersByPrice(priceType, fuelType, priceOrVolume)
        case 'volume': return priceOrVolume
      }
    }

    return menuModel
  }

  this.getVehicleOptionMenu = function (initialValue, dontSave)
  {
    var menuModel = getMenuModel('Vehicle Option', initialValue || 'vehicle')
    var oldSelect = menuModel.select

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'average':    return 'لتر/100كيلو'
        case 'effeciency': return 'كفاءة استهلاك المركبة'
        case 'vehicle':    return 'المركبة'
      }
    }

    menuModel.getSelectedUnit = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'average':    return 'لتر/100كيلو'
        case 'effeciency': return 'كيلو/لتر'
      }
    };

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

  this.getWaterMeasureMenu = function (initialValue)
  {
    var menuModel = getMenuModel('Water Measure', initialValue || 'volume')

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'cost':   return 'التكلفة'
        case 'volume': return 'كمية الاستهلاك'
      }
    }

    menuModel.getSelectedUnit = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'cost':   return 'ريال'
        case 'volume': return 'متر مكعب'
      }
    }

    return menuModel
  }

  this.getMeasureMenu = function (initialValue)
  {
    var menuModel = getMenuModel('Measure', initialValue || 'cost')

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'distance': return 'المسافة المقطوعة'
        case 'cost':     return 'التكلفة'
      }
    }

    menuModel.getSelectedUnit = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'distance': return 'كيلو'
        case 'cost':     return 'ريال'
      }
    }

    return menuModel
  }

  this.getElectricityMeasureMenu = function (initialValue)
  {
    var menuModel = getMenuModel('ElectricityMeasure', initialValue || 'cost')

    menuModel.getSelectedLabel = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'consumption': return 'شرائح الاستهلاك'
        case 'cost':        return 'التكلفة'
      }
    }

    menuModel.getSelectedUnit = function ()
    {
      switch (menuModel.getSelected())
      {
        case 'consumption': return 'ك.و.س'
        case 'cost':        return 'ريال'
      }
    }

    return menuModel
  }

  this.getPriceTypeMenu = function (initialValue)
  {
    var menuModel = getMenuModel('PriceType', initialValue || 'old')

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

  this.getWaterPeriodMenu = function (initialValue)
  {
    var menuModel = getMenuModel('Water Period', initialValue || 'month')

    menuModel.getSelectedLabel = function () { return periodService.getWaterPeriodLabel(menuModel.getSelected()) }

    menuModel.getValuePerMonth = function (valuePerPeriod)
    { return periodService.getWaterValuePerMonth(menuModel.getSelected(), valuePerPeriod) }

    return menuModel
  }
}])
