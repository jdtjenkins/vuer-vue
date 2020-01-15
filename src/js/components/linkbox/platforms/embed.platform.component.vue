<template>
    <iframe
        :src="link.transformedLink"
        allowfullscreen="true"
    ></iframe>
</template>

<script>
    export default {
        name: 'embed-platform',
        props: ['link'],
    }
</script>

<style lang="css" scoped>
    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
