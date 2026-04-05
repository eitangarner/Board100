function seededRandomLCG(seed) {
    let m = 0x80000000;
    let a = 1103515245;
    let c = 12345;
    let state = seed;
    return function() {
        state = (a * state + c) % m;
        return state / (m - 1);
    }
}

let rand = seededRandomLCG(42);
for(let i=0; i<3; i++) console.log(rand());
