<template>
    <div>
        <activityDetail :item="item" :categories="categories"/>
        <activityUpdate />
    </div>
</template>

<script>
import activityDetail from "./activityDetail"
import activityUpdate from "./activityUpdate"
export default {
    components: {
        activityDetail,
        activityUpdate
    },
    props: {
        item: {
            required: true,
            type: Object
        },
        categories: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>