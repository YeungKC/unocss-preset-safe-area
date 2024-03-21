import { createGenerator } from "@unocss/core"
import { describe, expect, it } from "vitest"
import { createAutocomplete } from "@unocss/autocomplete"
import presetSafeArea from "../src"

const uno = createGenerator({
  presets: [presetSafeArea()],
})

const targets = [
  // padding
  // safe
  "pt-safe",
  "pt-safe-1",
  "pt+safe",
  "pt+safe-1",

  "pt-safe-b",
  "pt-safe-b-1",
  "pt+safe-b",
  "pt+safe-b-1",

  // titlebar
  "pt-titlebar-y",
  "pt-titlebar-y-1",
  "pt+titlebar-y",
  "pt+titlebar-y-1",
  // keyboard
  "pt-keyboard",
  "pt-keyboard-1",
  "pt+keyboard",
  "pt+keyboard-1",

  "pt-keyboard-b",
  "pt-keyboard-b-1",
  "pt+keyboard-b",
  "pt+keyboard-b-1",

  // size
  // safe
  "w-safe-r",
  "w-safe-r-1",
  "w+safe-r",
  "w+safe-r-1",
  // titlebar
  "w-titlebar",
  "w-titlebar-1",
  "w+titlebar",
  "w+titlebar-1",

  "w-titlebar-x",
  "w-titlebar-x-1",
  "w+titlebar-x",
  "w+titlebar-x-1",
  // keyboard
  "w-keyboard",
  "w-keyboard-1",
  "w+keyboard",
  "w+keyboard-1",

  "w-keyboard-t",
  "w-keyboard-t-1",
  "w+keyboard-t",
  "w+keyboard-t-1",

  // position
  // safe
  "top-safe",
  "top-safe-1",
  "top+safe",
  "top+safe-1",

  "top-safe-b",
  "top-safe-b-1",
  "top+safe-b",
  "top+safe-b-1",

  // titlebar
  "top-titlebar-x",
  "top-titlebar-x-1",
  "top+titlebar-x",
  "top+titlebar-x-1",
  // keyboard
  "top-keyboard",
  "top-keyboard-1",
  "top+keyboard",
  "top+keyboard-1",

  "top-keyboard-b",
  "top-keyboard-b-1",
  "top+keyboard-b",
  "top+keyboard-b-1",
]

const ac = createAutocomplete(uno)

describe("preset-safe-area", () => {
  it("targets", async () => {
    const { css, matched } = await uno.generate(targets)
    expect(css).toMatchFileSnapshot("./output/targets.css")
    expect([...matched]).toStrictEqual(targets)
  })

  it("none targets", async () => {
    const { css, matched } = await uno.generate(["pt-titlebar pt-titlebar w-safe top-titlebar"])
    expect(css).toEqual("")
    expect([...matched]).toStrictEqual([])
  })

  it("autocomplete", async () => {
    expect(ac.templates.length).toBeGreaterThan(0)
  })
})
