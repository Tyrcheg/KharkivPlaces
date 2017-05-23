export class Place {
    name: any;
    address: any;
    rating: number;
    placeType: any;
    location: {
        lat: any,
        lon: any
    };
    followersRefId: true;
    ratingsRefId: true;
}

export class PlaceRatings {
    placeId: any;
    placeRatings: PlaceRating[];
}

export class PlaceRating {
    userId: string;
    usersGrade: number
}
