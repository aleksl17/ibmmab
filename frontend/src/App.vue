<template> <!-- This is the actual App, but it mainly puts our components together -->
  <div id="app">
    <nav class="main-nav"> <!-- Thin bar over the main NavBar -->
    <div class="logo">
      IBMMAB - Alpha version 1
    </div>
    <SidebarButton></SidebarButton>
    </nav>
    <NavBar></NavBar> <!-- NavBar -->
    <Sidebar>
      <ul class="sidebar-panel-nav"> <!-- Buttons for the Sidebar -->
        <li><router-link class="btn" to="/">Home</router-link></li>
        <li><router-link class="btn" to="/about">About</router-link></li>
        <li><router-link class="btn" to="/contact">Contact</router-link></li>
        <li class="btn" onclick="window.location='http://localhost:3000/api/ibmData'">API</li>
        <li class="btn" onclick="window.location='https://www.ibm.com/no-en';">IBM</li>
      </ul>
    </Sidebar> <!-- Sidebar -->
    <router-view /> <!-- This one loads our actual active Vue. Main_Page is default. -->
  </div>
</template>

<script>

import NavBar from "./components/menu/NavBar"; //Import Navigation-bar
import SidebarButton from "./components/menu/SidebarButton"; //Import the small icon for the Menu
import Sidebar from "./components/menu/Sidebar"; //Import Sidebar

export default { //No new javascript in this component.
  name: 'App',
  components: { //Adding the components
    NavBar,
    SidebarButton,
    Sidebar
  },
}
</script>

<style> /*Styles to make the whole page more cohesive, and styles for the sidebar-buttons*/

body {
    background-color: rgba(0, 24, 201, 0.11);
  }

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

ul.sidebar-panel-nav > .btn {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding-bottom: 0.5em;
    cursor: pointer; /*These are just normal links, so we need to make them look like the router-links.*/
  }

</style>
