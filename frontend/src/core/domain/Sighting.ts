import Bird from './Bird';

export default interface Sighting {
    id: string;
    capturedDate: Date;
    birds: Bird[];
}