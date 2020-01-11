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

export interface IState {
        links?: Link[];
}

const defaultLink = {
    link: null,
    show: null,
    platform: null,
    transformedLink: null,
}

export default {
    state: <IState>{
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
        updateLink(state: IState, payload: updateLink){
            state.links = state.links.map(link => {
                if (link.id !== payload.id){
                    return link;
                }

                return {
                    ...link,
                    ...payload,
                }
            })
        },
        setState(state: IState, payload: IState) {
            state.links = [
                ...payload.links,
            ];
        }
    },
    actions: {
        async updateLink(context: ActionContext<updateLink, IState>, {id, link}: updateLink) {
            context.commit('updateLink', {
                id,
                ... await LinkUtils.linkSwitch(link),
            });
        },
        resetLink(context: ActionContext<IState, IState>, { id }: {id: number}){
            context.commit('updateLink', {
                id,
                ...defaultLink,
            })
        },
        setState(context: ActionContext<IState, IState>, newState: IState) {
            context.commit('setState', newState);
        }
    },
    getters: {
        getLinks(state: IState) {
            return state.links.map(link => link);
        }
    },
}
