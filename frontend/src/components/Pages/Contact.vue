<template> <!-- Same reasoning as "about". Simple form that helps you send an email to one of the creators for the page.
                Not a primary focus for the project -->
    <div>
        <h2>Contact</h2>
        <form id="form" v-on:submit.prevent="checkError">

            <div v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </div>




            <label for="name">Name</label>
            <br/>
            <input type="text" id="name" name="name" v-model="name" placeholder="Your name...">
            <br/>
            <br/>

            <label for="subject">Subject</label>
            <br/>
            <textarea id="subject" name="subject" v-model="subject" placeholder="Something..."></textarea>
            <br/>

            <button type="submit" id="submit"><span>Submit</span></button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                errors: [],
                name: null,
                subject: null,
                mailAddress: "thoref16@uia.no",
                otherMailAddress: "thoref16@uia.no"
            }
        },
        methods:{
            submitText: function() {
                console.log(this.name + this.subject);
                var link = "mailto:" + this.mailAddress +"?cc=" + this.otherMailAddress + "&subject="
                    + escape("Contact Request") + "&body=" + escape(this.subject + " From " + this.name);
                window.location.href = link;
                this.name = ""; //Reset
                this.subject = ""; //Reset
                return true;
            },

            checkError: function (e){
                if (this.name && this.subject)
                {
                    this.errors = [];
                    this.submitText();
                    return true;
                }
                this.errors = []; //Reset

                if (!this.name)
                {
                    this.errors.push('Name required.');
                }

                if(!this.subject)
                {
                    this.errors.push('Subject required.');
                }
                e.preventDefault();
            }
        }
    }
</script>

<style scoped>
#subject {
    height: 200px;
    width: 200px;
}
#submit {
    background: #30c93f;
    height: 50px;
    width:  200px;
    border: thin double white;
    float: left;
    color: white;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    outline: 0;
}
#submit span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}

#submit span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

#submit:hover span {
    padding-right: 25px;
}

#submit:hover span:after {
    opacity: 1;
    right: 0;
}
</style>