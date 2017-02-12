const worker = new Worker("build/worker.js")
const el = document.getElementById("viz")

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
worker.postMessage(["abc"])

// render graph
function onGraph({ svg }) {
  if (el) {
    requestAnimationFrame(() => {
      el.innerHTML = svg
    })
  }
}

const input = document.getElementById("input")
const handleInput = e => {
    worker.postMessage([input.value])
  }
if (input) {
  input.addEventListener("keyup", handleInput)
  input.focus()
}
