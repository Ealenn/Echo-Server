---
layout: default
title: Docker-Compose
parent: Quick-Start
nav_order: 3
---
# Docker-Compose
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Run

```yaml
version: "3"
services:
  echo-server:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    ports:
      - 3000:80
```

```sh
➜ docker-compose up -d
➜ curl -I localhost:3000
HTTP/1.1 200 OK
```

## Configuration

You can use environment variables [More information](https://ealenn.github.io/Echo-Server/pages/configuration)

```yaml
version: "3"
services:
  echo-server:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    environment:
      - ENABLE__ENVIRONMENT=false
    ports:
      - 3000:80
```

## Loggers

[More information](https://ealenn.github.io/Echo-Server/pages/configuration/loggers)

### Seq

```yaml
version: "3"
services:
  # ----------------------------------
  # ECHO-SERVER
  # ----------------------------------
  echo:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    restart: unless-stopped
    environment:
      PORT: 80
      LOGS__SEQ__ENABLED: "true"
      LOGS__SEQ__SERVER: "http://seq:5341"
    ports:
      - 3000:80

  # ----------------------------------
  # SEQ
  # ----------------------------------
  seq:
    image: datalust/seq:latest
    restart: unless-stopped
    environment:
      ACCEPT_EULA: "Y"
    ports:
      - 3010:80
```

> - Echo-Server : [http://localhost:3000](http://localhost:3000)
> - Seq : [http://localhost:3010](http://localhost:3010)

### ELK

```conf
# ./logstash/logstash.conf
input {
  tcp {
    port => 8089
  }
}

output {
  elasticsearch { hosts => ["elasticsearch:9200"] }
}
```

```yaml
version: "3"
services:
  # ----------------------------------
  # ECHO-SERVER
  # ----------------------------------
  echo:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    restart: unless-stopped
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://localhost:8089"
    environment:
      - "LOGS__FORMAT=object"
    depends_on:
      - logstash
    ports:
      - 3000:80

  # ----------------------------------
  # ELK
  # ----------------------------------
  elasticsearch:
    image: elasticsearch:7.7.0
    hostname: elasticsearch
    restart: unless-stopped
    environment:
      - "discovery.type=single-node"
  kibana:
    image: kibana:7.7.0
    hostname: kibana
    restart: unless-stopped
    depends_on:
      - elasticsearch
    ports:
      - 3010:5601
  logstash:
    image: logstash:7.7.0
    hostname: logstash
    restart: unless-stopped
    volumes:
      - ./logstash:/usr/share/logstash/pipeline/
    depends_on:
      - elasticsearch
    ports:
      - 8089:8089
```

> - Echo-Server : [http://localhost:3000](http://localhost:3000)
> - Kibana : [http://localhost:3010](http://localhost:3010)

## Examples

{% include_relative includes/section-examples.md host="localhost:3000" %}