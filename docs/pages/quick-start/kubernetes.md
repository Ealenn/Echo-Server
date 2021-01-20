---
layout: default
title: Kubernetes
parent: Quick-Start
nav_order: 4
---
# Kubernetes
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Deploy

![](https://img.shields.io/badge/K8S-1.19+-blue?style=flat-square&logo=kubernetes)


### Definition

```sh
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml > echo.kube.yaml
```

or customize directly [this definition](https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml)

This kube definition:

- Creates namespace
- Creates deployment with `5` replicas
- Creates Ingress with `kubernetes.io/ingress.class: nginx` annotation

### Run

```sh
kubectl apply -f ./echo.kube.yaml
```

## Ingress Controller

You can use an **Nginx Ingress Controller** [More information](https://kubernetes.github.io/ingress-nginx/deploy/)

## Examples

{% include_relative includes/section-examples.md host="echo.cluster.local" %}