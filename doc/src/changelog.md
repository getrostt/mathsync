---
layout: default
title: Changelog
---

# Pipe

* refine design to get back pre-`0.4.x` symmetry (prevent the need for implementing both a summarizer and a resolver)
* ProtocolBuffer serialization
* difference view indexed by key (allows to view updates in a different collection)

# On the road to 0.6.0

* seed bucket selector
* rework addition of many items at a time in a summary, not to have to extend all summaries every time a new type is needed
* rework library layout in javascript (group related summarizer and resolver, put each in a dedicated npm module)

# 0.5.0

* summarizer and resolver from node streams
* iterator manipulation no longer handles promises, asynchronous streaming is to be handled using node streams
* remove deprecated method `Summary#minus(Summary)` (both in java and javascript) and the resolver which relied on it

# 0.4.0

* remove small summary generation from larger ones (concept is too weak)
* deprecate general summary substraction (concept is too weak - will be replaced on a case by case basis)
* rationalize javascript packages into a single one
* use ES6 syntax for promises

# 0.3.x

# 0.3.1

* fix dependency issue in javascript code

## 0.3.0

* performance improvements by batching summary updates
* handle version `0.7.3` of [Rusha](https://github.com/srijs/rusha)

# 0.2.0

* String serialization
* java and javascript interoperability with integration tests

# 0.1.0

* java and javascript libraries not interoperating
