import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    /**
     * Stores comments' data
     *
     * @private
     * @type {*}
     * @memberof DataService
     */
    private comments: any;

    /** @ignore */
    constructor() { }

    /**
     * Sets the data for comments on a feed
     *
     * @param {*} comments Comments received for a feed
     * @memberof DataService
     */
    setCommentsData(comments: any) {
        this.comments = comments;
    }

    /**
     * Returns the comments received for a particular feed
     *
     * @returns {*} Comments of a feed
     * @memberof DataService
     */
    getCommentsData(): any {
        return this.comments;
    }

    /**
     * Clears the service data
     *
     * @memberof DataService
     */
    clearData(): void {
        this.comments = null;
    }
}
