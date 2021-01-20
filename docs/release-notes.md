---
layout: default
title: Release Notes
has_children: false
nav_order: 10
---

# Release Notes

{% for release in site.github.releases %}
## [{{ release.tag_name }}]({{release.html_url}})

{{ release.body }}

[![](https://img.shields.io/badge/Download-TAR-green?style=flat-square&logo=github)]({{release.tarball_url}})
[![](https://img.shields.io/badge/Download-ZIP-green?style=flat-square&logo=github)]({{release.zipball_url}})
[![](https://img.shields.io/badge/View-GitHub-lightgrey?style=flat-square&logo=github)]({{release.html_url}})
[![](https://img.shields.io/badge/View-Docker-blue?style=flat-square&logo=docker)](https://hub.docker.com/r/ealen/echo-server/tags?page=1&ordering=last_updated&name={{release.tag_name}})

{% endfor %}