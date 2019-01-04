# npm-package-size
> Calculate an NPM package's full size data without actually installing it!

[GitHub](https://github.com/ethanent/npm-package-size) | [NPM](https://www.npmjs.com/package/npm-package-size)

## Install

```bash
npm i npm-package-size
```

## How it works

`npm-package-size` attempts to read metadata recursively for packages, which contains package sizes. This means that packages often don't need to be installed or even downloaded.

Older package metadata doesn't contain size information, so for older packages, `npm-package-size` downloads and decompresses them, without ever saving data anywhere.

Also, for increased accuracy, `npm-package-size` builds a synthetic `package-lock.json` in memory in order to better predict install size.

Note that size results may differ slightly from some services as those often include extra data which may not be added to real installations. (ex. an extra `package.json` file)

## Usage

```js
const size = require('npm-package-size')

// in an async context...

await size('phin')
// => {'installSize': 16291, 'publishSize': 6767}

await size('request')
// => {'installSize': 4992886, 'publishSize': 4992886}
```

```js
await size('phin', '2.1.0')
// => {'installSize': 1081556, 'publishSize': 1081556}
```