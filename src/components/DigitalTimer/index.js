// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {min: 25, sec: 0, toggle: false, c: 1}

  onIncrement = () => {
    const {c, sec} = this.props
    if (c === 1 && sec === 0) {
      this.setState(prevState => ({min: prevState.min + 1}))
    }
  }

  onDecrement = () => {
    this.setState(prevState => ({min: prevState.min - 1}))
  }

  onStart = () => {}

  ontoggleChange = () => {
    const {toggle} = this.state
    this.setState({toggle: !toggle})
    if (toggle === false) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      this.timerId = clearInterval(this.timerId)
    }
  }

  tick = () => {
    const {c, sec} = this.state
    this.setState({sec: 59 - c})
    this.setState(prevState => ({c: prevState.c + 1}))
    console.log(c)
    console.log(sec)
    if (sec <= 0) {
      this.setState({sec: 59})
      this.setState(prevState => ({min: prevState.min - 1}))
      this.setState({c: 1})
    }
  }

  resetTimer = () => {
    this.timerId = clearInterval(this.timerId)
    this.setState({min: 25})
    this.setState({sec: 0})
    this.setState({c: 1})
  }

  render() {
    const {min, sec, toggle} = this.state

    const second = sec > 9 ? `${sec}` : `0${sec}`
    const minute = min

    const imgUrl = toggle
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const text = toggle ? 'Pause' : 'Start'

    const cardDescription = toggle ? 'Running' : 'Paused'

    const alttext = toggle ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="contents">
          <div className="left-content">
            <div className="card">
              <h1 className="time">
                {minute}:{second}
              </h1>
              <p className="des">{cardDescription}</p>
            </div>
          </div>
          <div className="right-content">
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={this.ontoggleChange}
              >
                <img src={imgUrl} alt={alttext} className="icon" />
                <h1 className="btn-des">{text}</h1>
              </button>
              <button type="button" className="btn" onClick={this.resetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <h1 className="btn-des">Reset</h1>
              </button>
            </div>
            <p className="des">Set Timer Limit</p>
            <div className="btn-container">
              <button
                type="button"
                className="incredecre"
                onClick={this.onDecrement}
              >
                <h1>-</h1>
              </button>
              <div className="count-card btn-hover color-1">
                <p>{minute}</p>
              </div>
              <button
                type="button"
                className="incredecre"
                onClick={this.onIncrement}
              >
                <h1>+</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
