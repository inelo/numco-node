NUMCO - NUMber COmpressor
=========

A small compression/decompression library for numerical arrays.
Its best suited for large data sets of integers.
## How it works
Internally this lib creates a delta encoded array and then deflates it using zlib.

Delta encoding is one of the most powerfull numeric compression methods out there.
Its a simple algorithm that converts values in given array so that each represents a difference from the previous value.

Delta encoding example:

```
[100, 101, 102, 103, 104, 105] converts to [100, 1, 1, 1, 1, 1]
```

## Charts
![charts](/numco_charts.png)

## Mini DOC
Compression
```
numco.compress(array) : string
    expects array of numbers as argument and returns compressed base64 encoded string
```
Decompression
```
numco.decompress(string) : array
    expects compressed base64 encoded string and returns decompressed array of numbers
```

## Installation

```
npm install numco --save
```

## Example usage
```
var numco = require("numco"),
    compress = numco.compress,
    decompress = numco.decompress;

var numArray = [100,101,102,...];

var compressed = compress(numArray);
var decompressed = decompress(compressed);

console.log("compressed base64 encoded string", compressed);
console.log("decompressed array", decompressed);

```
See tests/index.js for more.
## Running tests

  npm test

## Release History

* 0.1.0 Initial release
