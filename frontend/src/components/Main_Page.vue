
<template>
    <div class="Main" id="main">
        <h1>{{msg}}</h1>
            <ul>
                <li v-for="text in dbImport" v-bind:key="text">{{ text }}</li>
            </ul>
               <p v-html="dbImports"></p>

            <p >This works?</p>


    </div>
</template>


<script>


    const axios = require('axios').default;

    export default
    {
        name: "Main_Page",
        props: {
            msg: String,
            info: String,
            dbImport: JSON,

        },
        mounted () {
            axios
                .get('http://localhost:3000/api/anData')
                .then(response => (this.dbImport = response))
        },
        data()  {

            return {
                dbImports: toHtml(this.dbImport),
            }

        }
    }

    function toHtml(db)
    {
        var output = "";
        var text = "";
        for(text in db)
        {
              output += text + "/br";
        }
        return output;
    }



</script>


<style scoped>
p   {

    }

h1  {
    font-size: xx-large;
    margin: 50px 0 0;
    }

</style>