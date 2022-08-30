import React from "react";
import PropTypes from "prop-types";

export default class CountdownTimer extends React.PureComponent {
  constructor(props) {
    super();
    this.state = { time: {}, seconds: props.seconds };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let minutes = Math.floor(secs / 60);
    if (minutes.toString().length === 1)
      minutes = '0' + minutes;
    let divisor_for_seconds = secs % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    if (seconds.toString().length === 1)
      seconds = '0' + seconds;

    return {
      "m": minutes,
      "s": seconds
    };
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
        {this.state.seconds === 0 && 'Акция закончилась!'}
        {this.state.seconds !== 0 && this.state.time.m + ':' + this.state.time.s}
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  seconds: PropTypes.number
};
