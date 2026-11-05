import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanitizeEmailSubject, stripControlChars } from "./sanitize";
import { safeSecretEqual } from "./secrets";
import { rateLimit } from "./rate-limit";

describe("sanitize", () => {
  it("strips control characters", () => {
    assert.equal(stripControlChars("hello\u0000world"), "helloworld");
  });

  it("prevents subject newline injection", () => {
    assert.equal(sanitizeEmailSubject("Hello\r\nBcc: evil@test.com"), "Hello Bcc: evil@test.com");
  });
});

describe("safeSecretEqual", () => {
  it("matches equal secrets", () => {
    assert.equal(safeSecretEqual("abc", "abc"), true);
  });

  it("rejects mismatched secrets", () => {
    assert.equal(safeSecretEqual("abc", "abd"), false);
    assert.equal(safeSecretEqual("abc", "abcd"), false);
  });
});

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-${Date.now()}`;
    assert.equal(rateLimit(key, 2, 60_000).ok, true);
    assert.equal(rateLimit(key, 2, 60_000).ok, true);
  });

  it("blocks after limit exceeded", () => {
    const key = `test-block-${Date.now()}`;
    rateLimit(key, 1, 60_000);
    const second = rateLimit(key, 1, 60_000);
    assert.equal(second.ok, false);
    if (!second.ok) assert.ok(second.retryAfterSec >= 1);
  });
});
