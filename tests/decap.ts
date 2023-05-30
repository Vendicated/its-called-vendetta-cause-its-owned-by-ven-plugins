import { decap } from "../plugins/Decap/src/decap";
import assert from "assert/strict";

const cases = {
    F: "F",
    Banana: "banana",
    "Some sentence WITH funny CasIng": "some sentence WITH funny CasIng",
    "Hi https://google.com/Foo Bye": "hi https://google.com/Foo bye",
    "```js\nconst a = 'Hi'``` Bye": "```js\nconst a = 'Hi'``` bye",
    "DON'T": "DON'T",
    "A Sentence, with some commas and an Exclamation Mark!": "a sentence, with some commas and an exclamation mark!",
    "I LOVE HAMBURGER": "I LOVE HAMBURGER"
};

for (const [input, expected] of Object.entries(cases)) {
    const actual = decap(input);
    assert.equal(actual, expected);
}
