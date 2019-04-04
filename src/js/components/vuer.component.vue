<template>
    <div class="vuer">
        <nav>
            <button
                type="button"
                name="two-by-two"
                @click="changeLayout('one-by-one')"
                v-bind:class="{active: layout === 'one-by-one'}">1x1</button>
            <button
                type="button"
                name="two-by-two"
                @click="changeLayout('two-by-two')"
                v-bind:class="{active: layout === 'two-by-two'}">2x2</button>
            <button
                type="button"
                name="two-by-two"
                @click="changeLayout('three-by-three')"
                v-bind:class="{active: layout === 'three-by-three'}">3x3</button>
        </nav>
        <section class="links" v-bind:class="[layout]">
            <div class="media" v-for="link in links">
                <div class="controls">
                    <button
                        type="button"
                        name="button"
                        @click="resetLink(link.id)">🐔</button>
                </div>
                <input
                    type="text"
                    v-if="!link.transformedLink"
                    :value="link.link"
                    @change="updateLink(link.id, $event.target.value)">
                <video
                    autoplay
                    controls
                    loop
                    v-if="link.platform === 'gfycat'"
                    :poster="link.poster">
                    <source
                        v-if="link.mp4"
                        :src="link.mp4"
                        type="video/mp4">
                </video>
                <img
                    v-if="link.platform === 'image'"
                    :src="link.transformedLink">
                <iframe
                    v-if="link.platform === 'embed'"
                    :src="link.transformedLink"
                    allowfullscreen="true"
                    ></iframe>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import { LinkUtils } from '../utils/link.utils';

    export default {
        name: 'vuer-component',
        data() {
            return {
                layout: 'two-by-two',
            }
        },
        created() {

        },
        methods: {
            changeLayout(layout) {
                this.layout = layout;
            },
            updateLink(id, link) {
                this.$store.dispatch('LinkStore/updateLink', {
                    id,
                    link,
                })
            },
            resetLink(id){
                this.$store.dispatch('LinkStore/resetLink', {
                    id
                })
            }
        },
        computed: {
            links() {
                return this.$store.getters['LinkStore/getLinks'];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vuer {
        height: 100vh;
        width: 100%;
        overflow: hidden;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 75px auto;

        nav {
            background-color: pink;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;

            button {
                width: 100%;
                padding: 1rem 1rem;
                font-size: 1rem;
                background: none;
                border: 0;
                cursor: pointer;

                &:hover {
                    background: darken(pink, 5%);
                }

                &.active {
                    background: darken(pink, 10%);
                }
            }
        }

        .links {
            display: grid;
            grid-template-rows: repeat(1, 100%);
            grid-template-columns: repeat(1, 100%);

            .media {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                &:hover {
                    .controls {
                        opacity: 1;
                    }
                }

                .controls {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    opacity: 0;
                    transition: all .2s ease-in-out;
                    background: rgba(0,0,0,0);

                    button {
                        background: none;
                        border: none;
                        font-size: 1rem;
                        padding: 0.5rem;
                        cursor: pointer;
                    }
                }

                video {
                    width: 100%;
                    max-width: 100%;
                    max-height: 100%;
                }

                img {
                    width: auto;
                    max-width: 100%;
                    max-height: 100%;
                }

                iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    background: none;
                }
            }

            &.two-by-two {
                grid-template-rows: repeat(2, 50%);
                grid-template-columns: repeat(2, 1fr);
            }

            &.three-by-three {
                grid-template-rows: repeat(3, 1fr);
                grid-template-columns: repeat(3, 1fr);
            }
        }

    }
</style>