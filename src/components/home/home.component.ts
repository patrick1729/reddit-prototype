import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize, retry } from 'rxjs/operators';

import { DataFormatterService } from 'src/services/data-formatter.service';
import { DataService } from 'src/services/data.service';
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
    /**
     * Flag to show progress bar, true when making service calls
     *
     * @type {boolean}
     * @memberof HomeComponent
     */
    shouldShowProgressBar: boolean;

    /** @ignore */
    constructor(
        private httpConnectHandler: HttpConnectHandlerService,
        private dataFormatterService: DataFormatterService,
        private dataService: DataService,
        private router: Router,
        private snackbar: MatSnackBar
    ) { }

    /**
     * Calls the API to fetch feeds
     *
     * @memberof HomeComponent
     */
    ngOnInit(): void {
        this.shouldShowProgressBar = true;
        this.httpConnectHandler.callWebservice('https://www.reddit.com/.json').pipe(
            retry(3),
            finalize(() => this.shouldShowProgressBar = false)
        ).subscribe(
            (data) => {
                this.redditFeeds = this.dataFormatterService.formatHomeData(data.data.children, HOME_DATA_KEYS);
            },
            () => {
                this.showSnackBar('No Internet Connection', 3000, ['no-internet']);
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

    /**
     * Displays the snackbar
     *
     * @param {string} message Message to be displayed
     * @param {number} duration Duration of snackbar
     * @param {Array<string>} [classes] Classes to be applied to snackbar
     * @memberof HomeComponent
     */
    showSnackBar(message: string, duration: number, classes?: Array<string>): void {
        this.snackbar.open(message, null, {
            duration,
            panelClass: classes
        });
    }

    /**
     * Loads the comments on a feed
     *
     * @param {string} permalink Link to get the comments on a post
     * @memberof HomeComponent
     */
    loadComments(permalink: string): void {
        this.shouldShowProgressBar = true;
        this.httpConnectHandler.callWebservice(`https://www.reddit.com${permalink}.json`)
            .pipe(
                retry(3),
                finalize(() => this.shouldShowProgressBar = false)
            ).subscribe(
                (data) => {
                    if (data.length > 1) {
                        const { data: { children } } = data[1];
                        this.dataService.setCommentsData(children);
                        this.router.navigateByUrl('/detail');
                    }
                });
    }
}
