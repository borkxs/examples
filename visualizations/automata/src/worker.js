var regParser = require("automata.js")
var Viz = require("viz.js")

self.onmessage = function (evt) {
  try {
    var result = svg(evt.data[0])
    self.postMessage(result)
  } catch (error) {
    self.postMessage({ error: JSON.stringify(error) })
  }
}

function svg(pattern) {
  var parser = new (regParser.RegParser)(pattern)
  var dfa = parser.parseToDFA()
  return Viz(dfa.toDotScript(), "svg", "dot")
}

