
<template>
    <div class="Main" id="main">
        <h1>{{msg}}</h1>
            <ul>
                <li >{{ info }}</li>
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
        mounted: function () {
            axios({
                method: 'get',
                url: 'http://localhost:3000/api/anData',
                responseType: 'json'
            })
            .then(function(response){
                for(var each in response.data.text)
                {
                    this.info += each + '/br';
                }

            });


        },
        data()  {

            return {
                dbImports: toHtml(this.response),
            }

        }
    }

    function toHtml(db)
    {
        var output = "";

        for(var each in db)
        {
              output += each + "/br";
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