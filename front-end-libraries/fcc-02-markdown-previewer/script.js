function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // I have tested to sanitize the input text using DOMpurify BUT it that case sanitize the input prevent to parse from MArkdown to HTML --> I do not use DOMpurify in this pen.


const DEFAULTmarkdown = `# Comment écrire en Markdown ?  
## Les titres
---
En html, le titre est noté de h1 à h6. En markdown, il suffit de taper de 1 à 6  \# (altGr + 3) puis un espace et enfin le texte du titre.

Une autre solution pour marques les titres de niveau 1 et 2  est de taper quelques signes  \= sous le titre de niveau 1 et quelques \- sous le titre de niveau 2.

## Les paragraphes
---
Pour insérer un saut de ligne correspondant à la balise, insérer deux espaces à la fin de la ligne.  
Pour créer des paragraphes, séparer le texte de 2 lignes vides.  

## Emphase
___
- *Italique* : placer une \* ou un \_ de chaque côté du texte \(\*texte\* ou \_texte\_\).  
- **Gras** : placer deux \*\* ou deux \_\_ de chaque côté du texte \(\*\*texte\*\* ou \_\_texte\_\_\).
- ***Italique et gras*** : placer trois \*\*\* ou trois \_\_\_ de chaque côté du texte \(\*\*\*texte\*\*\* ou \_\_\_texte\_\_\_\).
- ~~Barré~~ : placer deux \~\~ (altGr + 2 sur clavier azerty) de chaque côté du texte \(\~\~texte\~\~\).

## Les listes
---
### Les listes à puces (trois solutions)
* Taper une étoile suivie d'un espace et le texte de la puce \(\* texte\),  
- Taper un tiret suivi d'un espace et le texte de la puce \(\- texte\),
+ Taper un signe + suivi d'un espace et le texte de la puce \(\+ texte\) 

Les listes à puces peuvent être imbriquées :
* Niveau 1
  * Niveau 2 : saisir 2 espaces devant la puce
* Niveau 1  

### Les Listes à puces numérotées
1. Saisir un numéro (peut importe lequel), un ".", un espace et le texte \(1\. Texte\).
1. Niveau 1
  1. Niveau 2 : saisir 2 espaces devant le numéro pour imbriquer

### Les cases à cocher
[ ] Crochet ouvrant + espace + crocher fermant pour créer la case à cocher.  
[x] Remplace l'espace par un x pour désigner une case cochée par défaut.

## Les citations
---
> Commencer la ligne par le signe supérieur ">" suivi d'un espace.
> > Pour indiquer une réponse à la citation saisir "> " 2 fois à la suite.
> > * Pour insérer une liste à puce, saisir la puce à la suite des caractères indiquant une citation.

## Du code source
---
### Bloc de code
1. Saisir trois accents graves \`\`\` (altGr+7 sur un clavier azerty) suivis du nom du langage employé
2. Saisir le code source sur les lignes suivantes en saisissant 4 espaces ou une tabulation à chaque début de ligne
3. Saisir trois accents graves \`\`\` (altGr+7 sur un clavier azerty) sur une nouvelle ligne.

\`\`\`html
<html>
	<h1>Insérer un bloc de code<h1>
</html>
\`\`\`

### En ligne
En cours de paragraphe, entourer le code d'accents graves \`code\`.

## Les liens
---
Placer le texte du lien entre crochets suivis de l'URL entre parenthèses :
lire cet excellent [cours sur le markdown](https://openclassrooms.com/fr/courses/1304236-redigez-en-markdown).
\`\`\`
[cours sur le markdown](https://openclassrooms.com/fr/courses/1304236-redigez-en-markdown).
\`\`\`

## Les images 
---
![Logo React](https://i.postimg.cc/Bv9y8sBZ/react-logo.png)

Placer un point d'exclamation devant le lien de l'image.
\`\`\`
![Logo React](https://i.postimg.cc/Bv9y8sBZ/react-logo.png)
\`\`\`

## Les tableaux
---
* Les cellules sont séparées par des barres verticales \| (altGr + 6 sur clavier azerty) .
* Pour indiquer qu'il s'agit de lignes de titre, souligner les cellules concernées par des tirets.

## Barre de séparation (trois solutions)
---
* Saisir au minimum trois \* à la suite.
* Saisir au minimum trois \* à la suite.
* Saisir au minimum trois \_ à la suite.

## Séparer des blocs
Pour insérer un espace entre deux blocs, taper sur la touche "Entrée" n'a aucun effet.
La solution est de mettre un commentaire vide entre les deux blocs.

Ligne 1
<!-- -->
Ligne 2


## Les caractères spéciaux : \* \- \(\) \[\] \. \! \# \`\\
---
Pour utiliser les caractères spéciaux dans leur sens premier, les faire précéder d'une barre oblique (altGr + 8 sur le clavier azerty). 
`;

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "row mt-5" }, /*#__PURE__*/
      React.createElement("div", { className: "col text-center link-secondary pb-4" }, "Cet \xE9diteur Markdown avec aper\xE7u est un ", /*#__PURE__*/
      React.createElement("a", { href: this.props.fccProject }, "projet Librairie Front-end"), " de freeCodeCamp", /*#__PURE__*/React.createElement("br", null), "R\xE9alisation ", /*#__PURE__*/
      React.createElement("a", { href: this.props.codepen }, "Sandrine MANGUY"))));



  }}
