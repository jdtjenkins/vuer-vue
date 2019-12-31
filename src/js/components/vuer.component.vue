<template>
    <div class="vuer">
        <nav-component
            :layout="layout"
            @changeLayout="changeLayout"
            @save="save"
            @load="load"
            ></nav-component>
        <section class="links" v-bind:class="[layout]">
            <div class="media" v-for="link in links">
                <div class="controls">
                    <button
                        type="button"
                        name="button"
                        class="reset-button"
                        @click="resetLink(link.id)">Reset</button>
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
                    v-if="link.platform === 'video'"
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
    import StorageService from '../services/storage.service';
    import NavComponent from './nav.component';

    export default {
        name: 'vuer-component',
        components: {
            'nav-component': NavComponent,
        },
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
            },
            setState(state) {
                this.$store.dispatch('LinkStore/setState', state);
            },
            save() {
                console.log('a');
                StorageService.saveState(this.$store.state.LinkStore);
            },
            load() {
                const newState = StorageService.loadState();

                this.setState(newState);
            },
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
                    padding: 1rem;
                    z-index: 2;

                    button {
                        background: pink;
                        border: none;
                        border-radius: 100px;
                        font-size: 1rem;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        color: #383F51;
                        box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    }
                }

                video {
                    width: 100%;
                    max-width: 100%;
                    max-height: 100%;
                    z-index: 1;
                    position: relative;
                }

                img {
                    width: auto;
                    max-width: 100%;
                    max-height: 100%;
                    z-index: 1;
                    position: relative;
                }

                iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    background: none;
                    z-index: 1;
                    position: relative;
                }
            }

            &.two-by-one {
                grid-template-rows: 100%;
                grid-template-columns: repeat(2, 1fr);
            }

            &.one-by-two {
                grid-template-rows: repeat(2, 50%);
                grid-template-columns: 100%;
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
