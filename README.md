# unocss-preset-safe-area

Safe Area for [UnoCSS](https://github.com/unocss/unocss).

## Usage

### Setup

To ensure proper functioning of the safe area styles, Add the viewport-fit=cover meta tag to the viewport settings in your HTML document.
like this:

```diff
<meta
    name="viewport"
-   content="width=device-width, initial-scale=1.0"
+   content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

### Installation

```bash
npm install unocss unocss-preset-safe-area
```

```bash
yarn add unocss unocss-preset-safe-area
```

```bash
pnpm add unocss unocss-preset-safe-area
```

### Import

```ts
import presetSafeArea from 'unocss-preset-safe-area'

export default defineConfig({
    ...
    presets: [...presetSafeArea()...]
    ...
})
```

## Rule

This preset supports `safe-area-inset-*`, `titlebar-area-*` and `keyboard-inset-*`.

Basic usage:

- `pt-safe-1` : `padding-top:env(safe-area-inset-top, 0.25rem);`
- for addition, use `+`, example: `pt+safe-1` : `padding-top:calc(env(safe-area-inset-top) + 0.25rem);`.
- To specify env properties, like `titlebar-x`, `keyboard-t`, use `w-titlebar-x-1`:`width:env(titlebar-area-x, 0.25rem);`.

Currently supports `p`, `m`, `w`, `h`, `max-w`, `min-w`, `max-h`, `min-h`, `left`, `top`, `right`, `bottom`, where:

- `safe` represents `safe-area-inset-`
- `titlebar` represents `titlebar-area-`
- `keyboard` represents `keyboard-inset-`。

For all usage examples, it's all [Autocomplete](https://unocss.dev/tools/autocomplete):

```text
(top|left|right|bottom)(+|-)(safe|keyboard)-<num>
(top|left|right|bottom)(+|-)safe-(r|l|t|b)-<num>
(top|left|right|bottom)(+|-)titlebar-(x|y|w|h)-<num>
(top|left|right|bottom)(+|-)keyboard-(r|l|t|b|w|h)-<num>
(w|h)(+|-)safe-(r|l|t|b)-<num>
(min|max)-(w|h)(+|-)safe-(r|l|t|b)-<num>
(w|h)(+|-)(titlebar|keyboard)-<num>
(w|h)(+|-)titlebar-(x|y|w|h)-<num>
(min|max)-(w|h)(+|-)(titlebar|keyboard)-<num>
(min|max)-(w|h)(+|-)titlebar-(x|y|w|h)-<num>
(w|h)(+|-)keyboard-(r|l|t|b|w|h)-<num>
(min|max)-(w|h)(+|-)keyboard-(r|l|t|b|w|h)-<num>
(m|p)(r|l|t|b)(+|-)(safe|keyboard)-<num>
(m|p)(r|l|t|b)(+|-)safe-(r|l|t|b)-<num>
(m|p)(r|l|t|b)(+|-)titlebar-(x|y|w|h)-<num>
(m|p)(r|l|t|b)(+|-)keyboard-(r|l|t|b|w|h)-<num>
```

If you need more clarification, you can refer to this [CSS example](repo/blob/master/test/output/targets.css).

## License

MIT License &copy; 2024-PRESENT [YeungKC](https://github.com/YeungKC)
