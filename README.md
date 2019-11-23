# Echo-Server / Docker / Kubernetes / Helm

> Read the docs : [https://ealenn.github.io/Echo-Server](https://ealenn.github.io/Echo-Server)
> An echo server is a server that replicates the request sent by the client and sends it back.

Available:

- GET | POST | PUT | PATCH | DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables

## Configuration

| Environment         | Helm                          | CLI                | Default       |
|---------------------|-------------------------------|--------------------|---------------|
| PORT                | service.port                  | --port             | `80`          |
| LOGS__IGNORE__PING  | application.logs.ignore.ping  | --logs:ignore:ping | `false`       |

## Deploy Echo-Server with Helm

### Adding the Repository

This chart repository can be added to `helm` via

```sh
helm repo add echo-server https://ealenn.github.io/Echo-Server
helm repo update
```

### Deploy Echo-Server with helm

```sh
helm upgrade -i ${name} echo-server/echo-server --namespace ${namespace} --force
```

You can override values with [example.values.yaml](https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml) file

Example :
```yaml
replicaCount: 5

ingress:
  enabled: true
  hosts:
    - host: echo.cluster.local
      paths: 
        - /
  annotations:
    kubernetes.io/ingress.class: nginx
```

```sh
curl https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml --output ./example.values.yaml
helm upgrade -i -f ./example.values.yaml echoserver echo-server/echo-server --namespace echoserver --force
```

### Deploy Echo-Server with Kubectl

```sh
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml | kubectl apply -f -
```

## Docker Echo-Server ([latest](https://hub.docker.com/r/ealen/echo-server))

```sh
docker run -p 8080:80 -e PORT=80 ealen/echo-server
```

## Response 

```json
{
    "request": {
        "method": "GET",
        "baseUrl": "",
        "originalUrl": "/",
        "protocol": "http",
        "params": {
            "0": "/"
        },
        "query": {},
        "hostname": "echoserver.cluster.local",
        "ip": "::ffff:172.17.0.7",
        "ips": [],
        "headers": {
            "host": "echoserver.cluster.local",
            "x-request-id": "41130c7f319a6b2b5bce4bc1e00afbbc",
            "x-real-ip": "192.168.99.1",
            "x-forwarded-for": "192.168.99.1",
            "x-forwarded-host": "echoserver.cluster.local",
            "x-forwarded-port": "80",
            "x-forwarded-proto": "http",
            "x-scheme": "http",
            "user-agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "accept-language": "en-GB,en;q=0.5",
            "accept-encoding": "gzip, deflate",
            "dnt": "1",
            "upgrade-insecure-requests": "1"
        }
    },
    "env": {
        "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        "HOSTNAME": "echoserver-55f98b7d9f-grqqx",
        "PORT": "80"
    }
}
```

---

## Local development 

### Push the Helm chart package

```sh
cd ./docs
helm package ../charts/*
helm repo index --url https://ealenn.github.io/Echo-Server .
```