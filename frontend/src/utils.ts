export function showMoney(num: number) {
    const str = String(num);
    let left = str.slice(0, str.length - 2);
    if (left.length === 0) {
        left = "0"
    }
    let right = str.slice(str.length - 2);
    if (right.length < 2) {
        right = "00"
    }
    const result = left + '.' + right;
    return '$' + result
}