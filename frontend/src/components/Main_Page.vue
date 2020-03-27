<template>
    <div class="Main" id="main">
        <h1>{{msg}}</h1>
        <p>Result ({{info.data.length}} hits):  </p>
        <!-- We create a list, which has a element for each entry in the info-array -->
            <ul>
                <li v-for="num in info.data" v-bind:key="info.data[num]" >{{num.title}} ( {{num.author}} ): <a :href="num.url" >Read more</a></li>
            </ul>

    </div>
</template>


<script>


    const axios = require('axios').default; //What we've using to read from the db

    export default
    {
        name: "Main_Page",

        props:
        {
            msg: String, //The msg/title is set in App.Vue
            info: Array //This array contains all the output from the database

        },
        mounted: function () {
            axios
                .get('http://localhost:3000/api/anData')
                .then(response => (this.info = response.data)) //We get all the data from database, and insert it into out info-array

        },

    }
</script>


<style scoped>
p   {

    }

h1  {
    font-size: xx-large;
    margin: 50px 0 0;
    }

ul li   {
            list-style-type: decimal;
            margin: 8px 0;
        }




</style>