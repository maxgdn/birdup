import Sighting from "./Sighting";

export default interface Bird {
    id: string;
    genusName: string;
    name: string;
    sightings: Sighting[];
}