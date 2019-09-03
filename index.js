var pull = require("pull-stream")

var checkedList = []
var waitingTime = 3000

function isChecked(key) {
  if (checkedList[key] && checkedList[key] > Date.now()) return true
  checkedList[key] = Date.now() + waitingTime
  return false
}

module.exports = {
  name: "promiscuous",
  version: "1.0.1",
  manifest: {},
  init: (api) => {
    if (!api.conn) throw new Error('ssb-promiscuous needs ssb-conn to be installed')
    if (!api.friends) throw new Error('ssb-promiscuous needs ssb-friends to be installed')

    pull(
      api.conn.stagedPeers(),
      pull.flatten(),
      pull.drain(([addr, data]) => {
        if (isChecked(data)) return
        api.friends.isFollowing({ source: api.id, dest: data.key }, (err, value) => {
          if (err) return console.error(err)
          if (value === true) return
          follow(data.key)
        })
      })
    )

    return {}

    function follow(feedId, cb = console.log) {
      api.publish({
        type: 'contact',
        contact: feedId,
        following: true
      }, cb)
    }
  }
}
