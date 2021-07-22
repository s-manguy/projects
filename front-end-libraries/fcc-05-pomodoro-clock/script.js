const projectName = "25 + 5 Clock";



// COMPONENTS
class TimerControl extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "timer-type" }, /*#__PURE__*/
      React.createElement("p", { id: this.props.labelId }, this.props.labelText), /*#__PURE__*/
      React.createElement("div", { className: "time" }, /*#__PURE__*/
      React.createElement("button", {
        id: this.props.decrementId,
        value: "-",
        onClick: this.props.onClick }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-minus" })), /*#__PURE__*/

      React.createElement("div", { id: this.props.lengthId, className: "number" }, this.props.controlLength), /*#__PURE__*/
      React.createElement("button", {
        id: this.props.incrementId,
        value: "+",
        onClick: this.props.onClick }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-plus" })))));




  }}
;


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 300, // 5 minutes in seconds
      sessionLength: 1500, // 25 minutes in seconds
      timerType: "session",
      currentTime: 1500, // 25 minutes in seconds
      timerState: "stopped",
      playPauseButton: "START" };




    this.handleClock = this.handleClock.bind(this);
    this.periodInMinutes = this.periodInMinutes.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.playPause = this.playPause.bind(this);
    this.countDown = this.countDown.bind(this);
    this.alarm = this.alarm.bind(this);

  }

  // display the timer
  handleClock(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  }

  periodInMinutes(timeInSeconds) {
    return timeInSeconds / 60;
  }

  // Set periods length 
  setBreakLength(e) {
    if (this.state.timerState !== "running") {
      if (e.currentTarget.value === "-" && this.state.breakLength > 60) {
        this.setState({
          breakLength: this.state.breakLength - 60,
          playPauseButton: "START" });

        clearInterval(this.timeLeft);
        console.log(this.state.breakLength);
      } else if (e.currentTarget.value === "+" && this.state.breakLength < 3600) {
        this.setState({
          breakLength: this.state.breakLength + 60,
          playPauseButton: "START" });

        clearInterval(this.timeLeft);
        console.log(this.state.breakLength);
      }
    }
  }

  setSessionLength(e) {
    if (this.state.timerState !== "running") {
      if (e.currentTarget.value === "-" && this.state.sessionLength > 60) {
        this.setState({
          sessionLength: this.state.sessionLength - 60,
          currentTime: this.state.sessionLength - 60,
          playPauseButton: "START" });

        clearInterval(this.timeLeft);
        console.log(this.state.sessionLength);
      } else if (e.currentTarget.value === "+" && this.state.sessionLength < 3600) {
        this.setState(state => ({
          sessionLength: this.state.sessionLength + 60,
          currentTime: this.state.sessionLength + 60,
          playPauseButton: "START" }));

        clearInterval(this.timeLeft);
        console.log(this.state.sessionLength);
      }
    }
  }

  //reset
  handleReset() {
    this.setState({
      breakLength: 300,
      sessionLength: 1500,
      timerType: "session",
      currentTime: 1500,
      timerState: "stopped",
      playPauseButton: "START" });

    clearInterval(this.timeLeft);
    this.alarm('off');
    document.getElementById("start_stop").style.backgroundColor = "green";
  }

  playPause() {
    if (this.state.timerState === "stopped") {
      this.countDown();
      this.setState({
        timerState: "running",
        playPauseButton: "STOP" });

      document.getElementById("start_stop").style.backgroundColor = "red";
    } else {
      clearInterval(this.timeLeft);
      this.setState({
        timerState: "stopped",
        playPauseButton: "START" });

      document.getElementById("start_stop").style.backgroundColor = "green";
    }
  }


  countDown() {
    this.timeLeft = setInterval(() => {
      if (this.state.currentTime === 0) {
        clearInterval(this.timeLeft);
        this.alarm("on");
        if (this.state.timerType === "session") {
          this.setState({
            currentTime: this.state.breakLength,
            timerType: "break",
            playPauseButton: "STOP" });

          this.countDown();
        } else {
          this.setState({
            currentTime: this.state.sessionLength,
            timerType: "session",
            playPauseButton: "STOP" });


          this.countDown();
        }
      } else {
        this.setState({
          currentTime: this.state.currentTime - 1,
          playPauseButton: "STOP" });

        console.log(this.state.currentTime);
      }
    }, 1000);
  }

  alarm(action) {
    let getBeep = document.getElementById('beep');
    if (this.state.currentTime === 0 && action === "on") {
      getBeep.play();
    } else if (action === "off") {
      getBeep.pause();
      getBeep.currentTime = 0;
    }
  }


  render() {
    const timeLeft = 0;

    return /*#__PURE__*/(
      React.createElement("div", { className: "pomodoro" }, /*#__PURE__*/
      React.createElement("h1", null, "Pomodoro Clock"), /*#__PURE__*/
      React.createElement("div", { className: "timer-control controls" }, /*#__PURE__*/
      React.createElement(TimerControl, {
        labelText: "Break Length",
        labelId: "break-label",
        decrementId: "break-decrement",
        incrementId: "break-increment",
        lengthId: "break-length",
        controlLength: this.periodInMinutes(this.state.breakLength),
        onClick: this.setBreakLength }), /*#__PURE__*/

      React.createElement(TimerControl, {
        labelText: "Session Length",
        labelId: "session-label",
        decrementId: "session-decrement",
        incrementId: "session-increment",
        lengthId: "session-length",
        controlLength: this.periodInMinutes(this.state.sessionLength),
        onClick: this.setSessionLength })), /*#__PURE__*/


      React.createElement("div", { className: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label", className: "timer-label" },
      this.state.timerType), /*#__PURE__*/

      React.createElement("div", { id: "time-left", className: "timer-timeleft" },
      this.handleClock(this.state.currentTime)), /*#__PURE__*/

      React.createElement("div", { className: "controls" }, /*#__PURE__*/
      React.createElement("button", {
        id: "start_stop",
        className: "start-stop",
        onClick: this.playPause },

      this.state.playPauseButton), /*#__PURE__*/

      React.createElement("button", {
        id: "reset",
        onClick: this.handleReset }, /*#__PURE__*/

      React.createElement("i", { className: "fas fa-sync-alt" })))), /*#__PURE__*/




      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }), /*#__PURE__*/
      React.createElement("br", null)));



  }}
;



ReactDOM.render( /*#__PURE__*/React.createElement(Timer, null), document.getElementById('app'));