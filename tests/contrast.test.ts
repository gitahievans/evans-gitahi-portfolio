import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

function color(theme: string, token: string) {
  const match = css.match(new RegExp(`--${theme}-${token}: (#[a-f0-9]{6});`));
  assert.ok(match, `Missing ${theme} ${token} color`);
  return match[1];
}

function luminance(hex: string) {
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(a: string, b: string) {
  const light = Math.max(luminance(a), luminance(b));
  const dark = Math.min(luminance(a), luminance(b));
  return (light + 0.05) / (dark + 0.05);
}

function composite(color: string, background: string, opacity: number) {
  const channels = [1, 3, 5].map((offset) => {
    const foreground = parseInt(color.slice(offset, offset + 2), 16);
    const behind = parseInt(background.slice(offset, offset + 2), 16);
    return Math.round(foreground * opacity + behind * (1 - opacity)).toString(16).padStart(2, "0");
  });
  return `#${channels.join("")}`;
}

for (const theme of ["light", "dark"]) {
  test(`${theme} text and controls meet AA contrast across semantic surfaces`, () => {
    for (const surface of ["background", "surface", "elevated"]) {
      for (const text of ["foreground", "secondary", "muted", "accent"]) {
        const ratio = contrast(color(theme, text), color(theme, surface));
        assert.ok(ratio >= 4.5, `${theme} ${text}/${surface}: ${ratio.toFixed(2)} < 4.5`);
      }
      for (const control of ["border-strong", "focus-ring"]) {
        const ratio = contrast(color(theme, control), color(theme, surface));
        assert.ok(ratio >= 3, `${theme} ${control}/${surface}: ${ratio.toFixed(2)} < 3`);
      }
      // Primary actions fade slightly on hover/press. Include the composited
      // text and fill rather than assuming their opaque-token contrast holds.
      for (const opacity of [0.95, 0.9]) {
        const background = color(theme, surface);
        const text = composite(color(theme, "accent-foreground"), background, opacity);
        const fill = composite(color(theme, "accent"), background, opacity);
        const ratio = contrast(text, fill);
        assert.ok(ratio >= 4.5, `${theme} primary opacity ${opacity}/${surface}: ${ratio.toFixed(2)} < 4.5`);
      }
    }
    const ratio = contrast(color(theme, "accent-foreground"), color(theme, "accent"));
    assert.ok(ratio >= 4.5, `${theme} accent-foreground/accent: ${ratio.toFixed(2)} < 4.5`);
  });
}
