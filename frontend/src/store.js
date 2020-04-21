import Vue from "vue";

export const store = Vue.observable({
    isNavOpen: false,
    isWordChanged: false,
    max_entries: 10
});

export const mutations = {
        toggleNav() {
            store.isNavOpen = !store.isNavOpen
        }
};


var sWord = "";

export const searchWord = {
    set(word) {
        sWord = word;
    },

    get(){
        return sWord;
    },

    isChanged() {
        store.isWordChanged = !store.isWordChanged
    }

};
