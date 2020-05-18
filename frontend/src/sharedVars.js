import Vue from "vue";

let sWord =  ""; //SearchWord - default empty string.

export const sharedVars = Vue.observable({
    navOpen: false, //Check if the sidebar is open. Default false.
    isWordChanged: false, //Check if the searchWord is changed recently. Default false.
    max_entries: 10, //Default 10 entries on main_page. We dont want to display ~900(example) results by default.

});

export const mutations = {
        toggleNav() { //Simple toggle for the sidebar.
            sharedVars.navOpen = !sharedVars.navOpen
        }
};

export const searchWord = {
    set(word) { //Set new searchWord.
        sWord = word;
    },

    get(){ //Getter for searchWord.
        return sWord;
    },

    isChanged() { //Simple toggle for the searchWord.
        sharedVars.isWordChanged = !sharedVars.isWordChanged
    }
};
