module.exports.notifyClients = function(message) {
  console.log("broadcasting");

  for (let client of this.clients) {
    client.send(JSON.stringify(message));
  }
};
