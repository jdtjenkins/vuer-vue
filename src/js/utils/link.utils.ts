import {
	AxiosResponse,
} from 'axios';

import axios from 'axios';

export interface Link {
	id?: number;
	link: string;
	platform: string;
	show?: boolean;
	transformedLink?: string;
	mp4?: string;
}

export class LinkUtils {
	public static async linkSwitch(link: string): Promise<Link> {

		if (link.includes('gfycat')){
			return LinkUtils.gfycat(link);
		}

		// https://www.redgifs.com/watch/uniqueoffensivehoki
		if (link.includes('redgifs')){
			return LinkUtils.redgifs(link);
		}

		if (link.includes('reddit') && link.includes('comments')){
			return LinkUtils.redditPost(link);
		}

		/** This won't work for now. v.redd.it does not allow embedding videos */
		// if (link.includes('v.redd.it')) {
		//     return LinkUtils.vReddit(link);
		// }

		if (link.includes('imgur')) {
			return LinkUtils.imgur(link);
		}

		if (link.includes('pornhub')){
			return LinkUtils.pornhub(link);
		}

		if (link.includes('eporner')){
			return LinkUtils.eporner(link);
		}

		if (link.includes('i.redd.it') || link.includes('i.redditmedia.com')){
			return LinkUtils.iReddit(link);
		}

		if (link.includes('youtube')) {
			return LinkUtils.youtube(link);
		}

		if (link.includes('twitch')) {
			return LinkUtils.twitch(link);
		}

		if ((new RegExp('reddit.com\/r\/.*(\/?)$').test(link))) {
			return LinkUtils.subreddit(link);
		}
	}

	public static async gfycat(link: string): Promise<Link> {
		let slug = link.split('/').pop();
		slug = slug.replace('.gif', '');

		let apiData: AxiosResponse;

		try {
			apiData = await axios.get(`https://api.gfycat.com/v1/gfycats/${slug}`);
		} catch(e) {
			throw new Error(e)
		}

		return {
			link,
			platform: 'video',
			transformedLink: link,
			mp4: apiData.data.gfyItem.mp4Url,
		};
	}

	public static async redgifs(link: string): Promise<Link> {
		const iframeLink = link.replace('watch', 'ifr');

		return {
			link,
			platform: 'embed',
			transformedLink: iframeLink,
		};
	}

	public static async redditPost(link: string): Promise<Link> {
		let apiData: AxiosResponse;

		try {
			apiData = await axios.get(`${link}.json`);
		} catch(e) {
			throw new Error(e);
		}

		const postData = apiData.data[0].data.children[0].data;

		if (postData.url.includes('gfycat')){
			return LinkUtils.gfycat(postData.url);
		}

		if (postData.url.includes('v.redd.it')) {
			const vRedditVideoUrl = apiData.data[0].data.children[0].data.secure_media.reddit_video.fallback_url;
			return LinkUtils.vReddit(vRedditVideoUrl);
		}

		return {
			link,
			platform: 'image',
			transformedLink: postData.url,
		}
	}

	public static async vReddit(link: string): Promise<Link> {
		return {
			link,
			platform: 'video',
			transformedLink: link,
		}
	}

	public static async iReddit(link: string): Promise<Link> {
		return {
			link,
			platform: 'image',
			transformedLink: link,
		}
	}

	public static async imgur(link: string): Promise<Link> {
		const fileName = link.split('/').pop();
		const fileHash = fileName.split('.')[0];
		const fileType = fileName.split('.').pop();

		if (fileType === 'gifv') {
			let apiData: AxiosResponse;

			try {
				apiData = await axios.get(`https://api.imgur.com/3/image/${ fileHash }`);
			} catch(e) {
				throw new Error(e);
			}

			return {
				id: performance.now(),
				link,
				platform: 'video',
				transformedLink: link,
				mp4: apiData.data.data.mp4,
			};
		}

		return {
			link,
			platform: 'image',
			transformedLink: link,
		}
	}


	public static async pornhub(link: string): Promise<Link> {
		const viewKey = link.split('?viewkey=').pop();

		return {
			link,
			platform: 'embed',
			transformedLink: `https://www.pornhub.com/embed/${ viewKey }`,
		}
	}

	// https://www.eporner.com/hd-porn/wdOE4NBPxXF/Pornstar-Roadtrip/
	public static async eporner(link: string): Promise<Link> {
		const viewKey = link.split('/')[4];

		return {
			link,
			platform: 'embed',
			transformedLink: `https://www.eporner.com/embed/${ viewKey }`,
		}
	}

	// https://www.youtube.com/watch?v=HNt_4IXhO3Q
	public static async youtube(link: string): Promise<Link> {
		const viewKey = link.split('?v=').pop();

		return {
			link,
			platform: 'embed',
			transformedLink: `https://www.youtube.com/embed/${ viewKey }?modestbranding=1`,
		}
	}

	// https://www.twitch.tv/claytonred
	public static async twitch(link: string): Promise<Link> {
		const viewKey = link.split('/').pop();

		return {
			link,
			platform: 'embed',
			transformedLink: `https://player.twitch.tv?channel=${ viewKey }&parent=vuer.xyz`,
		}
	}

	// https://www.reddit.com/r/pics
	public static async subreddit(link: string): Promise<Link> {
		return {
			link,
			platform: 'subreddit',
			transformedLink: link,
		}
	}

}
