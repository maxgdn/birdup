import { observable, action, computed, toJS } from "mobx";
import Bird from '../domain/Bird';
import Sighting from "../domain/Sighting";

import {deleteBird} from '../client';

import { BirdStore } from "../stores";

export default class BirdModel {
    public store: BirdStore;
    @observable
    public id: string;

    @observable
    public genusName: string;

    @observable
    public name: string;

    @observable
    public sightings: Sighting[]

    constructor(bird: Bird, store: BirdStore) {
        this.store = store;

        this.id = bird.id;
        this.genusName = bird.genusName;
        this.name = bird.name;
        this.sightings = bird.sightings;
    }

    @action
    public async delete() {
        try {
            await deleteBird(this.id);
            this.store.remove(this.id);
        } catch (error) {
            throw new Error("Problem encountered deleting bird");
        }
    }

    toJS(): Bird {
        return {
            id: this.id,
            genusName: this.genusName,
            name: this.name,
            sightings: this.sightings,
        }
    }
}