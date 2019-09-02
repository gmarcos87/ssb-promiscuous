# ssb-promiscuous
This plugin makes all the local instances to be automatically befriended and synchronize their feeds.
It is used in conjunction with *ssb-lan* and *ssb-friends* and doesn't need much more than to be included in the list of plugins to use.

```js
var CreateSBot = SecretStack()
 .use(require('ssb-db'))
 .use(require('ssb-conn'))
 .use(require('ssb-lan'))))
 .use(require('ssb-replicate'))
 .use(require('ssb-friends'))
 .use(require('ssb-promiscuous'))
```