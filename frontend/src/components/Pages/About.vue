<template> <!-- Very simple about. Can easily be improved upon, but was not an important feature for the project -->
    <div id="mainDiv">
        <h2>About</h2>
        <p>
            We are three students at the University of Agder, who is doing sentiment-analysis of news articles.
            We are focusing on articles about climate and the environment, and using IBMs artificial intelligence, IBM Watson, to do so.
        </p>
        <p>
            Sentiment-analysis is to figure out if the article that is being analysed is focused positive or negative, according to
            certain criteria. The criteria for our analysis is the attitude towards the environment in the written article.
        </p>
        <p>
            We were tasked with analysing norwegian medias coverage of stories related to climate. At the home page the latest articles about
            climate and environment in norwegian medias should load. With them you should be able to get a link to said article, who wrote it, and
            most importantly: the AIs guess for the sentiment of the article.
        </p>
        <br/>
        <p id="us">
             -- Aleksander, Håvard & Thor Eivind
        </p>
    </div>
    
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>
#mainDiv {
    width: 50%;
}

#us {
    font-weight: bold;

}

</style>