
# Find Crimes by Zipcode

```
curl -X GET "http://localhost:9090/crimeByZipcode?zipcode=85029&&category=theft&&start_date=09/25/2023&&end_date=11/25/2023"
```

```yaml
{"count":29}
```



# Find Crimes by City

```
curl -X GET "http://localhost:9090/crimeByCity?city=Phoenix&&start_date=09/25/2023&&end_date=10/25/2023"
```
```yaml
[{"zipcode":85339,"count":37},{"zipcode":85050,"count":14},{"zipcode":85085,"count":10},{"zipcode":85048,"count":11},{"zipcode":85331,"count":1},{"zipcode":85053,"count":32},{"zipcode":85051,"count":74},{"zipcode":85017,"count":62},{"zipcode":85044,"count":32},{"zipcode":85012,"count":32},{"zipcode":85031,"count":26},{"zipcode":85034,"count":33},{"zipcode":85043,"count":75},{"zipcode":85254,"count":12},{"zipcode":85353,"count":20},{"zipcode":85029,"count":63},{"zipcode":85028,"count":14},{"zipcode":85006,"count":39},{"zipcode":85033,"count":46},{"zipcode":85020,"count":50},{"zipcode":85304,"count":5},{"zipcode":85003,"count":22},{"zipcode":85306,"count":8},{"zipcode":85307,"count":7},{"zipcode":85040,"count":67},{"zipcode":85037,"count":40},{"zipcode":85013,"count":52},{"zipcode":85086,"count":7},{"zipcode":85007,"count":25},{"zipcode":85310,"count":7},{"zipcode":85015,"count":84},{"zipcode":85023,"count":45},{"zipcode":85019,"count":35},{"zipcode":85014,"count":24},{"zipcode":85027,"count":71},{"zipcode":85054,"count":20},{"zipcode":85016,"count":63},{"zipcode":85009,"count":61},{"zipcode":85083,"count":2},{"zipcode":85018,"count":38},{"zipcode":85022,"count":67},{"zipcode":85008,"count":80},{"zipcode":85032,"count":51},{"zipcode":85041,"count":64},{"zipcode":85308,"count":13},{"zipcode":85251,"count":3},{"zipcode":85021,"count":73},{"zipcode":85042,"count":57},{"zipcode":85035,"count":73},{"zipcode":85004,"count":34},{"zipcode":85024,"count":13}]
```
# Find Crimes by Category
```
curl -X GET "http://localhost:9090/crimeByCategory?category=theft&&start_date=09/25/2023&&end_date=11/25/2023"
```
```yaml
[{"zipcode":85003,"count":13},{"zipcode":85048,"count":7},{"zipcode":85050,"count":10},{"zipcode":85306,"count":6},{"zipcode":85304,"count":3},{"zipcode":85008,"count":33},{"zipcode":85033,"count":33},{"zipcode":85035,"count":41},{"zipcode":85024,"count":10},{"zipcode":85251,"count":3},{"zipcode":85083,"count":2},{"zipcode":85310,"count":5},{"zipcode":85037,"count":24},{"zipcode":85017,"count":34},{"zipcode":85032,"count":32},{"zipcode":85040,"count":37},{"zipcode":85043,"count":45},{"zipcode":85029,"count":29},{"zipcode":85053,"count":22},{"zipcode":85307,"count":4},{"zipcode":85018,"count":26},{"zipcode":85022,"count":49},{"zipcode":85019,"count":21},{"zipcode":85041,"count":34},{"zipcode":85016,"count":41},{"zipcode":85254,"count":8},{"zipcode":85308,"count":7},{"zipcode":85051,"count":46},{"zipcode":85028,"count":9},{"zipcode":85013,"count":27},{"zipcode":85021,"count":34},{"zipcode":85004,"count":24},{"zipcode":85031,"count":12},{"zipcode":85331,"count":1},{"zipcode":85027,"count":54},{"zipcode":85034,"count":20},{"zipcode":85044,"count":23},{"zipcode":85023,"count":27},{"zipcode":85014,"count":16},{"zipcode":85020,"count":31},{"zipcode":85353,"count":16},{"zipcode":85009,"count":34},{"zipcode":85012,"count":21},{"zipcode":85086,"count":7},{"zipcode":85007,"count":10},{"zipcode":85006,"count":19},{"zipcode":85015,"count":43},{"zipcode":85339,"count":21},{"zipcode":85042,"count":37},{"zipcode":85054,"count":18},{"zipcode":85085,"count":7}]
```