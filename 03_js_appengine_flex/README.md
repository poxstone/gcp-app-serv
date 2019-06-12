# stress appengine flexible
## vars
```bash
export PROJECT="$(gcloud config get-value project)";
```

## Local Install and run
```bash
npm install;
node app.js;
# run
curl -X POST localhost:3000 -H "Content-Type: application/json" -d "{\"timeSleep\":2, \"date\":\"$(date -u '+%Y-%m-%d_%H:%M:%S.%N')\"}";
```

## deploy and test
```bash

gcloud app deploy ./ --project=${PROJECT} -q;

# test
for i in {1..60};do curl -k -X POST "https://jsstress-flex-dot-${PROJECT}.appspot.com" -H "Content-Type: application/json" -d "{\"timeSleep\":20, \"date\":\"$(date -u '+%Y-%m-%d_%H:%M:%S.%N')-${i}\"}" & date; done;
```
