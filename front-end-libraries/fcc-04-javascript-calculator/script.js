function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const projectName = 'JavaScript calculator';

const operator = /[+*/-]/;
class Calculator extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "maxDigitLength",








    () => {
      this.setState({
        currentOutput: "Digit Limit",
        previousValue: this.state.currentOutput });

      setTimeout(() => this.setState({ currentOutput: this.state.previousValue }), 1000);
    });_defineProperty(this, "clearAll",

    () => {
      this.setState({
        currentFormula: "",
        currentOutput: "0",
        previousValue: "0" });

    });_defineProperty(this, "handleNumbers",


    e => {
      if (!this.state.currentOutput.includes('Limit'))
      {
        const { currentOutput, currentFormula } = this.state;
        const value = e.target.value;
        if (currentOutput.length > 12) {
          this.maxDigitLength();
        } else if (currentFormula.includes("=")) {
          this.setState({
            currentOutput: value,
            currentFormula: value });

        } else {
          this.setState({
            currentOutput:
            currentOutput === '0' || /[+*/-]/.test(currentOutput) ?
            value :
            currentOutput + value,
            currentFormula:
            currentOutput !== '0' ?
            currentFormula + value :
            value });

        }

      }
    });_defineProperty(this, "handleOperators",


    e => {
      if (!this.state.currentOutput.includes('Limit')) {
        const { currentOutput, currentFormula } = this.state;
        const value = e.target.value;

        if (currentOutput.length > 12) {
          this.maxDigitLength();
        } else if (currentFormula.includes('=')) {
          this.setState({
            currentFormula: this.state.currentOutput + value,
            currentOutput: value });

        } else if (/\d$/.test(currentFormula)) {
          this.setState({
            currentOutput: value,
            currentFormula: this.state.currentFormula + value });

        } else if (/[\+\/\*]$/.test(currentFormula)) {
          this.setState({
            currentOutput: value,
            currentFormula:
            /\-$/.test(currentFormula + value) ?
            currentFormula + value :
            currentFormula.slice(0, -1) + value });

        } else if (/\-$/) {
          let cleanFormula = currentFormula;
          while (/[\+\-\*\/]$/.test(cleanFormula)) {
            cleanFormula = cleanFormula.slice(0, -1);
          }
          this.setState({
            currentOutput: value,
            currentFormula: cleanFormula + value });

        }
      }
    });_defineProperty(this, "handleEquals",


    e => {
      const { currentOutput, currentFormula } = this.state;
      const value = e.target.value;

      this.setState({
        currentOutput: value,
        currentFormula: currentFormula + value });

      const formula = document.getElementById('formula').textContent.slice(0).replace(/[\+\-\*\/]{1,}$/, ''); // slice return a string ; forumla does not contain the last digit ('=') so we can use all the length.

      const calculate = Math.round(100000000 * eval(formula)) / 100000000;
      const result = calculate.toString();
      this.setState({
        currentOutput: result,
        currentFormula: formula + value + calculate });

    });_defineProperty(this, "handleDecimal",



    e => {
      if (!this.state.currentOutput.includes('Limit')) {
        const { currentOutput, currentFormula } = this.state;
        const value = e.target.value;
        if (currentOutput.length > 11) {
          this.maxDigitLength();
        } else if (currentOutput.includes('.')) {
          currentOutput: currentOutput.slice(0, -1);
        } else {
          this.setState({
            currentOutput:
            currentOutput !== '' ?
            currentOutput + value :
            "0" + value,
            currentFormula:
            currentOutput !== '' ?
            currentFormula + value :
            "0" + value });

        }
      }
    });_defineProperty(this, "handleErase",


    () => {
      const { currentOutput, currentFormula } = this.state;
      if (!currentFormula.includes("=")) {
        this.setState({
          currentOutput: currentOutput.slice(0, -1),
          currentFormula: currentFormula.slice(0, -1) });

      }
    });this.state = { currentOutput: "", previousValue: "", currentFormula: "" };} // methods


  render() {
    const { currentOutput, currentFormula } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement("div", { className: "display" }, /*#__PURE__*/
      React.createElement(Formula, {
        currentFormula: currentFormula }), /*#__PURE__*/

      React.createElement(Output, {
        currentOutput: currentOutput })), /*#__PURE__*/


      React.createElement(Buttons, {
        clearAll: this.clearAll,
        handleNumbers: this.handleNumbers,
        handleOperators: this.handleOperators,
        handleDecimal: this.handleDecimal,
        handleEquals: this.handleEquals,
        handleErase: this.handleErase })), /*#__PURE__*/


      React.createElement("div", { className: "footer", role: "contentinfo" }, "this Javascript calculator is", /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("a", { href: "https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator", target: "_blank", title: "User stories" }, "a fCC Front-end Libraries Project"), /*#__PURE__*/React.createElement("br", null), "designed and coded by ", /*#__PURE__*/
      React.createElement("a", { href: "https://codepen.io/s-manguy", target: "_blank", title: "view all the pens" }, "Sandrine MANGUY"))));



  }}
