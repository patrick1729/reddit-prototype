/**
 * Feed data with nested structure.
 * Each node has author, body, ups, created and an optional list of children.
 */
export interface FeedNode {
    author: string;
    body: string;
    ups: string;
    created: number;
    children?: FeedNode[];
}

/** Flat node with expandable and level information */
export interface FeedFlatNode {
    expandable: boolean;
    data: any;
    level: number;
}
