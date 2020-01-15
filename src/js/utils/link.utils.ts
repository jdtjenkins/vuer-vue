import axios from 'axios';

export class LinkUtils {
    public static linkSwitch(link: string){
        if (link.includes('gfycat')){
            return LinkUtils.gfycat(link);
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

        // if (link.includes('reddit.com/r/')) {
        //     return LinkUtils.subreddit(link);
        // }
    }

    public static async gfycat(link: string) {
        const slug = link.split('/').pop();

        const apiData = await axios.get(`https://api.gfycat.com/v1/gfycats/${slug}`);

        return {
            link,
            platform: 'video',
            transformedLink: link,
            mp4: apiData.data.gfyItem.mp4Url,
        };
    }

    public static async redditPost(link: string) {
        const apiData = await axios.get(`${link}.json`);

        console.log(apiData);

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

    public static async vReddit(link: string) {
        return {
            link,
            platform: 'video',
            transformedLink: link,
        }
    }

    public static async iReddit(link: string) {
        return {
            link,
            platform: 'image',
            transformedLink: link,
        }
    }

    public static async imgur(link: string) {
        const fileName = link.split('/').pop();
        const fileHash = fileName.split('.')[0];
        const fileType = fileName.split('.').pop();

        if (fileType === 'gifv') {
            const apiData = await axios.get(`https://api.imgur.com/3/image/${ fileHash }`);

            return {
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


    public static async pornhub(link: string) {
        const viewKey = link.split('?viewkey=').pop();

        return {
            link,
            platform: 'embed',
            transformedLink: `https://www.pornhub.com/embed/${ viewKey }`,
        }
    }

    // https://www.eporner.com/hd-porn/wdOE4NBPxXF/Pornstar-Roadtrip/
    public static async eporner(link: string) {
        const viewKey = link.split('/')[4];

        return {
            link,
            platform: 'embed',
            transformedLink: `https://www.eporner.com/embed/${ viewKey }`,
        }
    }

    // https://www.youtube.com/watch?v=HNt_4IXhO3Q
    public static async youtube(link: string) {
        const viewKey = link.split('?v=').pop();

        return {
            link,
            platform: 'embed',
            transformedLink: `https://www.youtube.com/embed/${ viewKey }?modestbranding=1`,
        }
    }

    // https://www.twitch.tv/claytonred
    public static async twitch(link: string) {
        const viewKey = link.split('/').pop();

        return {
            link,
            platform: 'embed',
            transformedLink: `https://player.twitch.tv?channel=${ viewKey }`,
        }
    }

    public static async subreddit(link: string) {
        return {
            link,
            platform: 'subreddit',
            transformedLink: link,
        }
    }

}
