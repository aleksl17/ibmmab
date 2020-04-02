<template>
  <div id="app">
    <nav class="main-nav">
    <div class="logo">
      IBMMAB - Alpha
    </div>
    <Burger></Burger>
    </nav>
    <NavBar></NavBar> <!-- NavBar -->
    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li><router-link class="btn" to="/">Home</router-link></li>
        <li><router-link class="btn" to="/about">About</router-link></li>
        <li><router-link class="btn" to="/contact">Contact</router-link></li>
      </ul>
    </Sidebar> <!-- Sidebar -->
    <router-view /> <!-- This one loads our actual views -->
  </div>
</template>

<script>

import NavBar from "./components/NavBar"; //Import Navigation-bar
import Burger from "./components/menu/Burger"; //Import the small icon for the Menu
import Sidebar from "./components/menu/Sidebar"; //Import Sidebar



export default {
  name: 'App',
  components: { //Adding the components
    NavBar,
    Burger,
    Sidebar
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 20px;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > .btn {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}
  @import "./assets/main.css"; /* Importing an external css */
</style>
