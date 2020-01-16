<template>
    <linkbox
        v-if="links.length"
        class="linkbox"
        :link="currentLink"
    ></linkbox>
</template>

<script>
    import axios from 'axios';

    // Components
    import { Carousel, Slide } from 'vue-carousel';

    // Utils
    import { LinkUtils } from '../../../utils/link.utils';

    export default {
        name: 'subreddit-platform',
        props: ['link'],
        components: {
            'linkbox': () => import('../linkbox.component.vue'),
        },
        data() {
            return {
                links: [],
                pageSize: 25,
                currentCount: 0,
                currentPage: null,
                nextPage: null,
                timer: null,
            }
        },
        methods: {
            now() {
                return performance.now();
            }
        },
        computed: {
            currentLink() {
                if (this.links.length) {
                    return this.links[this.currentCount];
                }
            },
        },
        async created() {
            const response = await axios.get(`${ this.link }.json`);

            const links = [];

            for (let child of response.data.data.children) {
                
                if (child.data.selftext !== '' && child.data.is_self) {
                    continue;
                }

                const linkData = await LinkUtils.linkSwitch(child.data.url);

                if (linkData) {
                    links.push(linkData);
                }
            }

            this.links = links;

            this.timer = setInterval(() => {
                if (this.currentCount + 1 > this.links.length) {
                    return this.currentCount = 0;
                }

                this.currentCount++;
            }, 10000);
        },
        destroyed() {
        }
    }
</script>

<style lang="scss" scoped>
    .linkbox {
        height: 100%;
        width: 100%;
    }
</style>
