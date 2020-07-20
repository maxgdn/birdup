import { observable, action, computed, toJS } from "mobx";
import {allBirds} from '../client';
import Bird from "../domain/Bird";

export default class BirdStore {
    @observable 
    public birds: BirdStore[];
    
    
    @action
    public fetchData= async () => {

    }


    //create

    //remove

    toJS(): Bird[] {
        
    }
}