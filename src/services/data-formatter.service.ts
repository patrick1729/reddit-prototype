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
    formatHomeData(dataArray: Array<any>, keys: Array<string>): Array<any> {
        const formattedData = dataArray.map((data) => {
            let object = {};
            for (const key of keys) {
                object[key] = data.data[key];
            }
            object = this.getMediaType(this.getCommentCount(this.getLikeCount(object)));
            return object;
        });
        return formattedData;
    }

    /**
     * Comment data formatter
     *
     * @param {*} commentData Data received from API
     * @param {Array<string>} keys Keys to filter out
     * @returns {Array<any>} Formatted comment data
     * @memberof DataFormatterService
     */
    formatCommentData(commentData: any, keys: Array<string>): Array<any> {
        if (commentData) {
            commentData.pop();  // Remove last entry as it doesn't contain useful data
            const formattedData = commentData.map((data) => {
                let object: any = {};
                for (const key of keys) {
                    object[key] = data.data[key];
                }
                if (data.data && data.data.replies) {
                    const { data: { children } } = data.data.replies;
                    object['children'] = this.formatCommentData(children, keys);
                }
                object = this.getLikeCount(object);
                return object;
            });
            return formattedData;
        }
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
        data.ups = (difference > 1000) ? `${Math.floor(difference / 1000)}k` : String(difference);
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
