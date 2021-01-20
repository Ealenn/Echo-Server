---
layout: default
title: Helm
parent: Quick-Start
nav_order: 5
---
# Helm
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Repository

This chart repository can be added to `helm` with

```sh
helm repo add ealenn https://ealenn.github.io/charts
helm repo update
```

More information on [Artifact Hub](https://artifacthub.io/packages/helm/ealenn/echo-server)

## Deploy

```sh
helm upgrade -i ${name} ealenn/echo-server --namespace ${namespace} --force
```

> *Example: `helm upgrade -i echo-server ealenn/echo-server --namespace echo-server --force`*

### Chart Values

You can override values with [example.values.yaml](https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml) file

```bash
curl https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml \
  --output ./example.values.yaml
```

{% capture code %}
{% highlight yaml linenos %}
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
{% endhighlight %}
{% endcapture %}
{% include fix_linenos.html code=code %}
{% assign code = nil %}

```bash
helm upgrade -i \
  -f ./example.values.yaml \
  echo-server ealenn/echo-server \
  --namespace echo-server \
  --force
```

## Ingress Controller

You can use **Nginx Ingress Controller** for try Echo-Server with :

```sh
helm install stable/nginx-ingress --name nginx --namespace nginx
```

## Examples

{% include_relative includes/section-examples.md host="echo.cluster.local" %}