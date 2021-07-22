function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* Quotes */

const APIcamperbot = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// an object containing a property containing an arrrow of objects containing two properties : quote and author.

// another API
//const APInatebass = "https://gist.github.com/natebass/b0a548425a73bdf8ea5c618149fe1fce";
// an arrrow of objects containing two properties : quote and author.

// another API
//const APItypefit = "https://type.fit/api/quotes";
// an arrrow of objects containing two properties : text and author.


/* colors */

/* Material Design color palettes --> accessibility with white background and text color */
var colors = [
'#D50000', /* Red A700 */
'#AA00FF', /* Purple A700 */
'#6200EA', /* Deep purple  A700 */
'#304FFE', /* Indigo A700 */
'#2962FF', /* Blue A700 */
'#2E7D32', /* Green 800 */
'#DD2C00', /* Deep orange A700 */
'#5D4037', /* Brown 700 */
'#757575', /* Gray 600 */
'#546E7A' /* Blue Gray 600 */];


/* Components */

class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "getQuote",
















    () => {
      axios.get(APIcamperbot).
      then(res => {
        //console.log(res)
        let data = res.data.quotes;
        //console.log(data)
        let randomQuote = data[Math.floor(Math.random() * data.length)];
        this.setState({
          quote: randomQuote['quote'],
          author: randomQuote['author'] });

      }).
      catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    });_defineProperty(this, "handleColor",

    () => {
      //random color
      let color = colors[Math.floor(Math.random() * colors.length)];
      // To be sure the colour change each time the button is clicked. 
      while (color == this.state.color) {
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      this.setState({
        currentColor: color });

    });_defineProperty(this, "handleNewQuote",

    () => {
      this.getQuote();
      this.handleColor();
      document.getElementById('app').style.backgroundColor = this.state.currentColor;
      document.getElementById('quote-box').style.color = this.state.currentColor;
      document.getElementById('tweet-quote').style.backgroundColor = this.state.currentColor;
      document.getElementById('new-quote').style.backgroundColor = this.state.currentColor;
    });this.state = { isloaded: false, error: null, quote: "", author: "", currentColor: 'darkgrey', fccProject: "https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-random-quote-machine", codepenView: "https://codepen.io/s-manguy", plainVersion: "https://codepen.io/s-manguy/full/QWdVaNP", bootstrapVersion: "https://codepen.io/s-manguy/full/rNjqXWB", reactVersion: "https://codepen.io/s-manguy/full/YzNRXRg" };} /* Methods */

  /* Lifecycle methods */
  componentDidMount() {
    this.handleNewQuote();
  }

  /* render to screen */
  render() {
    /* JavaScript */
    const { quote, author } = this.state;

    const tweetURL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote}" - ${author}`;


    return /*#__PURE__*/(
      React.createElement("div", { id: "app", className: "container-fluid d-flex flex-column justify-content-center" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col wrapper d-flex justify-content-center align-content-center" }, /*#__PURE__*/
      React.createElement("div", { className: "row justify-content-center" }, /*#__PURE__*/
      React.createElement("div", { className: "col", style: { maxWidth: 500 } }, /*#__PURE__*/
      React.createElement("div", { id: "quote-box", className: "bg-white p-4 rounded" }, /*#__PURE__*/
      React.createElement("figure", null, /*#__PURE__*/
      React.createElement("blockquote", { class: "box_quote--text text-center" }, /*#__PURE__*/
      React.createElement("p", { className: "text-center" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-quote-left ms-3 m-3 align-text-bottom" }), /*#__PURE__*/React.createElement("span", { id: "text" }, quote))), /*#__PURE__*/

      React.createElement("figcaption", { class: "text-right box_quote--author" }, "- ", /*#__PURE__*/
      React.createElement("cite", { id: "author", title: "Source Title" }, author))), /*#__PURE__*/



      React.createElement("div", { className: "d-flex justify-content-between" }, /*#__PURE__*/
      React.createElement("a", { id: "tweet-quote", className: "btn btn-primary btn-lg", role: "button", href: tweetURL, target: "_top", title: "Tweet this quote!" }, /*#__PURE__*/React.createElement("i", { className: "fab fa-twitter" })), /*#__PURE__*/
      React.createElement("button", { id: "new-quote", className: "btn btn-primary btn-lg", onClick: this.handleNewQuote }, "New quote"))), /*#__PURE__*/


      React.createElement(Footer, { fccProject: this.state.fccProject, codepenView: this.state.codepenView, plainVersion: this.state.plainVersion, bootstrapVersion: this.state.bootstrapVersion, reactVersion: this.state.reactVersion })))))));






  }}
;

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col" }, /*#__PURE__*/
      React.createElement("footer", { className: "footer mx-auto mt-5 text-center" }, "This Random Quote Machine is a ", /*#__PURE__*/React.createElement("a", { href: this.props.fccProject, target: "_blank" }, "FCC Front-end project"), /*#__PURE__*/React.createElement("br", null), "by ", /*#__PURE__*/
      React.createElement("a", { href: this.props.codepenView, target: "_blank" }, "Sandrine MANGUY"), ".", /*#__PURE__*/React.createElement("br", null), "This version uses ", /*#__PURE__*/
      React.createElement("strong", null, "React & Bootstrap"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "View the other versions of this project", /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("a", { class: "view", href: this.props.plainVersion, target: "_blank" }, "HTML/scss/jQuery "), " - ", /*#__PURE__*/React.createElement("a", { class: "view", href: this.props.bootstrapVersion, target: "_blank" }, "HTML/Bootstrap/jQuery ")))));





  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));