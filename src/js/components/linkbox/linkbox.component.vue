<template>
	<div class="linkbox">
		<video-platform
			v-if="link.platform === 'video'"
			:link="link"
		></video-platform>

		<image-platform
			v-else-if="link.platform === 'image'"
			:link="link"
		></image-platform>

		<embed-platform
			v-else-if="link.platform === 'embed'"
			:link="link"
		></embed-platform>

		<subreddit-platform
			v-else-if="link.platform === 'subreddit'"
			:link="link.transformedLink"
		></subreddit-platform>

	</div>
</template>

<script>
	import VideoPlatform from './platforms/video.platform.component';
	import SubredditPlatform from './platforms/subreddit.platform.component';
	import ImagePlatform from './platforms/image.platform.component';
	import EmbedPlatform from './platforms/embed.platform.component';

	export default {
		name: 'linkbox',
		props: ['link'],
		components: {
			'video-platform': VideoPlatform,
			'subreddit-platform': SubredditPlatform,
			'embed-platform': EmbedPlatform,
			'image-platform': ImagePlatform,
		},
	}
</script>

<style lang="scss" scoped>
	.linkbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
