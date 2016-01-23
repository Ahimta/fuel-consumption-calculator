# Fuel Consumption Calculator #

## Common ##
## Data Definitions
- NewPrice is Number
- OldPrice is Number
- PriceDifference is Number
- Price is NewPrice|OldPrice
- Period is one of:
  * "day"
  * "week"
  * "month"
  * "year"

## Gasoline ##
### Data Definitions ###
- Consumption is (Distance, Volume)
- Distance is Number
- Volume is Number
- FuelType is one of:
  * "91"
  * "95"

### Usecases ###
- (FuelType Volume)                 -> (listof (Period, NewPrice, OldPrice, PriceDifference))
- (FuelType Consumption Distance)   -> (listof (Period, Distance, NewPrice, OldPrice, PriceDifference))
- (FuelType Consumption TankVolume) -> (listof (Period, Distance, NewPrice, OldPrice, PriceDifference))
- (FuelType Consumption Price)      -> (listof (Period, Distance, NewPrice, OldPrice, PriceDifference))
