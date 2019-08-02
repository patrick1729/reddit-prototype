import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, AfterViewInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';

import { DataFormatterService } from 'src/services/data-formatter.service';
import { DataService } from 'src/services/data.service';

import { DETAILS_DATA_KEYS } from './details.constants';
import { FeedFlatNode, FeedNode } from './details.interface';

/**
 * Details component, loads the comments on a particular feed
 *
 * @export
 * @class DetailsComponent
 */
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements AfterViewInit {

    /** @ignore */
    constructor(
        private dataFormatter: DataFormatterService,
        private dataService: DataService,
        private router: Router
    ) {
        this.dataSource.data = this.dataFormatter.formatCommentData(this.dataService.getCommentsData(), DETAILS_DATA_KEYS);
    }

    /**
     * Tree controller that constructs the flat tree
     *
     * @memberof DetailsComponent
     */
    treeControl = new FlatTreeControl<FeedFlatNode>(
        node => node.level, node => node.expandable);

    /**
     * Flattener that provides transform function for flattening
     *
     * @memberof DetailsComponent
     */
    treeFlattener = new MatTreeFlattener(
        (node: FeedNode, level: number) => {
            return {
                expandable: !!node.children && node.children.length > 0,
                data: { author: node.author, body: node.body, upvotes: node.ups, created: node.created },
                level
            };
        }, node => node.level, node => node.expandable, node => node.children);

    /**
     * Data source for Mat tree
     *
     * @memberof DetailsComponent
     */
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    /**
     * Returns true if node is expandable
     *
     * @memberof DetailsComponent
     */
    hasChild = (_: number, node: FeedFlatNode) => node.expandable;

    /**
     * Navigates back to home page
     *
     * @memberof DetailsComponent
     */
    navigateBack(): void {
        this.router.navigateByUrl('/home');
    }

    /**
     * Scroll to top of the page
     *
     * @memberof DetailsComponent
     */
    ngAfterViewInit(): void {
        window.scrollTo(0, 0);
    }
}
