<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel">
                <slot></slot>
                <div class="searchBarForm" su>
                    <input class="searchBar" type="text" placeholder="..." onclick="this.setSelectionRange(0, this.value.length)">
                    <button class="searchBarBtn" type="submit">Search</button>
                </div>
            </div>

        </transition>
    </div>
</template>

<script>
    import {store, mutations} from "../../store";

    export default {

        methods: {
            closeSidebarPanel: mutations.toggleNav
        },
        computed: {
            isPanelOpen() {
                return store.isNavOpen
            }
        }
    }
</script>

<style scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s;
    }

    .sidebar-backdrop{
        background: rgba(0,0,0,.5);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
    }

    .sidebar-panel {
        overflow-y: auto;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 300px;
    }
    .searchBarForm {
        position: fixed;
        bottom: 20px;
        left: 10px;
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
        top: 0px;
        bottom: 0px;
        left: 0px;
        outline: none;
        border: none;
        white-space: nowrap;
        font-size: 18px;


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
        background: green;
        top: 0px;
        bottom: 0px;
        right: 0px;
    }
</style>