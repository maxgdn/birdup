const noble = require('noble');
import {capture} from './capture';

const id: string[] = ['0C:FC:83:2F:19:6D'];
const hidDevice = '00001124-0000-1000-8000-00805f9b34fb';

let stateChange: Function = (state: string): void => {
    if(state === 'poweredOn') {
        noble.startScanning(id,false);
    } else {
        noble.stopScanning();
    }   
}

let discovery: Function = (err, services): void => {
    for(let service of services) {
        console.log('found service:', service.uuid);

        service.discoverCharacteristics([], (err, characteristics) => {
            for(let characteristic of characteristics) {
                console.log('found characteristic:', characteristic.uuid);
            }
        });
    }
}

let peripheralFound: Function = (peripheral) => {
    noble.stopScanning();

    console.log('found peripheral:', peripheral.advertisement);

    peripheral.discoverServices(id, discovery)
}

noble.on('stateChange', stateChange);

noble.on('discover', peripheralFound);
