(function () {
  'use strict';

  /**
   * Function interface - Produces a summary at a given level of detail.
   *
   * <p>The larger detail level is, the bigger summary will consume on the wire, but the more
   * information it conveys.</p>
   *
   * @external summarizer
   * @function
   * @param {number} level - the level of detail.
   * @return {external:Promise.<external:Summary>} a promise resolving to a summary of the
   *                                         current state at the requested level of detail.
   */

  var q = require('q');
  var ibfBuilder = require('./ibf');
  var emptyFullContent = require('./fullContent');
  var levelToSize = require('./levelToSize');

  function fromItems(array, serialize, digest, selector) {
    return function (level) {
      var empty = ibfBuilder(levelToSize(level), digest, selector);
      var l = array.length;
      var i = 0;
      var filled = empty.plusIterator({
        next: function () {
          var res;
          if (i < l) {
            res = { done: false, value: serialize(array[i]) };
            i++;
          } else {
            res = { done: true, value: undefined };
          }
          return res;
        }
      });
      return filled;
    };
  }

  function fromJSON(producer, digest, selector) {
    return function (level) {
      return q().then(producer.bind(null, level)).then(function (json) {
        if (Array.isArray(json)) {
          return ibfBuilder.fromJSON(json, digest, selector);
        } else {
          return emptyFullContent.fromJSON(json);
        }
      });
    };
  }

  /**
   * @module summarizer
   */
  module.exports = {

    /**
     * Creates summaries representing an array.
     *
     * @function
     * @param {Object[]} array - the array of items in the current state.
     * @param {serialize} serialize - a serializer for items in the array.
     * @param {digester} digest - a message digester to build summaries.
     * @param {bucketSelector} selector - the bucket selector to build summaries.
     * @return {summarizer} a summarizer returning summaries representing the given array.
     */
    fromItems : fromItems,

    /**
     * Deserializes JSON views of summaries, likely obtained throught the network.
     *
     * @function
     * @param {Function} producer - the producer of JSON summaries, returns promises resolving to JSON content.
     * @param {digester} digest - a message digester to build summaries.
     * @param {bucketSelector} selector - the bucket selector to build summaries.
     * @return {summarizer} a summarizer returning deserialized summaries.
     */
    fromJSON : fromJSON
  };
})();
