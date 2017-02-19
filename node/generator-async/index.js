const fetch = require("node-fetch")
const co = require("co")

const url = "http://jsonplaceholder.typicode.com/posts/1"

// this is some
function * getPostTitle() {
  const response = yield fetch(url)
  const post = yield response.json()
  console.log("Title: ", post.title)
}

// call both versions
co(getPostTitle)
myCo(getPostTitle)

function myCo(generator) {
  const instance = generator()
  let promise = instance.next().value
  return promise.then(iterate)

  function iterate(result) {
    let next = instance.next(result)
    if (!next.done) {
      promise = next.value
      return promise.then(iterate)
    }
  }
}
