<template>
    <div class="createActivityForm">
        <a class="button is-primary is-block is-alt is-large" href="#" @click="toggleFormDisplay" v-if="!isFormDisplayed">New Activity</a>
        <div class="create-form" v-if="isFormDisplayed">
            <h2>Create Activity</h2>
            <form>
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                <input class="input" type="text" placeholder="Read a Book" v-model="newActivity.title">
                </div>
            </div>
            <div class="field">
                <label class="label">Notes</label>
                <div class="control">
                <textarea class="textarea" placeholder="Write your notes here!" v-model="newActivity.notes"></textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">Category</label>
                <div class="control">
                <select v-model="newActivity.category" class="select">
                    <option disabled value="">Please Select One Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ capitalize(category.text) }}</option>
                </select>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                <button class="button is-link" @click.prevent="createActivity" :disabled="!checkActivity">Create Activity</button>
                </div>
                <div class="control">
                <button class="button is-text" @click="toggleFormDisplay">Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</template>


<script>
import { createActivityAPI } from "@/api"
import capitalize from "@/mixins/capitalize"
export default {
    props: {
        categories: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            isFormDisplayed: false,
            newActivity: {
            title: "",
            notes: "",
            category: ""
            }
        }
    },
    mixins: [capitalize],
    methods: {
        toggleFormDisplay () {
            this.isFormDisplayed = !this.isFormDisplayed
        },
        createActivity () {
            createActivityAPI({...this.newActivity}).then(activity => {
                this.newActivity.title = ""
                this.newActivity.category = ""
                this.newActivity.notes = ""
                this.toggleFormDisplay()
                this.$emit("activityCreated", {...activity})
            })    
        }
    },
    computed: {
        checkActivity ()
        {
            return this.newActivity.title && this.newActivity.notes && this.newActivity.category
        }
    }
}
</script>

<style scoped>

</style>