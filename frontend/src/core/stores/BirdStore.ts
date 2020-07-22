import { observable, action, computed, runInAction, toJS } from "mobx";
import Bird from "../domain/Bird";
import {allBirds, getBird, createBird} from '../client';
import BirdModel from "../models/BirdModel";
import { upsert } from "../util";

export default class BirdStore {
    @observable 
    public birds: BirdModel[] = [];
    
    @action
    public fetchData = async () => {
        try {
            const birds: Bird[] = await allBirds();
            runInAction(() => {
                this.birds = birds.map(bird => new BirdModel(bird, this)).reverse();
            });

        } catch (error) {
            throw error;
        }
    }

    @action
    public fetchOne = async (id: string) => {
        try {
            const bird: Bird = await getBird(id);
            runInAction(() => {
                this.birds.push(new BirdModel(bird, this));
            });
        } catch (error) {
            throw error;
        }
    }

    @action
    public create = async (genusName: string, name: string) => {
        try {
            const bird: Bird = await createBird(genusName, name);
            this.birds = upsert(this.birds, "id", new BirdModel(bird, this));
        } catch (error) {
            throw error;
        }
    }

    @action
    remove(id: string) {
        this.birds = this.birds.filter((bird: Bird) => bird.id !== id);
    }

    toJS(): Bird[] {
        return this.birds.map((bird: BirdModel) => bird.toJS())
    }
}