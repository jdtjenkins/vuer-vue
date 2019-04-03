import axios from 'axios';

export class LinkUtils {
    public static linkSwitch(link: string){
        if (link.includes('gfycat')){
            return LinkUtils.gfycat(link);
        }
    }

    public static async gfycat(link: string) {
        const slug = link.split('/')[link.split('/').length - 1];

        const apiData = await axios.get(`https://api.gfycat.com/v1/gfycats/${slug}`);

        return {
            link,
            platform: 'gfycat',
            transformedLink: link,
            mp4: apiData.data.gfyItem.mp4Url,
        };
    }
}
