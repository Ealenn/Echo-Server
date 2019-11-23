---
layout: default
title: Docker
nav_order: 2
---
# Docker

![cli docker](./assets/images/docker.gif)

## Run Echo-Server

```sh
docker run -d \
    -p 3000:80 \
    ealen/echo-server
```

You can use environments variables with `-e ENV_NAME=VALUE` or CLI arguments after image's name `ealen/echo-server --arg value`

### Example

- **With environments variables:**

```sh
docker run -d \
    -p 3000:80 \
    -e ENABLE__ENVIRONMENT=false
    ealen/echo-server
```

- **With CLI arguments:**

```sh
docker run -d \
    -p 3000:80 \
    ealen/echo-server --enable:environment false
```

## Tests

{% include_relative pages/tests.md %}

---

{% include_relative pages/configuration.md %}
