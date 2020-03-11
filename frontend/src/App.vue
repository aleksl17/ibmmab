<template>
  <div id="app">
    <NavBar></NavBar> <!-- NavBar -->
    <Main_Page msg="Environment Analysis"></Main_Page> <!-- Main Page -->
  </div>
</template>

<script>
import Main_Page from "@/components/Main_Page" //import main page
import NavBar from "@/components/NavBar";
//Import Top bar



export default {
  name: 'App',
  components: { //Adding the components
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
