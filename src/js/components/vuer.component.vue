<template>
	<div class="vuer">
		<div class="grid">
			<div class="nav">
				<nav-component
					:layout="layout"
					@changeLayout="changeLayout"
					@save="saveBoard"
					@load="loadBoard"
					@delete="deleteBoard"
				></nav-component>
			</div>
			<section class="links" v-bind:class="[layout]">
				<div class="media" v-for="link in links" v-bind:key="`${link.id} ${link.link}`">
					<div
						v-if="link.link"
						class="controls"
					>
						<button
							type="button"
							name="button"
							class="reset-button"
							@click="resetLink(link.id)">Reset</button>
					</div>

					<input
						v-if="!link.transformedLink"
						type="text"
						placeholder="Reddit, Subreddit, Imgur, Gfycat, Youtube, Twitch url"
						:value="link.link"
						@change="updateLink(link.id, $event.target.value)"
					>

					<linkbox
						v-if="link.link"
						:link="link"
						@error="linkboxError"
					></linkbox>
				</div>
			</section>
		</div>
		<portal-target name="modals"></portal-target>
	</div>
</template>

<script>
	import axios from 'axios';
	import { LinkUtils } from '../utils/link.utils';

	// Services
	import StorageService from '../services/storage.service';

	// Components
	import NavComponent from './nav.component';
	import Linkbox from './linkbox/linkbox.component';

	export default {
		name: 'vuer-component',
		components: {
			'nav-component': NavComponent,
			'linkbox': Linkbox,
		},
		data() {
			return {
				layout: 'two-by-two',
				test: 'hello',
			}
		},
		created() {
		},
		methods: {
			changeLayout(layout) {
				this.layout = layout;
			},

			// Current board links
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

			// Boards
			saveBoard(payload) {
				StorageService.save({
					state: this.$store.state.LinkStore,
					name: payload.name,
				});
			},
			loadBoard(name) {
				const newState = StorageService.load(name);

				this.setState(newState);
			},
			deleteBoard(name) {
				StorageService.delete(name);
			},
			linkboxError(event, link) {
				console.log(event);
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
		max-height: 100vh;
		width: 100%;

		.grid {
			height: 100%;
			width: 100%;
			overflow: hidden;
			display: grid;
			grid-template-rows: auto 40px;
			grid-template-columns: 100%;

			@media screen and (min-width: 768px) {
				grid-template-rows: 100%;
				grid-template-columns: 60px auto;

			}
		}

		.nav {
			grid-row: 2;
			
			@media screen and (min-width: 768px) {
				grid-column: 1;
				grid-row: 1;
			}
		}

		.links {
			display: grid;
			grid-template-rows: repeat(1, 100%);
			grid-template-columns: repeat(1, 100%);
			height: 100%;

			.media {
				align-items: center;
				justify-content: center;
				position: relative;
				flex-direction: column;
				width: 100%;
				height: 100%;
				display: none;

				&:hover {
					.controls {
						opacity: 1;
					}
				}

				.controls {
					position: absolute;
					top: 0;
					left: 0;
					width: 50%;
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

				.linkbox {
					width: 100%;
					max-width: 100%;
					max-height: 100%;
					z-index: 1;
					position: relative;
				}
			}

			&.one-by-one {
				.media:nth-child(1) {
					display: flex;
				}
			}

			&.two-by-one {
				grid-template-rows: 100%;
				grid-template-columns: repeat(2, 1fr);

				.media:nth-child(1), .media:nth-child(2) {
					display: flex;
				}
			}

			&.one-by-two {
				grid-template-rows: repeat(2, minmax(50%, 50%));
				grid-template-columns: 100%;

				.media:nth-child(1), .media:nth-child(2) {
					display: flex;
				}
			}

			&.two-by-two {
				grid-template-rows: repeat(2, 50%);
				grid-template-columns: repeat(2, 50%);

				.media:nth-child(1),
				.media:nth-child(2),
				.media:nth-child(3),
				.media:nth-child(4) {
					display: flex;
				}
			}

			&.three-by-three {
				grid-template-rows: repeat(3, 33%);
				grid-template-columns: repeat(3, 33%);

				.media {
					display: flex;
				}
			}
		}

	}
</style>
