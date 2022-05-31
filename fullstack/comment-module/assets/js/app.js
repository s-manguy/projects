// Below React imports to uncomment if <CommentsElement />
// is a react component instead of a custom element.
// import React from "react";
// import ReactDOM from "react-dom";

// loads the stylesheet file
import '../scss/app.scss'

// loads the Bootstrap jQuery plugins
import 'bootstrap-sass/assets/javascripts/bootstrap/transition.js'
import 'bootstrap-sass/assets/javascripts/bootstrap/alert.js'
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse.js'
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js'
import 'bootstrap-sass/assets/javascripts/bootstrap/modal.js'
import 'jquery'

// loads the code syntax highlighting library
import './highlight.js'

// Creates links to the Symfony documentation
import './doclinks.js'

// Loads the Customs Elements
import './comments/Index.jsx'

// Use the below ReactDOM.render() when using the ./comments/Comment.jsx
// first solution to attach react component
// import CommentsElement from "./comments/Comment.jsx";
// ReactDOM.render(<CommentsElement />, document.getElementById("post-comments"));
