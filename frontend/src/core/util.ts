export const upsert = <T>(list : T[], compareOn: keyof T, toAdd: T): T[] => {
    let found: boolean = false;
    for(let elem of list) {
        if(elem[compareOn] === toAdd[compareOn]) {
            elem = toAdd;
            found = true;
        }
    }

    if(!found) {
        list.push(toAdd);
    }

    return list;
}