;

class App extends React.Component {
  constructor(props) {var _temp;
    (_temp = super(props), _defineProperty(this, "handleChange",







    event => {
      this.setState({
        markdown: event.target.value });

    }), _temp), this.state = { markdown: DEFAULTmarkdown, fccProject: 'https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer', codepen: "https://codepen.io/s-manguy/" };} //methods

  render() {
    const editorStyle = {
      backgroundColor: "#616161", // Material design Grey 700 - Primary
      color: "white",
      width: "100%", // the textarea default with is not wide enough to cover the editor width.
      height: "70vh" };


    const previewStyle = {
      height: "70vh",
      backgroundColor: "#f5f5f5" //Material Design Grey 100 - Secondary
    };

    const containerStyle = {
      height: '100vh',
      maxWidth: '1200px',
      color: "#373737" //Material design Primary Dark
    };

    return /*#__PURE__*/(
      React.createElement("div", { className: "container-fluid d-flex flex-column", style: containerStyle }, /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-12" }, /*#__PURE__*/
      React.createElement("h1", { className: "mt-5 text-center" }, "Editeur ", /*#__PURE__*/React.createElement("strong", null, "Markdown")))), /*#__PURE__*/



      React.createElement("div", { className: "row mt-3 justify-content-center" }, /*#__PURE__*/
      React.createElement("div", { className: "col-10 col-lg-6" }, /*#__PURE__*/

      React.createElement("div", { className: "col text-center mb-4 mt-3" }, /*#__PURE__*/
      React.createElement("h2", null, /*#__PURE__*/React.createElement("strong", null, "Ecrivez"), " en markdown")), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement("textarea", { id: "editor", className: "editor me-auto ms-auto p-4", value: this.state.markdown, onChange: this.handleChange, style: editorStyle }))), /*#__PURE__*/



      React.createElement("div", { className: "col-10 col-lg-6" }, /*#__PURE__*/
      React.createElement("div", { className: "col text-center mb-4 mt-3" }, /*#__PURE__*/
      React.createElement("h2", { className: "text-center" }, /*#__PURE__*/React.createElement("strong", null, "Visualisez"), " le rendu")), /*#__PURE__*/

      React.createElement("div", { id: "preview", className: "viewer me-auto ms-auto p-4 border border-secondary overflow-auto", style: previewStyle, dangerouslySetInnerHTML: { __html: marked(this.state.markdown, { gfm: true, breaks: true }) } }))), /*#__PURE__*/


      React.createElement(Footer, { fccProject: this.state.fccProject, codepen: this.state.codepen })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));