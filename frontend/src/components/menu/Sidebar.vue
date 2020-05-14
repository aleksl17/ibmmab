<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div> <!-- Check if this should be open or not -->
        <transition name="slide"> <!-- Transitioning in from the side -->
            <div v-if="isPanelOpen" class="sidebar-panel">
                <div id="sidebarButton-main">
                    <SidebarButton></SidebarButton> <!-- Actual buttons is defined in App.Vue -->
                </div>
                <slot></slot>
                <p id="tip">Tip: Type removeWord to remove search filter</p> <!-- How to remove the searchWord -->
                <div class="searchBarForm" >
                    <input class="searchBar" type="text" placeholder="Search..."
                           v-model="input1"
                           onclick="this.setSelectionRange(0, this.value.length)"
                           v-on:keyup.enter="submit1" />
                    <!--@keydown.space.prevent-->
                    <button id="inputBtn" class="searchBarBtn" type="submit" v-on:click="submit1" >Search</button>
                </div>
            </div>

        </transition>
    </div>
</template>

<script>
    import {sharedVars, mutations, searchWord} from "../../sharedVars";
    import router from "../../router";
    import SidebarButton from "./SidebarButton";

    export default {
        components: {
            SidebarButton
        },

        data(){
            return {
                input1: ""
            }
        },

        methods: {
            closeSidebarPanel: mutations.toggleNav,

            submit1(){
                if(this.input1 === "")
                {
                    console.log("Submit with nothing")
                }
                else if(this.input1 === "removeWord")
                {
                    searchWord.set('');
                    console.log('Word nothing');
                    this.input1 = "";
                    searchWord.isChanged();
                    sharedVars.max_entries = 10;
                    router.push({ path: '/' });
                }
                else
                {
                    searchWord.set(this.input1);
                    console.log(searchWord.get());
                    this.input1 = "";
                    searchWord.isChanged();
                    sharedVars.max_entries = 10;
                    router.push({ path: '/' });
                }
            },
        },

        computed: {
            isPanelOpen() {
                return sharedVars.navOpen
            }
        },
    }


</script>

<style scoped>
button {
    cursor: pointer;
}

.slide-enter-active,
.slide-leave-active { /*Transitions */
    transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to { /*Transitions */
    transform: translateX(100%);
    transition: all 150ms ease-in 0s;
}

#sidebarButton-main { /*Trying to give the button on the sidebar the same position as on the main page.*/
    position: relative;
    top: -15px;
    right: -260px;
}

.sidebar-backdrop {
    background: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    cursor: pointer;
}

.sidebar-panel {
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #6a9325;;
    position: fixed;
    right: 0;
    top: 0;
    height: 91vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
    border: 3px ridge #ffffff;
    border-right: none;
}

.searchBarForm {
    position: fixed;
    bottom: 20px;
    right: 10px;
    background: #ffffff;
    height: 1.5rem;
    width: 300px;
    padding: 2rem 10px;
}

.searchBarForm .searchBar  {
    display: table-cell;
    clear: both;
    float: left;
    position: absolute;
    width: 80%;
    outline: none;
    border: none;
    white-space: nowrap;
    font-size: 18px;
    top: 0;
    bottom: 0;
    left: 0;
}

.searchBarForm .searchBarBtn {
    width: 20%;
    height: 100%;
    float: right;
    border: 1px solid;
    background: none;
    display: table-cell;
    font-size: 16px;
    white-space: nowrap;
    outline: none;
    position: absolute;
    color: white;
    background: #30c93f;
    top: 0;
    bottom: 0;
    right: 0;
}

#tip {
    position: fixed;
    color: white;
    right: 10px;
    bottom: 100px;
    opacity: 60%;
}

</style>