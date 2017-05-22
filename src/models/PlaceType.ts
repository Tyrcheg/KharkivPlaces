export class PlaceTypeObj {
    name: PlaceType;
    placesCount: number;
    places: PlaceForPlaceType [];
}

export class PlaceForPlaceType {
    id: number;
    name: string;
}

export enum PlaceType {
    Клуб,
    Ресторан,
    PartyBar,
    HookahBar,
    CocktailBar,
    Лаунж,
    Паб,
    Пивная,
    Бар,
    Кафе,
    Пиццерия,
    Кофейня,
    СушиБар
}