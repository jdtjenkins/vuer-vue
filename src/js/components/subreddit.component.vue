<template>
    <div class="subreddit">{{ src }}</div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'subreddit',
        props: ['src'],
        data() {
            return {
                links: [],
            }
        },
        async created() {
            const posts = await axios.get(`${ this.src }.json`);

            console.log(posts.data.data.children[0]);
        },
    }
</script>

<style lang="scss" scoped>
</style>
