---
layout: default
title: Documentation
nav_order: 1
---

# Echo-Server / Docker / Kubernetes / Helm

[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge)](https://github.com/Ealenn/Echo-Server/stargazers) [![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge)](https://github.com/Ealenn/Echo-Server/issues) [![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge)](https://hub.docker.com/repository/docker/ealen/echo-server)

An echo server is a server that replicates the request sent by the client and sends it back.

Available:

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables

## Table of contents

{: .no_toc .text-delta }

- [Docker](/docker.html) : Use docker container
- [Docker-Compose](/docker-compose.html) : Integration in docker-compose
- [Kubernetes](/kubernetes.html) Deploy with `kubectl`
- [Helm](/helm.html) Use `echo-server` helm repository and override values
- [Global Configuration](/configuration.html) Environments variables, CLI arguments...

---

{% include_relative pages/configuration.md %}
