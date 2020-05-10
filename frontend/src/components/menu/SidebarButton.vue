<template>
    <div id="sidebar-button"
         :class="{'active' : isSidebarActive}"
         @click.prevent="toggle">
        <slot>
            <button type="button" class="sidebar-button" title="Menu"> <!-- Button & 3 lines, which we use as css elements. -->
                <span class="sidebar-bar sidebar-bar--1"></span>
                <span class="sidebar-bar sidebar-bar--2"></span>
                <span class="sidebar-bar sidebar-bar--3"></span>
            </button>
        </slot>
    </div>
</template>

<script>
    import {sharedVars, mutations} from "../../sharedVars";

    export default {

        computed: {
            isSidebarActive()
            { //Determining if the sidebar is open
                return sharedVars.navOpen
            }
        },
        methods: {
            toggle()
            { //Toggling sidebar
                mutations.toggleNav();
            }
        }
    }
</script>

<style scoped>
button {
    cursor: pointer;
}

button:focus {
    outline: 0;
}

.sidebar-button {
    position: relative;
    height: 30px;
    width: 32px;
    display: block;
    z-index: 999; /*Making sure the button is on top*/
    border: 0;
    border-radius: 0;
    background-color: transparent;
    pointer-events: all;
    transition: transform .6s cubic-bezier(.165,.84,.44,1), opacity .3s cubic-bezier(.165,.84,.44,1), background-color .6s cubic-bezier(.165,.84,.44,1);
}
.sidebar-bar {
    background-color: #130f40;
    position: absolute;
    top: 50%;
    right: 6px;
    left: 6px;
    height: 2px;
    width: auto;
    margin-top: -1px;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.sidebar-bar--1 {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
}

.sidebar-bar--2 {
    transform-origin: 100% 50%;
    transform: scaleX(.8);
}

.sidebar-button:hover .sidebar-bar--2 {
    transform: scaleX(1);
}

.no-touchevent .sidebar-bar--2:hover {
    transform: scaleX(1);
}

.sidebar-bar--3 {
    transform: translateY(6px);
}

#sidebar-button.active .sidebar-button {
    transform: rotate(-180deg);
}

/*Cross-color*/
#sidebar-button.active .sidebar-bar {
    background-color: #fff;
}
/*Rotate bar 1*/
#sidebar-button.active .sidebar-bar--1 {
    transform: rotate(45deg)
}
/*Hide middle bar*/
#sidebar-button.active .sidebar-bar--2 {
    opacity: 0;
}
/*Rotate bar 3*/
#sidebar-button.active .sidebar-bar--3 {
    transform: rotate(-45deg)
}

</style>