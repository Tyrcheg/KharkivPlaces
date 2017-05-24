export class ShortFeed {
    title: any;
    textPreview: any;

    fullFeedId: any;

    placeId: any;
    placeName: any;

}

export class FullFeed {
    title: any;
    text: any;

    placeName: any;

    image: any;

    likes: [{ userId: string }]
    // comments: Comment[];
}

export class Comment {
    id: any;
    userId: any;
    text: any;
    dateTime: any;
}