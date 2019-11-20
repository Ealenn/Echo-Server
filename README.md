# Kubernetes Echo-Server

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

## Docker Echo-Server ([latest](https://hub.docker.com/r/ealen/echo-server))

```sh
docker run -p 8080:80 -e PORT=80 ealen/echo-server
```

---

## Local development 

### Push the Helm chart package

```sh
cd ./docs
helm package ../charts/*
helm repo index --url https://ealenn.github.io/Echo-Server .
```