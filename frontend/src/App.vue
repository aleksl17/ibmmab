<template>
  <div id="app">
    <nav class="main-nav">
    <div class="logo">
      IBMMAB
    </div>
    <NavBar></NavBar> <!-- NavBar -->
  </nav>

    <!-- <Sidebar>
      <ul class="sidebar-panel-nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </Sidebar> <-- Sidebar -->
    <Main_Page msg="Environment Analysis" response=data></Main_Page> <!-- Main Page -->
  </div>
</template>

<script>
import Main_Page from "@/components/Main_Page" //Import main page
import NavBar from "@/components/NavBar";
//import Sidebar from "./components/Sidebar"; //Import Top bar



export default {
  name: 'App',
  components: {
    //Sidebar, //Adding the components
    Main_Page,
    NavBar


  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  @import "./assets/main.css"; /* Importing an external css */
</style>
