<template>
  <div id="app">
    <nav class="main-nav">
    <div class="logo">
      IBMMAB
    </div>
    <Burger></Burger>
    </nav>
    <NavBar></NavBar> <!-- NavBar -->
    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </Sidebar> <!-- Sidebar -->
    <Main_Page msg="Environment Analysis" response=data></Main_Page> <!-- Main Page -->
  </div>
</template>

<script>
import Main_Page from "@/components/Main_Page" //Import main page
import NavBar from "@/components/NavBar";
import Burger from "./components/menu/Burger";
import Sidebar from "./components/menu/Sidebar";



export default {
  name: 'App',
  components: {
    //Sidebar, //Adding the components
    Main_Page,
    NavBar,
    Burger,
    Sidebar


  }
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

ul.sidebar-panel-nav > li > a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}
  @import "./assets/main.css"; /* Importing an external css */
</style>
