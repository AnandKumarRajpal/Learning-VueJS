<template>
    <article class="post">
        <div class="activity-title-wrapper">
            <h4 class="activity-title">{{ item.title }}</h4>
            <i @click="toggleSettings()" class="fas fa-cog activity-settings"></i>
        </div>
        <p>{{ capitalize(categories[item.category].text) }}</p>
        <p>{{ item.notes }}</p>
        <div class="media">
        <div class="media-left">
            <p class="image is-32x32">
            <img src="../assets/user.png">
            </p>
        </div>
        <div class="media-content">
            <div class="content">
            <p>
                <a href="#">Filip Jerga</a> updated {{item.updatedAt | convertTime}} &nbsp;
            </p>
            </div>
        </div>
        <div class="media-right">
            <!-- <span>Progress: <span :class="'color-' + color">{{item.progress}} %</span></span> -->
            <span>Progress: <span :style="{'color': color}">{{item.progress}} %</span></span>
        </div>
        </div>
        <div class="activity-controll" v-if="enableSettings">
            <a class="button is-warning">Edit</a>
            <a class="button is-danger" @click="deleteActivity">Delete</a>
        </div>
    </article>
</template>

<script>
import capitalize from "@/mixins/capitalize"
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        categories: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            enableSettings: false
        }
    },
    mixins: [capitalize],
    computed: {
        color(){
            if (this.item.progress <= 0)
            {
                return "red"
            } else if (this.item.progress <= 50)
            {
                return "orange"
            } else {
                return "green"
            }
        }
    },
    methods: {
        toggleSettings () {
            this.enableSettings = !this.enableSettings
        },
        deleteActivity () {
            this.$emit("activityDeleted", this.item)
        }
    }
}
</script>

<style  lang="scss" scoped>

.title{
    margin-bottom: 5px;
}

.activity-title{
    margin-bottom: 5px;
    display: inline-block;
}

.activity-settings {
    float: right;
    font-size: 22px;

    &:hover {
        cursor: pointer;
    }
}

.activity-controll {
    margin: 20px 0 0 0;

    a {
        margin-right: 5px;
    }
}


</style>