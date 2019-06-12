```bash
git clone https://github.com/poxstone/gcp-app-serv.git;
cd gcp-app-serv;
```

google dns
```bash
declare -A IPLIST;
IPLIST=(
        [1]="0.0.0.0"
        [2]="0.0.0.0"
        [3]="0.0.0.0"
        );

for key in ${!IPLIST[@]};do
  echo "${key}. ${IPLIST[$key]}";
  myip="${IPLIST[$key]}";
  gcloud dns --project=steam-boulevard-212521 record-sets transaction start --zone=gcp-poxstone-xyz;
  gcloud dns --project=steam-boulevard-212521 record-sets transaction add ${myip} --name=k8-${key}.k8.poxstome.xyz. --ttl=30 --type=A --zone=gcp-poxstone-xyz;
  gcloud dns --project=steam-boulevard-212521 record-sets transaction execute --zone=gcp-poxstone-xyz;
done;

```