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
		   @click="$modal.show('save-board')">Save</button>
	   <button
		   type="button"
		   name="load"
		   @click="$modal.show('load-board')">Load</button>
	   <p class="version">v1.1</p>

	   <!-- Modals -->
		<portal to="modals">
			<modal
				name="save-board"
				height="auto"
				:adaptive="true"
			>
				<section class="modal-state" id="modal-save-name">
					<form name="save-form" @submit.prevent="saveBoard">
						<label>
							<span>Choose a name for this board</span>
							<input type="text">
						</label>
						<input type="submit" name="save-name" value="Submit">
					</form>
				</section>
			</modal>
			<modal
				name="load-board"
				height="auto"
				:scrollable="true"
				:adaptive="true"
				@before-open="beforeLoadModalOpens"
			>
				<section class="modal-state" id="modal-load-name">
					<div v-if="savedStates.length === 0">
						You have no saved boards 🤷‍♀️
					</div>
					<div v-if="savedStates.length">
						<p>Choose a board:</p>
						<ul>
							<li
								v-for="name in savedStates"
								v-bind:key="name.id"
								@click.prevent="loadBoard(name)"
							>
								{{ name }}
								<button
									type="button"
									name="delete-board"
									@click.prevent="deleteBoard($event, name)"
								>Delete</button>
							</li>
						</ul>
					</div>
				</section>
			</modal>
		</portal>
	</nav>
</template>

<script>
	import axios from 'axios';
	import { LinkUtils } from '../utils/link.utils';
	import StorageService from '../services/storage.service';

	export default {
		name: 'nav-component',
		props: [
			'layout',
		],
		data() {
			return {
				savedStates: [],
			}
		},
		methods: {
			changeLayout(layout) {
				this.$emit('changeLayout', layout);
			},
			saveBoard(event) {
				this.$emit('save', {
					name: event.target.elements[0].value,
				});

				this.$modal.hide('save-board')
			},
			loadBoard(name) {
				this.$emit('load', name);
				this.$modal.hide('load-board')
			},
			deleteBoard(event, name) {
				event.stopPropagation();
				this.$emit('delete', name);
				this.loadBoardNames();
			},
			loadBoardNames() {
				this.savedStates = StorageService.names;
			},
			beforeLoadModalOpens() {
				this.loadBoardNames();
			},
		},
	}
</script>

<style lang="scss" scoped>
	nav {
		background-color: pink;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		height: 100%;
		width: 100%;
		overflow: scroll hidden;

		@media screen and (min-width: 768px) {
			flex-direction: column;
			overflow: hidden;

		}

		button {
			width: 40%;
			min-width: 40%;
			padding: 1rem 0.5rem;
			font-size: 0.9rem;
			background: none;
			border: 0;
			cursor: pointer;

			@media screen and (min-width: 768px) {
				width: 100%;
				min-width: 100%;
			}

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

		p.version {
			color: rgba(0,0,0,0.75);
			text-align: center;
			font-size: 0.75rem;
			padding: 0.5rem;
		}
	}

	.modal-state {
		background: white;
		height: 100%;
		width: 100%;
		padding: 1.5rem 2rem;
		border: none;
		border-radius: 5px;
		text-align: center;
		box-shadow: 0 0 10px rgba(0,0,0,0.2);
	}

	#modal-save-name {
		label {
			display: block;
			margin-bottom: 1rem;
		}

		span {
			margin-right: 1rem;
			margin-bottom: 1rem;
			display: block;
		}

		input[type="submit"] {
			border: none;
			text-align: center;
			padding: 0.5rem 0.25rem;
			border-radius: 50px;
			box-shadow: 0 0 10px rgba(0,0,0,0.2);
			width: 50%;
			background-color: pink;
			cursor: pointer;

			&:hover {
				background-color: darken(pink, 10%);
			}
		}
	}

	#modal-load-name {
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #e6e6e6;
			text-align: left;
			padding: 0.5rem 1rem;
			border-radius: 5px;
			border: 1px solid #e3e3e3;
			transition: background-color 0.2s ease-in-out;
			cursor: pointer;

			&:hover {
				background-color: pink;

				button {
					background-color: lighten(pink, 5%);
				}
			}

			&:not(:last-child) {
				margin-bottom: 1rem;
			}

			button {
				border: none;
				text-align: center;
				padding: 0.5rem 1rem;
				border-radius: 50px;
				box-shadow: 0 0 2px rgba(0,0,0,0.2);
				background-color: pink;
				cursor: pointer;
				transition: background-color 0.1s ease-in-out;

				&:hover {
					background-color: lighten(pink, 10%);
				}
			}
		}
	}
</style>

<style lang="scss">
	.v--modal-overlay[data-modal="save-board"] .v--modal {
		background: none;
		box-shadow: none;
		overflow: visible;
	}
</style>
