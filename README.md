Server Start
```bash
ng build entity --watch
```

Server Start 2
```bash
ng serve
```

Build public
```bash
npm run build -- --configuration=production --output-path=./deploy/src
```

Docker Server compose
```bash
docker compose -f ./deploy/compose.yml down
docker compose -f ./deploy/compose.yml -p balance-front up -d
```
Push
```bash
powershell ./deploy/push.sh
```


