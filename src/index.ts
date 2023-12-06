import base64 from "base64-js";

export function toBase64(x: Uint8Array): string {
    return base64.fromByteArray(x).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
export function fromBase64(x: string): Uint8Array {
    return base64.toByteArray(x.length % 4 ? x.padEnd(x.length + 4 - (x.length % 4), "=") : x);
}

export function leFromBits(x: boolean[]): number {
    let res = 0;
    x.forEach((b, i) => (res |= +b << i));
    return res;
}
export function leToBits(x: number, count: number): boolean[] {
    const res = new Array(count);
    for (let i = 0; i < count; i++) {
        res[i] = !!(x & (1 << i));
    }
    return res;
}

export function fromBitArray(x: boolean[]): Uint8Array {
    if (!x.length) return new Uint8Array(0);
    const len = (x.length + 3) % 8;
    const padding = len && 8 - len;
    x = [...leToBits(padding, 3), ...x];
    const res = new Uint8Array(Math.ceil(x.length / 8));
    for (let i = 0; i < res.length; i++) {
        let r = 0;
        for (let j = 0; j < 8; j++) {
            r |= +x[i * 8 + j] << j;
        }
        res[i] = r;
    }
    return res;
}
export function toBitArray(x: Uint8Array): boolean[] {
    if (!x.length) return [];
    const res: boolean[] = Array(x.length * 8);
    for (let i = 0; i < x.length; i++) {
        const b = x[i];
        for (let j = 0; j < 8; j++) {
            res[i * 8 + j] = !!(b & (1 << j));
        }
    }
    const padding = leFromBits(res.splice(0, 3));
    res.splice(res.length - padding, padding);
    return res;
}
