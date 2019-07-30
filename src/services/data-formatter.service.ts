import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Provider to format data
 *
 * @export
 * @class DataFormatterService
 */
@Injectable({
    providedIn: 'root'
})
export class DataFormatterService {

    /** @ignore */
    constructor(
        private sanitizer: DomSanitizer
    ) { }

    /**
     * Formatter function to format data for home page, reduces the large JSON data
     * to include only keys that are required
     *
     * @param {Array<any>} dataArray JSON data received from API
     * @param {Array<any>} keys Keys to filter out
     * @returns {Array<any>} Formatted JSON data with requested 'keys' in it
     * @memberof DataFormatterService
     */
    formatHomeData(dataArray: Array<any>, keys: Array<any>): Array<any> {
        const formattedData = dataArray.map((data) => {
            let object = {};
            for (const key of keys) {
                object[key] = data.data[key];
            }
            object = this.getLikeCount(object);
            object = this.getCommentCount(object);
            object = this.getMediaType(object);
            return object;
        });
        return formattedData;
    }

    /**
     * Calculates the net like/upvote count of any feed
     *
     * @param {*} data Data to be formatted
     * @returns {*} Formatted data with net likes/upvotes
     * @memberof DataFormatterService
     */
    getLikeCount(data: any): any {
        const difference = data.ups - data.downs;
        data.ups = (difference > 1024) ? `${Math.floor(difference / 1024)}k` : difference;
        return data;
    }

    /**
     * Calculates the net comment count of any feed
     *
     * @param {*} data Data to be formatted
     * @returns {*} Formatted data with net comment count
     * @memberof DataFormatterService
     */
    getCommentCount(data: any): any {
        data.num_comments = (data.num_comments > 1024) ? `${Math.floor(data.num_comments / 1024)}k` : data.num_comments;
        return data;
    }

    /**
     * Calculates the type of media (link, image or video) attached in
     * a feed
     *
     * @param {*} data Data to be formatted
     * @returns {*} Formatted data with media type
     * @memberof DataFormatterService
     */
    getMediaType(data: any): any {
        if (data.url && data.url.endsWith('.jpg') || data.url.endsWith('.png') || data.url.endsWith('.gif')) {
            data['isImage'] = true;
        } else if (data.preview && data.preview.reddit_video_preview) {
            data.url = data.preview.reddit_video_preview.fallback_url;
            data['isVideo'] = true;
        } else if (data.url && data.url.includes('youtube.com')) {
            data.url = data.url.replace('m.youtube.com', 'www.youtube.com');
            data.url = data.url.replace('watch?v=', 'embed/');
            data['isVideo'] = true;
        } else {
            data['isLink'] = true;
        }
        data.url = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        return data;
    }
}
