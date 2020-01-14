<template>
    <img
        :src="link.transformedLink"
    >
</template>

<script>
    export default {
        name: 'image-platform',
        props: ['link'],
    }
</script>

<style lang="css" scoped>
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
</style>
