*[see all the front-end libraries projects](https://github.com/s-manguy/projects/tree/main/front-end-libraries)*

# Cafe avec vue, a Vue.js basic website with shopping cart
This **e-shop website** is the **second version** of a project based on the OpenClassrooms course [Créez une application web avec Vue.js](https://openclassrooms.com/fr/courses/6390311-creez-une-application-web-avec-vue-js) written by Alexia Toulmet and Ben Hong.   
[Have a look at the result on a vueJS codepen](https://codepen.io/s-manguy/pen/xxYvYzy)

## Beyond the objectives - what I have improved/added
* added CSS classes to **display the product quantity label and input in block**;
* added CSS classes to **add margin above the "Ajouter au panier" button**;
* added CSS classes to **modify text color depending on the "in stock" or "not in stock" information**;
* added **v-if directive to display the quantity and add button only when the product is in stock**;
* added CSS classes to **improve the buttons aspect**;
* added the **min attribute to the input to prevent user from adding negative numbers to the cart**;
* added a **shopping cart with transition and modal**;
* used **clones** and *Vue.util.extend({}, itemToAdd)* to avoid modifying both original item in menu and pasted item in cart.
* created an icon for the basket (shopping cart);
* created a **component** for the **footer** and the **modal**.

### *Reminder: given objectives*
* ***Create a Vue.js app***.
* *Manage the data*.
* *Use the Vue.js directives (v-if, v-else, v-on, s-show...)*.
* ***Improve the app using Vue Cli***.
* ***Create re-usable components***.
* *Create the navigation using Vue Router*.
* *Use the lifecycle hooks*.
* *Manage styles*.
* *Manage data and events*.
* *Use slots*.
* *Discover the state management*.
* ***Create/manage a data store with Vuex***.
* *Get data from Vuex*.
* *Modify/update data in Vuex*.

## Result and Certification
* [View the Certification](https://github.com/s-manguy/diploma/blob/main/WEB-DEVELOPPER/certificate-vue-js-1977167923.pdf) 
* [View the result on codepen](https://codepen.io/s-manguy/pen/xxYvYzy)  *(Remark: the code on the codepen is different from this one as it does not use the CLI nor the vuex nor the router... Just consider the visual aspect and the feature!)*
* screenshots: the first product is clicked on the homepage and hovered on the shoppingcart modal !  

  ![Home - add a product](https://github.com/s-manguy/projects/blob/main/front-end-libraries/oc_cafe-avec-vue-shoppingcart/cafe-avec-vue-sandrine-manguy_home-clic_300.jpg)    ![shopping cart details](https://github.com/s-manguy/projects/blob/main/front-end-libraries/oc_cafe-avec-vue-shoppingcart/cafe-avec-vue-sandrine-manguy_shopping-cart-click_300.jpg) 
  

## Pieces of information on cli-version

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
