---
layout: default
title: Loggers
parent: Configuration
nav_order: 2
---

# Loggers
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Standard Streams

| Environment                        | CLI                                | Default            |
|------------------------------------|------------------------------------|--------------------|
| LOGS__IGNORE__PING                 | --logs:ignore:ping                 | `false`            |
| LOGS__APP                          | --logs:app                         | `echo-server`      |
| LOGS__LEVEL                        | --logs:level                       | `debug`            |

## Seq

![seq](/assets/images/seq.png)

| Environment                        | CLI                                | Default            |
|------------------------------------|------------------------------------|--------------------|
| LOGS__SEQ__ENABLED                 | --logs:seq:enabled                 | `false`            |
| LOGS__SEQ__SERVER                  | --logs:seq:server                  | ` `                |
| LOGS__SEQ__KEY                     | --logs:seq:key                     | ` `                |
| LOGS__SEQ__LEVEL                   | --logs:seq:level                   | `info`             |
