curl https://covidtracking.com/api/v1/states/daily.json > ./src/data/statesdaily.json
curl https://covidtracking.com/api/us/daily > ./src/data/usdaily.json
curl https://covidtracking.com/api/v1/states/current.json > ./src/data/statescurrent.json
ng build --prod