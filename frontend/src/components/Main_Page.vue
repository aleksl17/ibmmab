<template>
    <div class="Main" id="main">
        <h1>Environment Analysis</h1>
        <p id="wordP" v-if="word !== ''">Word: {{word}}</p>
        <div v-if="loaded===true">
            <p>Result ({{info.data.length}} hits):  </p>
        <!-- We create a list, which has a element for each entry in the info-array -->
            <ul>
                <li v-for="num in info.data.slice(0,max_entries)" v-bind:key="info.data[num]" >
                    <p class="output"> {{num.scrape_date.substr(0,10)}}</p>
                    <h3 class="output">
                        {{num.title}}
                    </h3>
                    <h4 class="output">
                        {{num.author}}
                    </h4>
                    <div v-if="num.sentiment === '1'">
                        Sentiment: <img class="smiley" src="../assets/happysmiley.png">
                    </div>
                    <div v-if="num.sentiment === '0'">
                        Sentiment: <img class="smiley" src="../assets/sadsmiley.png">
                    </div>
                    <div>
                        <a :href="num.url" >Read more</a>
                    </div>
                </li>
            </ul>
            <button class="loadBtn" v-on:click="loadMore">Load More</button>

        </div>
        <!-- <div v-else-if="loaded===true && word">
            <p>Result ({{newInfo.data.length}} hits):  </p> -->
            <!-- We create a list, which has a element for each entry in the info-array -->
            <!--
            <ul>
                <li v-for="num in newInfo.data.slice(0,max_entries)" v-bind:key="newInfo.data[num]" >
                    <p class="output"> {{num.scrape_date.substr(0,10)}}</p>
                    <h3 class="output">
                        {{num.title}}
                    </h3>
                    <h4 class="output">
                        {{num.author}}
                    </h4>
                    <div v-if="num.sentiment === '1'">
                        Sentiment: <img class="smiley" src="../assets/happysmiley.png">
                    </div>
                    <div v-if="num.sentiment === '0'">
                        Sentiment: <img class="smiley" src="../assets/sadsmiley.png">
                    </div>
                    <div>
                        <a :href="num.url" >Read more</a>
                    </div>
                </li>
            </ul>


            <button class="loadBtn" v-on:click="loadMore">Load More</button>

        </div> -->

        <div v-else>
            <h3>Result 0 hits:</h3>
            <p>Is the database online?</p>
        </div>
    </div>
</template>


<script>


    import router from "../router";
    const axios = require('axios').default; //What we've using to read from the db
    import {searchWord, store} from "../store"; //Variables and functions shared between different components

    // noinspection ES6UnusedImports,ES6CheckImport
    /*import  discovery  from "../main.js"*/


    export default
    {
        name: "Main_Page",

        props:
        {
            msg: String, //The msg/title is set in App.Vue
            info: Array, //This array contains all the output from the database
            /*newInfo: Array*/
        },
        mounted:  function () {
            axios
                .get(this.urlStart)
                .catch(error => {
                    if (!error) {
                        // network error
                        this.errorStatus = 'Error: Network Error';
                        this.loaded = false;
                    }
                    else {
                        console.log(error)
                    }
                })
                .then(response => {
                    this.info = response.data;
                    console.log("db connected")
                }) //We get all the data from database, and insert it into out info-array
                .catch(error => {
                    if (!error.response) {
                        // network error
                        this.errorStatus = 'Error: Network Error';
                        this.loaded = false;
                    }
                    else{
                        console.log(error)
                    }
                })



            /*this.discovery.query(this.queryParams)
                    .then(queryResponse => {
                    console.log(JSON.stringify(queryResponse, null, 2));
                    })
                    .catch(err => {
                    console.log('error:', err);
                    });*/
        },
        data() {
            return{
                loaded: true,
                urlStart: 'http://localhost:3000/api/anData',


            }

        },
        computed: {
            word: function () {
                if(searchWord.isChanged()===true)
                    searchWord.isChanged();

                try {
                    this.searchFor(searchWord.get());
                }
                catch (e) {
                    console.log(e)
                }
                return searchWord.get();
            },
            max_entries: function() {
                return store.max_entries
            },


        },
        methods: {
            loadMore()
            {
                store.max_entries += 10;
                console.log("loadMore clicked max_entries is now: " + store.max_entries);
                router.push({ path: '/' });
            },
           searchFor()
            {
                if(searchWord.get() === '')
                {
                    axios
                        .get(this.urlStart)
                        .catch(error => {
                            if (!error) {
                                // network error
                                this.errorStatus = 'Error: Network Error';
                                this.loaded = false;
                            }
                            else
                            {
                                console.log(error)
                            }
                        })
                        .then(response => (this.info = response.data)) //We get all the data from database, and insert it into out info-array
                        .catch(error => {
                            if (!error.response) {
                                // network error
                                this.errorStatus = 'Error: Network Error';
                                this.loaded = false;
                            }
                            else
                            {
                                console.log(error)
                            }
                        })
                }
                else
                {
                    axios
                        .get(this.urlStart+"?search="+ searchWord.get())
                        .catch(error => {
                            if (!error) {
                                // network error
                                this.errorStatus = 'Error: Network Error';
                                this.loaded = false;
                            } else {
                                console.log(error)
                            }
                        })
                        .then(response => (this.info = response.data)) //We get all the data from database, and insert it into out info-array
                        .catch(error => {
                            if (!error.response) {
                                // network error
                                this.errorStatus = 'Error: Network Error';
                                this.loaded = false;
                            } else {
                                console.log(error)
                            }
                        })
                }
            }
        }
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
            margin: 50px 0;
            width: 50%;
        }

ul>li:nth-child(odd){

    }

ul>li:nth-child(even){

}

.smiley{
    height: 20px;
    width: 20px;
    line-height: 0;
}

.output {
    width: auto;
    line-break: auto;
    overflow: hidden;
    word-wrap: break-spaces;
    margin-top: 7px;
    margin-bottom: 7px;

}

h4  {
    color: #565656;
}

.loadBtn
{
    background: #30c93f;
    height: 50px;
    width:  20%;
    border: thin double white;
    float: left;
    color: white;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    outline: 0;
    margin-bottom: 20px;
    margin-left: 30px;
}
#wordP
{
    font-size: 20px;
}



</style>