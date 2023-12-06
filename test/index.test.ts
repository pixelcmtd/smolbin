import fc from "fast-check";
import { toBase64, fromBase64, toBitArray, fromBitArray } from "../src/index";

test("encoding and decoding with everything yields the same result as what we started with", () =>
    fc.assert(fc.property(fc.array(fc.boolean()), (a) => expect(toBitArray(fromBase64(toBase64(fromBitArray(a))))).toEqual(a))));
