# Faking co

Was following [funfunfunction's video on generators][1] and stopped when he was
about to implement a `co` async generator wrapper look-alike so I could take a
whack at it myself.

```js
coLookAlike(function * getPostTitle() {
  const response = yield fetch(url)
  const post = yield response.json()
  console.log("Title: ", post.title)
})
```

[1]: https://www.youtube.com/watch?v=ategZqxHkz4
