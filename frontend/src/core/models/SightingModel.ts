import { observable, action, computed, runInAction, toJS } from "mobx";
import Bird from '../domain/Bird';
import Sighting from "../domain/Sighting";

import {addBird, removeBird} from '../client';

import { SightingStore } from "../stores";
import { upsert } from "../util";

export default class SightingModel {
    public store: SightingStore;
    @observable
    public id: string;

    @observable
    public capturedDate: Date;

    public birds: Bird[];

    constructor(sighting: Sighting, store: SightingStore) {
        this.store = store;

        this.id = sighting.id;
        this.capturedDate = sighting.capturedDate;
        this.birds = sighting.birds;
    }

    @action
    public addBird = async (id: string) => {
        try {
            const birds: Bird[] = await addBird(this.id,id);
            runInAction(() => {
                this.birds = birds;
            });
        } catch (error) {
            throw error;
        }
    }

    @action
    public removeBird = async (id: string) => {
        try {
            const birds: Bird[] = await removeBird(this.id,id);
            runInAction(() => {
                this.birds = birds;
            });
        } catch (error) {
            throw error;
        }
    }

    toJS(): Sighting {
        return {
            id: this.id,
            capturedDate: this.capturedDate,
            birds: this.birds,
        }
    }
}