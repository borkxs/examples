module.exports = {
  "entry": {
    "client": "./src/client.js",
    "worker": "./src/worker.js"
  },
  "output": {
    "filename": "./build/[name].js",
    "publicPath": "./"
  },
  devServer: {
    clientLogLevel: "none",
    quiet: true,
    inline: true,
    hot: true,
    hotOnly: true
    // warn: true,
  }
}
