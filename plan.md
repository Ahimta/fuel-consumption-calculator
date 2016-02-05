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

### Manufacturers ###
24503

1. BMW
2. Chevrolet
3. Dodge
4. Ford
5. GMC
6. Honda
7. Hyundai
8. Jeep
9. Kia
10. Lexus
11. Mazda
12. Mercedes-Benz
13. Mercury
14. Nissan
15. Toyota
