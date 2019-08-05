export const ITER_COUNTER = 'ITER_COUNTER';
export const SET_COUNTER = 'SET_COUNTER';

export function iterCounter(counter){
    return {
        type: ITER_COUNTER,
        counter
    }
}

export function setCounter(count){
    return {
        type: SET_COUNTER,
        count
    }
}