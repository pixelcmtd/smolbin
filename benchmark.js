import Benchmark from "benchmark";
import { Random } from "random";
import seedrandom from "seedrandom";
import { toBase64, fromBase64, toBitArray, fromBitArray } from "./dist/index.modern.js";

const rand = new Random(seedrandom("smol🥺"));

const bits = Array(1 << 16).map(() => rand.boolean());
const bytes = fromBitArray(bits);
const b64 = toBase64(bytes);

const suite = new Benchmark.Suite();

suite
    .add("toBase64", function () {
        toBase64(bytes);
    })
    .add("fromBase64", function () {
        fromBase64(b64);
    })
    .add("fromBitArray", function () {
        fromBitArray(bits);
    })
    .add("toBitArray", function () {
        toBitArray(bytes);
    })
    .on("cycle", (event) => {
        console.log(String(event.target));
    })
    .run({ async: true });
