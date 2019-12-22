---
layout: default
title: Helm
nav_order: 5
---
# Deploy Echo-Server with Helm

## Adding the Repository

This chart repository can be added to `helm` via

```sh
helm repo add ealenn https://ealenn.github.io/charts
helm repo update
```

[https://ealenn.github.io/helm-ui/#/chart/echo-server](https://ealenn.github.io/helm-ui/#/chart/echo-server)

## Deploy Echo-Server with helm

```sh
helm upgrade -i ${name} ealenn/echo-server --namespace ${namespace} --force
```

> *Example: `helm upgrade -i echoserver ealenn/echo-server --namespace echoserver --force`*

You can override values with [example.values.yaml](https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml) file

### *Example*

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

  application:
    logs:
      ignore:
        ping: true
```

```bash
curl https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml --output ./example.values.yaml

helm upgrade -i -f ./example.values.yaml echoserver ealenn/echo-server --namespace echoserver --force
```

You can use **Nginx Ingress Controller** for try Echo-Server with :

```sh
helm install stable/nginx-ingress --name nginx --namespace nginx
```

---

{% include_relative pages/configuration.md %}
