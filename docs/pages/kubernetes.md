---
layout: default
title: Kubernetes
parent: Documentation
nav_order: 4
---
# Kubernetes

## Deploy Echo-Server with Kubectl

```sh
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml | kubectl apply -f -
```

This kube definition:

- Creates namespace `echoserver`
- Creates `echoserver` deployment with `5` replicas
- Creates Ingress with `kubernetes.io/ingress.class: nginx` annotation

You can use an **Nginx Ingress Controller**:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
```

Or customize directly this deployment:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: echoserver
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: echoserver
  namespace: echoserver
spec:
  replicas: 5
  template:
    metadata:
      labels:
        app: echoserver
    spec:
      containers:
      - image: ealen/echo-server:latest
        imagePullPolicy: IfNotPresent
        name: echoserver
        ports:
        - containerPort: 80
        env:
        - name: PORT
          value: "80"
---
apiVersion: v1
kind: Service
metadata:
  name: echoserver
  namespace: echoserver
spec:
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
  type: ClusterIP
  selector:
    app: echoserver
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: echoserver
  namespace: echoserver
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: echoserver.cluster.local
      http:
        paths:
          - path: /echo
            backend:
              serviceName: echoserver
              servicePort: 80
```

{% include_relative includes/section-configuration.md %}

---

{% include_relative includes/section-tests.md %}
