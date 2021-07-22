function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const projectName = "drum-machine";

const soundsBank = [
{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },

{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },

{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },

{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];




/* Pad active/inactive style */

const inactivePad = {
  backgroundColor: '#616161',
  fontSize: '3rem',
  textAlign: 'left',
  verticalAlign: 'middle',
  paddingLeft: '1rem' };


const activePad = {
  backgroundColor: '#2e2e2e',
  border: "thin solid #fff",
  fontSize: '5rem',
  textAlign: 'center',
  verticalAlign: 'middle',
  paddingLeft: 0 };



/* components */

class DrumPad extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleStyle",






    () => {
      if (this.state.padStyle == inactivePad) {
        this.setState({
          padStyle: activePad });

      } else {
        this.setState({
          padStyle: inactivePad });

      }
    });_defineProperty(this, "playSound",

    () => {
      this.handleStyle();
      setTimeout(() => this.handleStyle(), 800);
      const sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      sound.play();
      this.props.updateDisplay(this.props.id.replace(/-/g, ' '));
    });_defineProperty(this, "handleKeyPress",


    e => {
      if (e.keyCode === this.props.keyCode) {
        this.handleStyle;
        this.playSound();
      }
    });this.state = { padStyle: inactivePad };} /* methods */

  /* Lifecycle */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        keyCode: this.props.keyCode,
        id: this.props.id,
        role: "button",
        onClick: this.playSound,
        style: this.state.padStyle,
        soundVolume: this.props.volumeValue }, /*#__PURE__*/

      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.url }),

      this.props.keyTrigger));


  }}
;


class DrumsSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundList: soundsBank };

  }

  render() {
    const items = this.props.soundList.map((item, index) => /*#__PURE__*/
    React.createElement(DrumPad, {
      key: item.index,
      keyCode: item.keyCode,
      keyTrigger: item.keyTrigger,
      id: item.id,
      url: item.url,
      soundVolume: this.props.volumeValue,
      updateDisplay: this.props.updateDisplay,
      clearDisplay: this.props.clearDisplay }));


    /* In that case, I use the index because the items order in the array is always the same */
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-pad_set" }, items));
  }}
;



class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("footer", { className: "footer" }, "This Drum Machine is a ", /*#__PURE__*/React.createElement("a", { href: this.props.fccProject, target: "_blank" }, "FCC Front-end project"), /*#__PURE__*/React.createElement("br", null), "by ", /*#__PURE__*/
      React.createElement("a", { href: this.props.codepenView, target: "_blank" }, "Sandrine MANGUY"), ".", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Have a look to the ", /*#__PURE__*/
      React.createElement("a", { href: "https://codepen.io/s-manguy/full/JjEQYVN", target: "_blank" }, " plain JavaScript"), " version!", /*#__PURE__*/React.createElement("br", null), "Have a look to the ", /*#__PURE__*/
      React.createElement("a", { href: "https://codepen.io/s-manguy/pen/NWpKNGP", target: "_blank" }, "jQuery"), " version!"));


  }}
;



class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "displaySoundName",









    name => {
      this.setState({
        display: name });

      setTimeout(() => this.clearDisplay(), 1300);
    });_defineProperty(this, "clearDisplay",

    () => {
      this.setState({
        display: String.fromCharCode(160) });

    });_defineProperty(this, "handleVolume",

    event => {
      this.setState({
        volumeValue: event.target.value,
        display: 'Volume: ' + Math.round(event.target.value * 100) });

      setTimeout(() => this.clearDisplay(), 1300);
    });this.state = { soundList: soundsBank, display: String.fromCharCode(160), // if void, the display disappears
      volumeValue: 0.2, fccProject: 'https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-drum-machine', codepenView: 'https://codepen.io/s-manguy' };}
  render() {
    // Javascript
    const { soundList, volumeValue } = this.state;

    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.volumeValue;
    });

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/

      React.createElement("div", { id: "drum-machine", className: "container" }, /*#__PURE__*/

      React.createElement("h1", { className: "heading" }, "Drum Machine"), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/




      React.createElement("p", { id: "display", className: "control_display" }, this.state.display)), /*#__PURE__*/



      React.createElement(DrumsSet, {
        soundList: soundList,
        updateDisplay: this.displaySoundName,
        clearDisplay: this.clearDisplay }), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "sound" }, /*#__PURE__*/

      React.createElement("i", { class: "fas fa-volume-off" }), /*#__PURE__*/
      React.createElement("label", { class: "visually-hidden", for: "volume" }, "Volume"), /*#__PURE__*/
      React.createElement("input", {
        className: "control_volume",
        type: "range",
        id: "volume",
        min: "0",
        max: "1",
        value: this.volumeValue,
        onChange: this.handleVolume,
        step: "0.01",
        "data-before": true }), /*#__PURE__*/

      React.createElement("i", { class: "fas fa-volume-up" })))), /*#__PURE__*/




      React.createElement(Footer, { fccProject: this.state.fccProject, codepenView: this.state.codepenView })));


  }}
;





ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));