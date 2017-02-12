var worker = new Worker("build/worker.js")
var el = document.getElementById("viz")
var throttle = require("lodash").throttle

// listen to worker
worker.onmessage = function(evt) {
  // console.log('evt', evt)
  if (evt.data.error) {
    input.classList.add("error")
    console.error(evt.data.error)
  } else {
    input.classList.remove("error")
    onGraph({ svg: evt.data })
  }
}

// initial value
worker.postMessage(["a"])

// render graph
function onGraph({ svg }) {
  if (el) {
    el.innerHTML = svg
  }
}

var input = document.getElementById("input")
if (input) {
  input.addEventListener("keyup", throttle(e => {
    worker.postMessage([input.value])
    // onGraph({ svg: svg(input.value) })
  }, 500))
  input.focus()
}
