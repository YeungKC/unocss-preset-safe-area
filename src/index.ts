import { CSSEntries, RuleContext, definePreset } from "@unocss/core"
import { directionMap, h } from "@unocss/preset-mini/utils"
import { Theme } from "@unocss/preset-mini"

function handleInsetValue(v: string, { theme }: RuleContext<Theme>): string | number {
  if (!v) return 0
  return theme.spacing?.[v] ?? h.bracket.cssvar.global.auto.fraction.rem(v) ?? 0
}

function safeAraMatcher({
  propertyPrefix,
  propertyName,
  safeAreaPrefix,
  safeAreaName,
  mode,
  value,
}: {
  propertyPrefix?: string
  propertyName: string
  safeAreaPrefix: string
  safeAreaName: string
  mode: "add" | "fallback"
  value: string | number
}): CSSEntries | undefined {
  return [[`${propertyPrefix || ""}${propertyName}`, mode === "add" ? `calc(env(${safeAreaPrefix}${safeAreaName}) + ${value})` : `env(${safeAreaPrefix}${safeAreaName}, ${value})`]]
}

const safeAreaMapping: Record<string, string> = {
  safe: "safe-area-inset",
  titlebar: "titlebar-area",
  keyboard: "keyboard-inset",
}

const sizeMapping: Record<string, string> = {
  h: "height",
  w: "width",
}

function getPropName(minmax: string, hw: string) {
  return `${minmax || ""}${sizeMapping[hw]}`
}

const valueMapping: Record<string, string> = {
  l: "-left",
  r: "-right",
  t: "-top",
  b: "-bottom",
  x: "-x",
  y: "-y",
  w: "-width",
  h: "-height",
  top: "-top",
  left: "-left",
  right: "-right",
  bottom: "-bottom",
}

export const presetSafeArea = definePreset<undefined, Theme>(() => {
  return {
    name: "unocss-preset-safe-area",
    rules: [
      [
        /^([p|m])-?([rltb])([\+|-])(?:(safe)(?:-([rltb]))?|(titlebar)(?:(?:-([xy])|(?:-([wh]))))|(keyboard)(?:(?:-([rltb]))?|(?:-([wh]))))(?:-(-?.+))?$/,
        ([, propertyPrefix, propName, mode, safeProperty0, safeValue0, safeProperty1, safeValue1, safeValue2, safeProperty2, safeValue3, safeValue4, value], ctx) =>
          safeAraMatcher({
            propertyPrefix: propertyPrefix === "p" ? "padding" : "margin",
            propertyName: directionMap[propName][0],
            safeAreaPrefix: safeAreaMapping[safeProperty0 || safeProperty1 || safeProperty2],
            safeAreaName: valueMapping[safeValue0 || safeValue1 || safeValue2 || safeValue3 || safeValue4] || directionMap[propName][0],
            mode: mode === "+" ? "add" : "fallback",
            value: handleInsetValue(value, ctx),
          }),
        {
          autocomplete: [
            "(m|p)(r|l|t|b)(+|-)(safe|keyboard)-<num>",
            "(m|p)(r|l|t|b)(+|-)safe-(r|l|t|b)-<num>",
            "(m|p)(r|l|t|b)(+|-)titlebar-(x|y|w|h)-<num>",
            "(m|p)(r|l|t|b)(+|-)keyboard-(r|l|t|b|w|h)-<num>",
          ],
        },
      ],
      [
        /^(?:size-)?(min-|max-)?([wh])([\+|-])(?:(safe)(?:-([rltb]))|(titlebar)(?:(?:-([xy])|(?:-([wh]))?))|(keyboard)(?:(?:-([rltb]))|(?:-([wh]))?))(?:-(-?.+))?$/,
        ([, minmax, wh, mode, safeProperty0, safeValue0, safeProperty1, safeValue1, safeValue2, safeProperty2, safeValue3, safeValue4, value], ctx) =>
          safeAraMatcher({
            propertyName: getPropName(minmax, wh),
            safeAreaPrefix: safeAreaMapping[safeProperty0 || safeProperty1 || safeProperty2],
            safeAreaName: valueMapping[safeValue0 || safeValue1 || safeValue2 || safeValue3 || safeValue4 || wh],
            mode: mode === "+" ? "add" : "fallback",
            value: handleInsetValue(value, ctx),
          }),
        {
          autocomplete: [
            "(w|h)(+|-)safe-(r|l|t|b)-<num>",
            "(min|max)-(w|h)(+|-)safe-(r|l|t|b)-<num>",
            "(w|h)(+|-)(titlebar|keyboard)-<num>",
            "(w|h)(+|-)titlebar-(x|y|w|h)-<num>",
            "(min|max)-(w|h)(+|-)(titlebar|keyboard)-<num>",
            "(min|max)-(w|h)(+|-)titlebar-(x|y|w|h)-<num>",
            "(w|h)(+|-)keyboard-(r|l|t|b|w|h)-<num>",
            "(min|max)-(w|h)(+|-)keyboard-(r|l|t|b|w|h)-<num>",
          ],
        },
      ],
      [
        /^(?:position-|pos-)?(top|left|right|bottom)([\+|-])(?:(safe)(?:-([rltb]))?|(titlebar)(?:(?:-([xy])|(?:-([wh]))))|(keyboard)(?:(?:-([rltb]))?|(?:-([wh]))))(?:-(-?.+))?$/,
        ([, propertyName, mode, safeProperty0, safeValue0, safeProperty1, safeValue1, safeValue2, safeProperty2, safeValue3, safeValue4, value], ctx) =>
          safeAraMatcher({
            propertyName,
            safeAreaPrefix: safeAreaMapping[safeProperty0 || safeProperty1 || safeProperty2],
            safeAreaName: valueMapping[safeValue0 || safeValue1 || safeValue2 || safeValue3 || safeValue4 || propertyName],
            mode: mode === "+" ? "add" : "fallback",
            value: handleInsetValue(value, ctx),
          }),
        {
          autocomplete: [
            "(top|left|right|bottom)(+|-)(safe|keyboard)-<num>",
            "(top|left|right|bottom)(+|-)safe-(r|l|t|b)-<num>",
            "(top|left|right|bottom)(+|-)titlebar-(x|y|w|h)-<num>",
            "(top|left|right|bottom)(+|-)keyboard-(r|l|t|b|w|h)-<num>",
          ],
        },
      ],
    ],
  }
})

export default presetSafeArea
