import { observable, action, computed, runInAction, toJS } from "mobx";
import SightingModel from "../models/SightingModel";
import Sighting from "../domain/Sighting";
import { allSightings, getSighting, capture } from "../client";

import { upsert, sleep } from '../util';

export default class SightingStore {
    @observable
    public sightings: SightingModel[] = [];

    @action
    public fetchData = async () => {
        try {
            const sightings: Sighting[] = await allSightings();
            runInAction(() => {
                console.log("Sightings");
                console.log(sightings);
                this.sightings = sightings.map(sighting => new SightingModel(sighting, this)).reverse();
            });

        } catch (error) {
            throw error;
        }
    }

    @action
    public fetchOne = async (id: string) => {
        try {
            const sighting: Sighting = await getSighting(id);
            runInAction(() => {
                let sightingModel: SightingModel = new SightingModel(sighting, this);
                this.sightings = upsert(this.sightings, "id" ,sightingModel);
            });
        } catch (error) {
            throw error;
        }
    }

    @action
    snap = async () => {
        try {
            const id: string = await capture();
            await this.fetchOne(id);
        } catch (error) {
            throw error;
        }
    }

    @action
    remove(id: string) {
        this.sightings = this.sightings.filter((sighting: Sighting) => sighting.id !== id);
    }

    getSightings(): SightingModel[] {
        return this.sightings;
    }

    get(id: string): SightingModel {
        return this.sightings.filter(sighting => id === sighting.id)[0];
    }

    toJS(): Sighting[] {
        return this.sightings.map((sighting: SightingModel) => sighting.toJS());
    }
}