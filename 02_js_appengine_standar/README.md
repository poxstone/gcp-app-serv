# stress appengine standar
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
for i in {1..20};do curl -k -X POST "https://jsstress-dot-${PROJECT}.appspot.com" -H "Content-Type: application/json" -d "{\"timeSleep\":5, \"date\":\"$(date -u '+%Y-%m-%d_%H:%M:%S.%N')-${i}\"}" & date; done;

```
## Run local openapis
> Review ***openapi.yaml*** and uncomment python host for "localhost:8080" or "endpoints-dot-www-eaga.appspot.com" and protocol http/https

```bash
# Run swagger port 8081
docker run --rm --name swagger-ui -p 8081:8080 -e SWAGGER_JSON=/foo/openapi.yaml -v "$(pwd)":/foo swaggerapi/swagger-ui
```

## Deploy openapis
```bash
gcloud endpoints services deploy openapi.yaml --project="${PROJECT}";
```
