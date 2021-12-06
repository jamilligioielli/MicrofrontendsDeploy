import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// the container will always show itself imediately, so
// it doesn't need a mount function
ReactDOM.render(<App />, document.querySelector('#root'))
