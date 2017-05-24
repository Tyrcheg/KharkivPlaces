export class ShortFeed {
    title: any;
    textPreview: any;

    fullFeedId: any;

    placeId: any;
    placeName: any;

    image: any;
}

export class FullFeed {
    title: any;
    text: any;

    placeId: any;
    placeName: any;

    image: any;

    // comments: Comment[];
}

export class Comment {
    id: any;
    userId: any;
    text: any;
    dateTime: any;
}