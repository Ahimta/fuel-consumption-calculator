# Fuel Consumption Calculator

## Definitions
- Volume is Natural
- Distance is Natural
- NewPrice is Number
- OldPrice is Number
- PriceDifference is Number
- Consumption is (Distance, Volume)
- FuelType is one of:
  * "91"
  * "95"
- PriceType is one of:
  * "old"
  * "new"
- Period is one of:
  * "day"
  * "week"
  * "month"
  * "year"

## Usecases
- (FuelType Volume)               -> (listof (Period, NewPrice, OldPrice, PriceDifference))
- (FuelType Consumption Distance) -> (NewPrice, OldPrice, PriceDifference)
