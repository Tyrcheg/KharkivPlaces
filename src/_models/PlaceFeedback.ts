export class PlaceFeedback {
    placeId: string;
    text: string;
    userId: string;
    isAnonymous: boolean;
    date: string = Date.now.toString();
}