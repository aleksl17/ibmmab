
<template>
    <div class="Main" id="main">
        <h1>{{msg}}</h1>
        <p id="p_1">{{info}}</p>


    </div>
</template>


<script>

    //import * as axios from "axios";
    const axios = require('axios').default;

    export default {
        name: "Main_Page",
        props: {
            msg: String,
        },
        data()  {

            return {
                Greeting: focus(),
            }

        },
        mounted () {
            axios
                .get('http://localhost:3000/api/anData')
                .then(response => (this.info = response))
        }
    }
/*    function focus()
    {
       //var MongoClient = require("mongodb").MongoClient;
        var j=0;
        var MongoClient = [1,2,3,4,5,6,7,8];
        var y = "Results";

      for (j = 0; j < MongoClient.length; j++)
      {
          if(MongoClient[j] > 3)
            y += "<li>" + MongoClient[j] + "</li>";
      }
        return y;
    }
*/

</script>


<style scoped>
p   {

    }

h1  {
    font-size: xx-large;
    margin: 50px 0 0;
    }

</style>