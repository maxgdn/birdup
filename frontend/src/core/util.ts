export const upsert = <T>(list : T[], compareOn: keyof T, toAdd: T): T[] => {
    let found: boolean = false;
    for(let elem of list) {
        if(elem[compareOn] == toAdd[compareOn]) {
            elem = toAdd;
            found = true;
        }
    }

    if(!found) {
        list.unshift(toAdd);
    }

    return list;
}


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function base64ToArrayBuffer(base64): ArrayBuffer {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}