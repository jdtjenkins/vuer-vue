<template>
	<div
		v-if="currentLink"
		class="wrapper"
	>
		<p
			v-if="error"
			class="error"
			>
			Cannot find
			<a
				:href="link"
				target="_blank"
				class="italic"
			>{{ link }}</a>
		</p>

		<linkbox
			v-else-if="links.length"
			class="linkbox"
			:link="currentLink"
		></linkbox>

		<div class="subreddit-controls">
			<input
				type="number"
				v-model="intervalTime"
			>
			<a
				:href="currentLink.redditLink"
				target="_blank"
			>
				<i>Reddit</i>
			</a>
			<a
				:href="currentLink.link"
				target="_blank"
			>
				<i>👆</i>
			</a>
			<button @click="back">
				<i>👈</i>
			</button>
			<button @click="forward">
				<i>👉</i>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import axios from 'axios';

	// Components
	import { Carousel, Slide } from 'vue-carousel';

	// Utils
	import { LinkUtils, Link } from '../../../utils/link.utils';

	interface LinkWithRedditLink extends Link {
		redditLink?: string;
	}

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
				after: null,
				timer: null,
				intervalTime: 30000,
				error: null,
			}
		},
		methods: {
			now() {
				return performance.now();
			},
			back() {
				this.currentCount--;
				this.setTimer();
			},
			async forward() {
				if (this.currentCount + 1 > this.links.length - 1) {
					await this.getLinks();
				}

				this.currentCount++;

				this.setTimer();
			},
			async getLinks() {
				let response;

				try {
					response = await axios.get(`${ this.link }.json${ this.after ? `?after=${ this.after }` : '' }`);

					this.after = response.data.data.after;
				} catch {
					this.$emit('subreddit-not-found', {
						link: this.link,
					});
					this.error = true;
					return;
				}

				const links = [];

				for (let child of response.data.data.children) {

					if (child.data.selftext !== '' && child.data.is_self) {
						continue;
					}

					try {
						const link = child.data.url;
						const redditLink = `https://www.reddit.com${ child.data.permalink }`;
						const linkData: LinkWithRedditLink = await LinkUtils.linkSwitch(link);
						linkData.redditLink = redditLink;

						if (linkData) {
							links.push(linkData);
						}
					} catch(e) {
						console.log(e);
					}
				}

				this.links = [
					...this.links,
					...links,
				];
			},
			setTimer(time = 10000) {
				if (this.timer) {
					clearInterval(this.timer);
				}

				this.timer = setInterval(async () => {
					await this.forward();
				}, this.intervalTime);
			},
		},
		computed: {
			currentLink() {
				if (this.links.length) {
					return this.links[this.currentCount];
				}
			},
		},
		async created() {
			await this.getLinks();
			await this.setTimer();
		},
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100%;
		width: 100%;

		&:hover {
			.subreddit-controls {
				opacity: 1;
			}
		}

		.subreddit-controls {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			opacity: 0;
			transition: all .2s ease-in-out;
			background: rgba(0,0,0,0);
			padding: 1rem;
			z-index: 2;

			*:not(:last-child) {
				margin-right: 0.5rem;
			}

			a, button {
				background: pink;
				border: none;
				border-radius: 100px;
				font-size: 1rem;
				padding: 0.5rem 1rem;
				cursor: pointer;
				color: #383F51;
				box-shadow: 0 0 5px rgba(0,0,0,0.2);

				i {
					display: inline-block;
					line-height: 1rem;
					font-style: initial;
				}
			}

			a {
				color: inherit;
				text-decoration: none;
			}

			input {
				border: none;
				border-bottom: 1px solid #fff;
				background: rgba(0,0,0,0.2);
				color: #fff;
				width: 100px;
				text-align: center;
			}
		}
	}

	.error {
		padding: 0.5rem 0.75rem;
		background-color: pink;
		border-radius: 5px;
		border: none;
		box-shadow: 0 0 5px rgba(0,0,0,0.2);

		.italic {
			color: darken(pink, 15%);
			text-decoration: none;
			font-style: italic;

			&:hover {
				color: darken(pink, 20%);
			}
		}
	}

</style>
