var zlib = require('zlibjs-slim');
/**
 * Compress an array of numbers/integers
 *
 * @param  {array<number>} numArray
 * @return {String} compressed array as string
 */
module.exports = {
  compress: function(numArray) {
    var diffArray = ArrayConverter.valuesToDiffs(numArray);
    var deflated = zlib.deflateSync(new Buffer(diffArray.join()));
    return deflated.toString('base64');
  },
  
  /**
   * Decompress compressed string data
   *
   * @param  {String} compressedData
   * @return {array<number>} decompressed data
   */
  decompress: function(compressedData) {
    var inflatedData =  zlib.inflateSync( new Buffer(compressedData, 'base64'));
    var outputString = "[" + String.fromCharCode.apply(null,inflatedData) + "]";
    var outputArray = JSON.parse(outputString);
    return ArrayConverter.diffsToValues(outputArray);
  },
};

var ArrayConverter = {
  /**
  * Converts an array of number values to array of differences between each pairs of values
  * for example : [100, 101, 102, 103, 104, 105] => [100, 1, 1, 1, 1, 1]
  * @param {array<number>}
  * @return {array<number>}
  */
  valuesToDiffs: function(numArray) {
    numArray.sort(function (a, b) {  return a - b;  });
    for (var i=0, prev=0, diff=0, result=[], len=numArray.length; i<len; i++) {
      diff = numArray[i] - prev;
      prev = numArray[i];
      result.push(diff);
    }
    return result;
  },
  /**
  * Converts an array of diffs to array of values
  * for example : [100, 1, 1, 1, 1, 1] => [100, 101, 102, 103, 104, 105]
  * @param {array<number>}
  * @return {array<number>}
  */
  diffsToValues: function(diffArray) {
    for (var i=0, head=0, result=[], len=diffArray.length; i<len; i++) {
      head = head + diffArray[i];
      result.push(head);
    }
    return result;
  }
};