<h3 align="center">
  MinimalCollapse.js
</h3>

<p align="center">
  <img src="https://img.shields.io/npm/l/@ohnaka0410/minimal-collapse" alt="licence">

  <a href="https://www.npmjs.com/package/@ohnaka0410/minimal-collapse" target="_blank">
    <img src="https://img.shields.io/npm/v/@ohnaka0410/minimal-collapse.svg" alt="npm">
  </a>

  <img src="https://img.shields.io/bundlephobia/min/@ohnaka0410/minimal-collapse" alt="minified size">

  <img src="https://img.shields.io/david/ohnaka0410/minimal-collapse" alt="dependencies">

  <a href="https://www.npmjs.com/package/@ohnaka0410/minimal-collapse">
    <img src="https://img.shields.io/npm/dt/@ohnaka0410/minimal-collapse" alt="downloads">
  </a>
</p>

<p align="center">
  Minimal and Tiny Javascript Library for Collapse
</p>

---

The aim of this library is to easily introduce a minimalistic collapse. It is a library of only about 5KB.

&nbsp;

## Features
✔ Toggles aria-hidden attributes

✔ Open & Close with CSS Transition

✔ Make By Typescript

&nbsp;

## Install

### via npm
```shell
npm install @ohnaka0410/minimal-collapse --save
```

```javascript
// Common.JS
const MinimalCollapse = require('@ohnaka0410/minimal-collapse');

// ESModules
import { MinimalCollapse } from '@ohnaka0410/minimal-collapse';
```

### via CDN direct link
```html
<script src="https://cdn.jsdelivr.net/npm/@ohnaka0410/minimal-collapse@v1.0.1/dist/minimal-collapse.min.js"></script>
```

### direct download
```shell
curl -o https://cdn.jsdelivr.net/npm/@ohnaka0410/minimal-collapse@v1.0.1/dist/minimal-collapse.min.js
```

```html
<script src="/path/to/minimal-collapse.min.js"></script>
```

&nbsp;

## Usage
### Styling
```html
<div class="collapse" area-hidden="true" id="collapse1"><!-- must be not inline element-->
  <div class="collapse__inner"><!-- must be not inline element-->
    Contents
  </div>
</div>
```
```css
/**
 * need styles
 */
.collapse {
  height: 0;
  overflow-y: hidden;
  transition: height .3s; /** custom height transition */
  /** must be padding 0 */
}

.collapse[area-hidden="false"] {
  height: auto;
  overflow-y: auto;
  /** must be margin 0 */
}
```

### automatic
```javascript
MinimalCollapse.activate();
```
**[demo](https://ohnaka0410.github.io/minimal-collapse/demo/automatic.html)**

### manual
```javascript
const collapse = document.querySelector('#someCollapse');

// open
MinimalCollapse.show(collapse);

// close
MinimalCollapse.close(collapse);

// toggle
MinimalCollapse.toggle(collapse);
```
**[demo](https://ohnaka0410.github.io/minimal-collapse/demo/manual.html)**

&nbsp;

## Changelog
Refer to the [releases](https://github.com/ohnaka0410/minimal-collapse/releases) page.

&nbsp;

## Contribution
1. Fork the repository on GitHub
1. Clone the project to your own machine
1. Commit changes to your own branch
1. Push your work back up to your fork
1. Submit a Pull request so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

&nbsp;

## Licence
This project is licensed under [MIT license](https://opensource.org/licenses/MIT).

&nbsp;

## Created and maintained by

[@ohnaka0410](https://twitter.com/ohnaka0410) 🇯🇵
