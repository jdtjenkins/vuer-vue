<template>
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
       <button
           type="button"
           name="two-by-one"
           @click="changeLayout('two-by-one')"
           v-bind:class="{active: layout === 'two-by-one'}">2x1</button>
       <button
           type="button"
           name="one-by-two"
           @click="changeLayout('one-by-two')"
           v-bind:class="{active: layout === 'one-by-two'}">1x2</button>
      <div class="seperator"></div>
       <button
           type="button"
           name="save"
           @click="save">Save</button>
       <button
           type="button"
           name="load"
           @click="load">Load</button>
    </nav>
</template>

<script>
    import axios from 'axios';
    import { LinkUtils } from '../utils/link.utils';

    export default {
        name: 'nav-component',
        props: [
            'layout',
        ],
        methods: {
            changeLayout(layout) {
                this.$emit('changeLayout', layout);
            },
            save() {
                this.$emit('save');
            },
            load() {
                this.$emit('load');
            }
        },
    }
</script>

<style lang="scss" scoped>
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

        .seperator {
            flex-grow: 2;
            margin-top: auto;
        }
    }
</style>
