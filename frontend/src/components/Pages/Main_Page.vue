<template> <!-- This is the most important page for the frontend. Here is where we post our results from the analysis -->
    <div class="Main" id="main">
        <h1>Sentiment Analysis</h1> <!-- Simple header -->
        <p id="wordP" v-if="word !== ''">Word: {{word}}</p> <!-- Displays a searchword, if it exists. -->
        <div v-if="loaded===true" class="content"> <!-- Check that the backend is online -->
            <p>Result ({{info.data.result.matching_results}} hits):  </p> <!-- Total length of our results. -->
            <p v-if="max_entries <= info.data.result.matching_results" class="showing">Showing up to: {{max_entries}} hits. Press 'Load More' to increase results.</p>
            <p v-else-if="max_entries > info.data.result.matching_results" class="showing">Showing up to: {{info.data.result.matching_results}} hits.</p>

            <ul> <!-- We create a list, which has a element for each entry in the info-array -->
                <li v-for="num in db.slice(0,max_entries)" v-bind:key="db[num]" > <!--info.data[num] -->
                    <div class="output" v-if="num.publish_date !== null">
                        {{num.publish_date.substr(0,10)}}</div> <!-- Scrape date - should be changed to publishing date. -->
                    <div v-else>Can't find date</div>
                    <h3 class="output"> <!-- Article Title -->
                        {{num.title}}
                    </h3>
                    <h4 class="output"> <!-- Article Author -->
                        {{num.author}}
                    </h4>
                    <div v-if="num.enriched_text.sentiment.document.score >= 0"> <!-- Positive sentiment gives a happy face -->
                        Sentiment: <img class="smiley" src="../../assets/happysmiley.png">
                    </div>
                    <div v-else-if="num.enriched_text.sentiment.document.score <= 0"> <!-- Negative sentiment gives a sad face -->
                        Sentiment: <img class="smiley" src="../../assets/sadsmiley.png">
                    </div>
                    <div v-else-if="num.enriched_text.sentiment.document.score == null">Sentiment: ?</div>
                    <div> <!-- Link to the source. (Example "nrk.no/article-1" -->
                        <a id="urlLink" :href="num.url" >Read more</a>
                    </div>
                </li>
            </ul>
            <p class="warnText" v-if="max_entries > info.data.result.matching_results">No more entries.</p>
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
        props: /* Some variables */
        {
            info: Array, //This array contains all the output from the database
        },
        data() { //Some more variables
            return{
                loaded: true, //Making sure the page is loading, even though the backend is offline.
                urlStart: 'http://localhost:3000/api/ibmData', //This must be manually changed to match where the db is.

            }
        },
        computed: { //Computed variables
            word: function () { //Get the word-function, also check if the word is changed.
                if(searchWord.isChanged()===true)
                    searchWord.isChanged();
                try {
                    this.searchFor();
                }
                catch (e) {
                    console.log(e)
                }
                return searchWord.get();
            },
            max_entries: function() {//Max amount of entries that should be loaded. Default is 10.
                return sharedVars.max_entries
            },
            db: function () {
                var temp = [];
                temp = this.info.data.result.results;
                temp.reverse();
                return temp;
            },
        },
        methods: { //Functions
            loadMore()
            { //Loads an addition 10 results.
                sharedVars.max_entries += 10;
                console.log("loadMore clicked max_entries is now: " + sharedVars.max_entries);
                router.push({ path: '/' }); //Refresh (clunky code, getting error, but works)
            },
           searchFor() //Update output from database
            {
                if(searchWord.get() === '') //If we have no searchWord, we load the entire db.
                {
                    axios
                        .post(this.urlStart, {
                            query: ''
                        })
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
                                // data error
                                this.errorStatus = 'Error: Data Error';
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
                        .post(this.urlStart, {
                            query: searchWord.get()
                        })
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
                                // data error
                                this.errorStatus = 'Error: Data Error';
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

.warnText {
    color: red;
    font-size: small;
    margin-left: 33px;
}

#wordP {
    font-size: 20px;
}

.showing {
    font-size: 12px;
    opacity: 80%;
}

#urlLink {
    color: blue;
}

</style>