import { LinkUtils } from '../utils/link.utils';

interface updateLink {
    id: number;
    link: string;
}

export default {
    state: {
        links: [
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
        updateLink(state, payload: updateLink){
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
        async updateLink(context, {id, link}: updateLink) {
            console.log(id, link);
            context.commit('updateLink', {
                id,
                ... await LinkUtils.linkSwitch(link),
            });
        }
    },
    getters: {
        getLinks(state) {
            return state.links.map(link => link);
        }
    },
}
