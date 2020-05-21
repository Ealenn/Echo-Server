---
layout: default
title: Documentation
has_children: true
nav_order: 1
---

# Echo-Server / Docker / Kubernetes / Helm

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/echo-server?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/Echo-Server)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/issues)
[![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)
[![DockerHub](https://img.shields.io/badge/SIZE-%3C%2030%20MB-1488C6?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)

An echo server is a server that replicates the request sent by the client and sends it back.

![docker](https://ealenn.github.io/Echo-Server/assets/images/docker.png)

Available:

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables
- Control via Headers/Query

Docker OS/ARCH : linux/amd64 - linux/arm/v6 - linux/arm/v7 - linux/arm64 - linux/386

## Table of contents

- [Docker](/pages/docker.html) : Use docker container
- [Docker-Compose](/pages/docker-compose.html) : Integration in docker-compose
- [Kubernetes](/pages/kubernetes.html) Deploy with `kubectl`
- [Helm](/pages/helm.html) Use `echo-server` helm repository and override values

{% include_relative pages/includes/section-configuration.md %}

{% include_relative pages/includes/section-tests.md %}
