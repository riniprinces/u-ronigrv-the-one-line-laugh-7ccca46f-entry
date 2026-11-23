// The One-Line Laugh — make.fun bounty entry (u-ronigrv-the-one-line-laugh-7ccca46f)
//
// A tiny Node 22 program that writes one original funny line to /output/entry.txt.
// The line is a single sentence, 130 characters, built around an everyday truth
// (doomscrolling) with the surprise saved for the very end: a stranger's kitchen
// renovation. It is checked here before it is written, so a bad line can never
// reach the gate: it must be 1-200 characters, one sentence, and nothing but
// the line itself — no trailing whitespace, no newline, no explanation.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I told myself I'd only check my phone for a minute, and three hours later I know everything about a stranger's kitchen renovation.";

// Where the grader expects the entry. Honour OUTPUT_PATH when the sandbox
// sets one, otherwise write to the competition's fixed location.
const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

function validateLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // One sentence: exactly one sentence-ending mark, and it closes the line.
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !line.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateLine(LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, { encoding: "utf8" });
  const bytes = Buffer.byteLength(LINE, "utf8");
  console.log(
    `Wrote ${[...LINE].length} characters (${bytes} bytes) to ${OUTPUT_PATH}`,
  );
}

main();
