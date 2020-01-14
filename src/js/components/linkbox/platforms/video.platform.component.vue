<template>
    <video
        v-if="link.platform === 'video'"
        autoplay
        controls
        loop
        :poster="link.poster">
        <source
        v-if="link.mp4"
        :src="link.mp4"
        type="video/mp4">
    </video>
</template>

<script>
    export default {
        name: 'video-platform',
        props: ['link'],
    }
</script>

<style lang="css" scoped>
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
</style>
