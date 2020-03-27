
<template>
    <div class="Main" id="main">
        <h1>{{msg}}</h1>
        <p>Result: </p>
            <ul>
                <li v-for="num in info.data" v-bind:key="info.data[num]" >{{num.title}} ( {{num.author}} ): <a :href="num.url" >Read more</a></li>
            </ul>

    </div>
</template>


<script>


    const axios = require('axios').default;


    export default
    {
        name: "Main_Page",

        props:
        {
            msg: String,
            info: Array

        },
        mounted: function () {
            axios
                .get('http://localhost:3000/api/anData')
                .then(response => (this.info = response.data))

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
            list-style-type: none;
            margin: 8px 0;
        }




</style>