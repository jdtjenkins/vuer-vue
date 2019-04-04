import axios from 'axios';

export class LinkUtils {
    public static linkSwitch(link: string){
        if (link.includes('gfycat')){
            return LinkUtils.gfycat(link);
        }

        if (link.includes('reddit') && link.includes('comments')){
            return LinkUtils.redditPost(link);
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
    }

    public static async gfycat(link: string) {
        const slug = link.split('/').pop();

        const apiData = await axios.get(`https://api.gfycat.com/v1/gfycats/${slug}`);

        return {
            link,
            platform: 'gfycat',
            transformedLink: link,
            mp4: apiData.data.gfyItem.mp4Url,
        };
    }

    public static async redditPost(link: string) {
        const apiData = await axios.get(`${link}.json`);

        const postData = apiData.data[0].data.children[0].data;

        if (postData.url.includes('gfycat')){
            return LinkUtils.gfycat(postData.url);
        }

        return {
            link,
            platform: 'image',
            transformedLink: postData.url,
        }
    }

    public static async iReddit(link: string) {
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
}
