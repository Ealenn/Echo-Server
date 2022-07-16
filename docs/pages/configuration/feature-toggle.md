---
layout: default
title: Feature-Toggle
parent: Configuration
nav_order: 1
---

# Feature Toggle

This configuration is used to deactivate some elements in the response.

| Environment                        | Helm                             | CLI                                | Default       |
|------------------------------------|----------------------------------|------------------------------------|---------------|
| ENABLE__HOST                       | application.enable.host          | --enable:host                      | `true`        |
| ENABLE__HTTP                       | application.enable.http          | --enable:http                      | `true`        |
| ENABLE__REQUEST                    | application.enable.request       | --enable:request                   | `true`        |
| ENABLE__COOKIES                    | application.enable.cookies       | --enable:cookies                   | `true`        |
| ENABLE__ENVIRONMENT                | application.enable.environment   | --enable:environment               | `true`        |
| ENABLE__FILE                       | application.enable.file          | --enable:file                      | `true`        |
| ENABLE__HEADER                     | application.enable.header        | --enable:header                    | `true`        |
