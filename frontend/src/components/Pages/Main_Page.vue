<template> <!-- This is the most important page for the frontend. Here is where we post our results from the analysis -->
    <div class="Main" id="main">
        <h1>Environment Analysis</h1> <!-- Simple header -->
        <p id="wordP" v-if="word !== ''">Word: {{word}}</p> <!-- Displays a searchword if it exists. -->
        <div v-if="loaded===true"> <!-- Check that the backend is online -->
            <p>Result ({{info.data.length}} hits):  </p> <!-- Total length of our results. -->

            <ul> <!-- We create a list, which has a element for each entry in the info-array -->
                <li v-for="num in info.data.slice(0,max_entries)" v-bind:key="info.data[num]" >
                    <p class="output">
                        {{num.publish_date.substr(0,10)}}</p> <!-- Publishing date -->
                    <h3 class="output"> <!-- Article Title -->
                        {{num.title}}
                    </h3>
                    <h4 class="output"> <!-- Article Author -->
                        {{num.author}}
                    </h4>
                    <div v-if="num.sentiment === '1'"> <!-- Positive sentiment gives a happyface -->
                        Sentiment: <img class="smiley" src="../../assets/happysmiley.png">
                    </div>
                    <div v-if="num.sentiment === '0'"> <!-- Negative sentiment gives a sadface -->
                        Sentiment: <img class="smiley" src="../../assets/sadsmiley.png">
                    </div>
                    <div> <!-- Link to the source. (Example "nrk.no/article-1" -->
                        <a :href="num.url" >Read more</a>
                    </div>
                </li>
            </ul>
            <button class="loadBtn" v-on:click="loadMore">Load More</button> <!-- Default numbers of loaded articles is
                                                                                10. This button loads an additional 10,
                                                                                until all articles are loaded. -->
        </div>
        <div v-else> <!-- Displays if the backend does not load for whatever reason. -->
            <h3>Result 0 hits:</h3>
            <p>Is the database online? Try refreshing the page.</p>
        </div>
    </div>
</template>


<script>


    import router from "../../router"; //We're using the router for redirecting to other parts of the page more easily.
    const axios = require('axios').default; //Db-reader
    import {searchWord, sharedVars} from "../../sharedVars"; //Variables and functions shared between different components

    export default
    {
        name: "Main_Page",
        props:
        {
            msg: String, //The msg/title is set in App.Vue
            info: Array, //This array contains all the output from the database
        },
        mounted:  function () { //Loading the backend as we try to load the component.
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
        },
        data() {
            return{
                loaded: true, //Making sure the page is loading, even though the backend is offline.
                urlStart: 'http://localhost:3000/api/anData', //This must be manually changed to match where the db is.
            }
        },
        computed: {
            word: function () { //Get the word-function, also check if the word is changed.
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
                return sharedVars.max_entries //Max amount of entries that should be loaded. Default is 10.
            },
        },
        methods: {
            loadMore()
            { //Loads an addition 10 results.
                sharedVars.max_entries += 10;
                console.log("loadMore clicked max_entries is now: " + sharedVars.max_entries);
                router.push({ path: '/' }); //Refresh (clunky code, but works)
            },
           searchFor()
            {
                if(searchWord.get() === '')
                {
                    axios
                        .get(this.urlStart)
                        .catch(error => {
                            if (!error)
                            {
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
h1 {
    font-size: xx-large;
    margin: 50px 0 0;
}

ul li {
            list-style-type: none;
            margin: 50px 0;
            width: 50%;
}


.smiley {
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

.loadBtn {
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
#wordP {
    font-size: 20px;
}

</style>