;







class Formula extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "formula",
        className: "formula" },

      this.props.currentFormula));


  }}
;

class Output extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "display",
        className: " output" },

      this.props.currentOutput));


  }}
;

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    //this.state {};
  }
  //methods
  //Lifecycle

  render() {
    //javascript
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", {
        id: "clear",
        className: "btn btn-ac",
        onClick: this.props.clearAll,
        value: "AC" }, "AC"), /*#__PURE__*/



      React.createElement("button", {
        id: "bracket-open",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "(" }, "("), /*#__PURE__*/



      React.createElement("button", {
        id: "bracket-close",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: ")" }, ")"), /*#__PURE__*/



      React.createElement("button", {
        id: "divide",
        className: "btn btn-operator",
        onClick: this.props.handleOperators,
        value: "/" }, "\xF7"), /*#__PURE__*/



      React.createElement("button", {
        id: "seven",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "7" }, "7"), /*#__PURE__*/



      React.createElement("button", {
        id: "eight",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "8" }, "8"), /*#__PURE__*/



      React.createElement("button", {
        id: "nine",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "9" }, "9"), /*#__PURE__*/



      React.createElement("button", {
        id: "multiply",
        className: "btn btn-operator",
        onClick: this.props.handleOperators,
        value: "*" }, "\xD7"), /*#__PURE__*/



      React.createElement("button", {
        id: "four",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "4" }, "4"), /*#__PURE__*/



      React.createElement("button", {
        id: "five",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "5" }, "5"), /*#__PURE__*/



      React.createElement("button", {
        id: "six",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "6" }, "6"), /*#__PURE__*/



      React.createElement("button", {
        id: "subtract",
        className: "btn btn-operator",
        onClick: this.props.handleOperators,
        value: "-" }, "-"), /*#__PURE__*/



      React.createElement("button", {
        id: "one",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "1" }, "1"), /*#__PURE__*/



      React.createElement("button", {
        id: "two",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "2" }, "2"), /*#__PURE__*/



      React.createElement("button", {
        id: "three",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "3" }, "3"), /*#__PURE__*/



      React.createElement("button", {
        id: "add",
        className: "btn btn-operator",
        onClick: this.props.handleOperators,
        value: "+" }, "+"), /*#__PURE__*/



      React.createElement("button", {
        id: "erase",
        className: "btn btn-erase",
        onClick: this.props.handleErase,
        value: "eraseLast" }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-backspace" })), /*#__PURE__*/

      React.createElement("button", {
        id: "zero",
        className: "btn btn-numbers",
        onClick: this.props.handleNumbers,
        value: "0" }, "0"), /*#__PURE__*/



      React.createElement("button", {
        id: "decimal",
        className: "btn btn-numbers",
        onClick: this.props.handleDecimal,
        value: "." }, "."), /*#__PURE__*/



      React.createElement("button", {
        id: "equals",
        className: "btn btn-equals",
        onClick: this.props.handleEquals,
        value: "=" }, "=")));





  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById('app'));