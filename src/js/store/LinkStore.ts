import { ActionContext } from 'vuex';
import { LinkUtils, Link } from '../utils/link.utils';

interface updateLink {
	id: number;
	link: string;
}

export interface State {
	links?: Link[];
}

const defaultLink = {
	link: null,
	show: null,
	platform: null,
	transformedLink: null,
}

export default {
	state: <State>{
		links: <Link[]>[
		  {
			id: 1,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 2,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 3,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 4,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 5,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 6,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 7,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 8,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  },
		  {
			id: 9,
			link: null,
			show: null,
			platform: null,
			transformedLink: null,
		  }
		]
	},
	mutations: {
		updateLink(state: State, payload: updateLink){
			state.links = state.links.map(link => {
				if (link.id !== payload.id){
					return link;
				}

				return {
					...link,
					...payload,
				}
			});
		},
		setState(state: State, payload: State) {
			state.links = [
				...payload.links,
			];
		}
	},
	actions: {
		async updateLink(context: ActionContext<updateLink, State>, {id, link}: updateLink) {
			let linkObject: Link;

			try {
				linkObject = await LinkUtils.linkSwitch(link);
			} catch(e) {
				console.log('ad')
				console.log(e);
			}

			context.commit('updateLink', {
				id,
				...linkObject,
			});
		},
		resetLink(context: ActionContext<State, State>, { id }: {id: number}){
			context.commit('updateLink', {
				id,
				...defaultLink,
			})
		},
		setState(context: ActionContext<State, State>, newState: State) {
			context.commit('setState', newState);
		}
	},
	getters: {
		getLinks(state: State) {
			return state.links.map(link => link);
		}
	},
}
