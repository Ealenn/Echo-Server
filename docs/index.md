---
layout: default
title: Documentation
has_children: false
nav_order: 1
---

# Echo-Server / Docker / Kubernetes / Helm

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/echo-server?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/Echo-Server)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/ealenn/echo-server?style=for-the-badge)](https://www.codefactor.io/repository/github/ealenn/echo-server)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/issues)
[![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)
[![DockerHub](https://img.shields.io/badge/SIZE-%3C%2030%20MB-1488C6?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)

An echo server is a server that replicates the request sent by the client and sends it back.

![docker](https://ealenn.github.io/Echo-Server/assets/images/docker.png)

Available:

![](https://img.shields.io/badge/linux-amd64-blue?style=flat-square&logo=docker)
![](https://img.shields.io/badge/linux-arm/v6-blue?style=flat-square&logo=docker)
![](https://img.shields.io/badge/linux-arm/v7-blue?style=flat-square&logo=docker)
![](https://img.shields.io/badge/linux-arm64/v8-blue?style=flat-square&logo=docker)
![](https://img.shields.io/badge/linux-ppc64le-blue?style=flat-square&logo=docker)
![](https://img.shields.io/badge/linux-s390x-blue?style=flat-square&logo=docker)

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Request Headers / Response Headers
- Environment variables
- Control via Headers/Query
- Folders and Files
- Monitoring

## About the project

Echo-Server is &copy; 2019-{{ "now" | date: "%Y" }} by [Rudy Marchandise](https://ealen.dev).

### License

Echo-Server is distributed by an [GNU Lesser General Public License](https://github.com/Ealenn/Echo-Server/blob/master/LICENSE.txt)

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

#### Thank you to the contributors !

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>
