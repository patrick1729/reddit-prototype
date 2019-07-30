import { Component, OnInit } from '@angular/core';

import { DataFormatterService } from 'src/services/data-formatter.service';
import { HttpConnectHandlerService } from 'src/services/http-connect-handler.service';

import { HOME_DATA_KEYS } from './home.constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    /**
     * Feeds instance contains all the feeds
     *
     * @type {*}
     * @memberof HomeComponent
     */
    redditFeeds: any;

    /** @ignore */
    constructor(
        private httpConnectHandler: HttpConnectHandlerService,
        private dataFormatterService: DataFormatterService
    ) { }

    /**
     * Calls the API to fetch feeds
     *
     * @memberof HomeComponent
     */
    ngOnInit(): void {
        this.httpConnectHandler.callWebservice('https://www.reddit.com/.json').subscribe(
            (data) => {
                this.redditFeeds = this.dataFormatterService.formatHomeData(data.data.children, HOME_DATA_KEYS);
                console.log(this.redditFeeds);
            });
    }

    /**
     * Handler for like post action button
     *
     * @param {number} postIndex Index of the post in feeds record
     * @memberof HomeComponent
     */
    likePost(postIndex: number): void {
        this.redditFeeds[postIndex]['isLiked'] = !this.redditFeeds[postIndex]['isLiked'];
    }

}
