var pull = require("pull-stream");
var ma = require("multiserver-address");

function addressToKey(address){
    return `@${ma.decode(address).map(data => data[1].data[0])[0]}.ed25519`;
}

module.exports = {
    name: "promiscuous",
    version: "1.0.0",
    manifest: {
    },
    init: (api) => {
      pull(
        api.lan.discoveredPeers(),
        pull.drain(({address}) => {
          var remoteKey = addressToKey(address)
          api.conn.remember(address)
          api.friends.isFollowing({ source: api.id, dest: remoteKey }, function(err, value) {
            if (!err && !value) {
              api.publish({
                type: "contact",
                contact: remoteKey,
                following: true
              }, console.log)
            }
          })
        })
      )
      return {}
    }
  }