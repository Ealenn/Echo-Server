---
layout: default
title: NodeJS
parent: Quick-Start
nav_order: 1
---
# NodeJS
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Clone repository

```sh
➜ git clone https://github.com/Ealenn/Echo-Server.git
```

Or download source code of latest release [here](https://github.com/Ealenn/Echo-Server/releases/latest)

And install dependencies 

```sh
➜ npm i
```

## Run

```bash
# Run with node
➜ node ./src/webserver --port 8080
# Run with npm script
➜ PORT=8080 npm run start
```

## Configuration

You can use environment variables or CLI arguments [More information](https://ealenn.github.io/Echo-Server/pages/configuration)

- **With environment variables:**

```sh
➜ PORT=8080 npm run start
```

- **With CLI arguments:**

```sh
➜ node ./src/webserver --port 8080 --enable:environment false
```

## Loggers

[More information](https://ealenn.github.io/Echo-Server/pages/configuration/loggers)

```sh
➜ node ./src/webserver \
    --port 8080 \
    --logs:seq:enabled true \
    --logs:seq:server http://localhost:5341
```

## Examples

{% include_relative includes/section-examples.md host="localhost:8080" %}