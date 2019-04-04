import { ActionContext } from 'vuex';
import { LinkUtils } from '../utils/link.utils';

interface updateLink {
    id: number;
    link: string;
}

interface Link {
    id: number;
    link: string;
    show: boolean;
    platform: string;
    transformedLink: string;
}

interface State {
        defaultLink: Partial<Link>;
        links: Link[];
}

export default {
    state: <State>{
        defaultLink: {
            link: null,
            show: null,
            platform: null,
            transformedLink: null,
        },
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
            })
        }
    },
    actions: {
        async updateLink(context: ActionContext<updateLink, State>, {id, link}: updateLink) {
            context.commit('updateLink', {
                id,
                ... await LinkUtils.linkSwitch(link),
            });
        },
        resetLink(context: ActionContext<State, State>, { id }: {id: number}){
            context.commit('updateLink', {
                id,
                ...context.state.defaultLink,
            })
        }
    },
    getters: {
        getLinks(state: State) {
            return state.links.map(link => link);
        }
    },
}
