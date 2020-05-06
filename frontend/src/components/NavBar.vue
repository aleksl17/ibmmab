
<template>
    <div class="topnav" id="topnavbar">
        <router-link class="topnavbtn" tag="button" to="/" replace>
            <span>Home</span>
        </router-link>
        <router-link class="topnavbtn" tag="button" id="btn2" to="/about" replace>
            <span>About</span>
        </router-link>
        <router-link class="topnavbtn" id="btn3" tag="button" to="/contact" replace>
            <span>Contact</span>
        </router-link>
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

.topnav
{
    width: 100%;
    height: auto;
    alignment: top;

}

#topnavbar
{

    content: "";
    display: table;
    clear: both;
}
.topnavbtn
{
    background: #30c93f;
    height: 50px;
    width:  33%;
    border: thin double white;
    float: left;
    color: white;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    outline: 0;


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