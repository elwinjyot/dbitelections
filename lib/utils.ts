export function generateStudentId(): number {
    let numAsString: string = "";
    for (let i = 0; i < 10; i++) {
        numAsString.concat(Math.floor((Math.random() * (9 - 0 + 1) + 0)).toString())
    }
    return parseInt(numAsString);
}