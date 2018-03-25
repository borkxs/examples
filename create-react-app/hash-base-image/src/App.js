import React, { Component } from "react"
import "./App.css"

const INITIAL = `{
  "dataSets": [{
    "color": "white",
    "data": [{"x": 10, "y": 10}, {"x": 20, "y": 30}, {"x": 40, "y": 10}]
  }]
}`

class App extends Component {
  state = { json: INITIAL }

  render() {
    try {
      var hash = btoa(JSON.stringify(JSON.parse(this.state.json)))
    } catch (e) {
      hash = "ERROR: BAD ENTRY"
    }
    const url = `http://react-component-as-a-service.herokuapp.com/chart/${hash}.png`

    return (
      <div className="App">
        <p>json:</p>
        <p>
          <textarea
            className="App-textarea"
            type="text"
            value={this.state.json}
            onChange={evt => this.setState({ json: evt.target.value })}
          />
        </p>
        <p>hash: {hash}</p>
        <p>url: {url}</p>
        <p>
          <img src={url} alt="" width="600" height="400" />
        </p>
      </div>
    )
  }
}

export default App
