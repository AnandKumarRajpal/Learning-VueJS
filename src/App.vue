<template>
  <div id='activity-app' v-if="isDataLoaded">
        <nav class="navbar is-white topNav">
            <div class="container">
            <div class="navbar-brand">
                <h1> {{ fullAppName }} </h1>
            </div>
            </div>
        </nav>
        <theNavbar />
        <section class="container">
            <div class="columns">
            <div class="column is-3">
              <createActivity @activityCreated="addActivity" :categories="categories"/>
            </div>
            <div class="column is-9">
                <div class="box content" :class="{fetching: isFetching, err: error}">
                <div v-if="isFetching">
                  Loading ...
                </div>
                  <activity v-for="activity in activities" :item="activity" :categories="categories" @activityDeleted="handleActivityDelete"></activity>
                  <div v-if="!isFetching">
                  <div class="activity-length">Currently {{ activityLength }} activities</div>
                  <div class="activity-motivation"> {{ activityMotivation }} </div>
                  </div>
                </div>
            </div>
            </div>
        </section>
    </div>
</template>

<script>
import Vue from 'vue'
import activity from "./components/activity"
import createActivity from "./components/createActivity"
import theNavbar from "./components/theNavbar"
import { fetchActivities, fetchUser, fetechCategories, deleteActivityAPI } from "./api"

export default {
  name: 'app',
  components: {activity, createActivity, theNavbar},
  data  () 
  {
    return {
      message: 'Hello Vue!',
      isFetching: false,
      error: false,
      titleMessage: 'Title Message Vue!!!!!',
      user: {},
      activities: null,
      categories: null,
      appName: 'Activity Planner',
      creator: "Anand Kumar",
    }
  },
  // watch: {
  //   created ()
  //   {

  //   },
  // },
  computed: {
    fullAppName ()
    {
      return this.appName + ' by ' + this.creator
    },
    activityLength()
    {
      return Object.keys(this.activities).length
    },
    activityMotivation()
    {
      if (this.activityLength && this.activityLength < 5)
      {
        return "Nice to see some activities!"
      } else if (this.activityLength >= 5)
      {
        return "So many activities! Good Job!"
      } else 
      {
        return "No activities! So Sad :("
      }
    },
    isDataLoaded()
    {
      return this.activities && this.categories
    }
  },
  created ()
  {
    this.isFetching = true
    fetchActivities().then((incomingActivites) => {
      this.activities = incomingActivites
      this.isFetching = false
    })
    this.user = fetchUser()
    fetechCategories().then((categories) => {
      this.categories = categories
    })
  },
  methods: {
    addActivity(newActivity) {
      Vue.set(this.activities, newActivity.id, newActivity)
    },
    handleActivityDelete(activity){
        deleteActivityAPI(activity).then((deleted) => {
          Vue.delete(this.activities, deleted.id)
        })
    }
  }
}
</script>

<style>
#activity-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


html,body {
  font-family: 'Open Sans', serif;
  background: #F2F6FA;
}
footer {
  background-color: #F2F6FA !important;
}
.topNav {
  border-top: 5px solid #3498DB;
}
.topNav .container {
  border-bottom: 1px solid #E6EAEE;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li{
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}

.activity-length {
  display: inline-block;
}

.activity-motivation{
  float: right;
}

.fetching{
  border: 2px solid orange;
}

.err{
  border: 2px solid red;
}
</style>
