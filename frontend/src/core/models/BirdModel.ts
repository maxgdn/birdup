import { observable, action, computed, toJS } from "mobx";
import Bird from '../domain/Bird';
import Sighting from "../domain/Sighting";

export default class BirdModel {
    store
    @observable
    public id: string;

    @observable
    public genusName: string;

    @observable
    public name: string;

    @observable
    public sightings: Sighting[]

    constructor(bird: Bird, store) {
        this.store = store;

        this.id = bird.id;
        this.genusName = bird.genusName;
        this.name = bird.name;
        this.sightings = bird.sightings;
    }

    //can delete self
}