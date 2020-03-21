
<template>
    <div class="topnav" id="topnavbar">
        <v-btn class="topnavbtn" onclick="window.location=#main">
            <span>Home</span>
        </v-btn>
        <v-btn class="topnavbtn" onclick="window.location='http://localhost:3000/api/anData'">
            <span>BACKEND</span>
        </v-btn>
        <v-btn class="topnavbtn" onclick="window.location='https://www.ibm.com/no-en';">
            <span>IBM</span>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "Nav_Bar"
    }




</script>

<style scoped>

a
{
        color: white;


    }

.topnavbtn
{
    background: black;
    height: 50px;
    width: 32vw;
    border-width: thin;
    border: white;
    border-style: double;
    float: left;
    color: white;
    text-align: center;
    line-height: 50px;


}

#topnavbar
{

        content: "";
        display: table;
        clear: both;
    }

.topnavbtn span
{
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}

.topnavbtn span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

.topnavbtn:hover span {
    padding-right: 25px;
}

.topnavbtn:hover span:after {
    opacity: 1;
    right: 0;
}


</style>