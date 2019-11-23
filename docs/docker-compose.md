---
layout: default
title: Docker-Compose
nav_order: 3
---
# Docker-Compose

## Compose File

```yaml
version: '3'
services:
  echo-server:
    image: ealen/echo-server:latest
    ports:
      - 3000:80
```

### Example

You can use environments variables

```yaml
version: '3'
services:
  echo-server:
    image: ealen/echo-server:latest
    environment:
      - ENABLE__ENVIRONMENT=false
    ports:
      - 3000:80
```

## Run Echo Server

```sh
docker-compose up -d
```

## Tests

{% include_relative pages/tests.md %}

---

{% include_relative pages/configuration.md %}
