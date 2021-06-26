# stress cloud functions
## vars
```bash
export PROJECT="$(gcloud config get-value project)";
```

## Local Install and run
```bash
npm install express body-parser;
node _server.js;
# run
curl -X POST localhost:4000 -H "Content-Type: application/json" -d "{\"timeSleep\":2, \"date\":\"$(date -u '+%Y-%m-%d_%H:%M:%S.%N')\"}";
```

## deploy and test
```bash

gcloud functions deploy jsStress --entry-point="jsStress" --runtime nodejs10 --memory=128 --timeout=60 --trigger-http --project=${PROJECT};


# test
for i in {1..20};do curl -k -X POST "https://us-central1-${PROJECT}.cloudfunctions.net/jsStress" -H "Content-Type: application/json" -d "{\"timeSleep\":2, \"date\":\"$(date -u '+%Y-%m-%d_%H:%M:%S.%N')-${i}\"}" & date; done;
```