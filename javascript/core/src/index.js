(function () {
  'use strict';

  /**
   * The built in Error object.
   *
   * @class Error
   * @external
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error Error on Mozilla Developer Network}
   */

  /**
   * The built in ArrayBuffer object.
   *
   * <p>Arraybuffers are the way to represent items serialized in binary format.</p>
   *
   * @class ArrayBuffer
   * @external
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer ArrayBuffer on Mozilla Developer Network}
   */

  /**
   * Serializer and deserializer interfaces.
   *
   * @class Serial
   */
  /**
   * Serializes objects to arrays of bytes.
   *
   * <p>Any instance of <code>T</code> must be accepted and have a non <code>null</code> return value:
   * for any <code>o</code>, <code>o instanceof T</code> implies <code>serialize(o) != null</code>.</p>
   *
   * <p>The output must be consistent, an identical output should be returned if called twice on the equal
   * objects.</p>
   *
   * @name Serial~Serialize
   * @function
   * @param {T} item - the item to serialize.
   * @return {external:ArrayBuffer} the serialized item.
   */
  /**
   * Deserializes an array of bytes back to an object.
   *
   * <p>Any array of bytes should lead to either a non <code>null</code> value or throw.</p>
   *
   * <p>The output must be consistent, an identical output should be returned if called twice
   * on the identical arrays.</p>
   *
   * @name Serial~Deserialize
   * @function
   * @param {external:ArrayBuffer} content - the array of bytes representing an object.
   * @return {T} the object deserialized from the array of bytes.
   * @throws {external:Error} in case the buffer cannot be read.
   */

  /**
   * Represents summarized data.
   *
   * <p>A summary is an immutable data structure, new instances are returned by method but do not modify inner state</p>
   *
   * @class Summary
   */
  /**
   * Adds an item to the summary.
   *
   * <p>When both summaries can be {@link external:Summary#toDifference|viewed as a difference}:
   * <ul>
   *   <li>if the item is in the removed set of that summary, it is in none of the resulting summary difference sets</li>
   *   <li>if the item is in none of the difference sets of that summary, it is in the added set of the resulting difference</li>
   *   <li>if the item is in the added set of that summary, the resulting summary may be impossible to decipher</li>
   * </ul>
   * </p>
   *
   * @param {external:ArrayBuffer} item - the serialized item.
   * @returns {Summary} a new summary instance including this item.
   * @function Summary#plus
   */
  /**
   * Adds several items to the summary.
   *
   * <p>Equivalent to repeatedly calling {@link Summary#plus} for each element reported in the updater, but this method
   * can do optimizations for batch updates.</p>
   *
   * <p>The promise returned by this method resolves once the updater reports finishing its work, or rejects if the
   * updater reports an issue.</p>
   *
   * @param {Summary~SummaryBatchUpdater} updater - an updater which will report items to add.
   * @returns {external:Promise.<Summary>} a promise which will resolve to a summary.
   * @function Summary#plusMany
   */
  /**
   * Removes an item from the summary.
   *
   * <p>When both summaries can be {@link Summary#toDifference|viewed as a difference}:
   * <ul>
   *   <li>if the item is in the added set of that summary, it is in none of the resulting summary difference sets</li>
   *   <li>if the item is in none of the difference sets of that summary, it is in the removed set of the resulting difference</li>
   *   <li>if the item is in the removed set of that summary, the resulting summary may be impossible to decipher</li>
   * </ul>
   * </p>
   *
   * @param {external:ArrayBuffer} item - the serialized item.
   * @returns {Summary} a new summary instance excluding this item.
   * @function Summary#minus
   */
  /**
   * Removes several items to the summary.
   *
   * <p>Equivalent to repeatedly calling {@link Summary#minus} for each element reported in the updater, but this method
   * can do optimizations for batch updates.</p>
   *
   * <p>The promise returned by this method resolves once the updater reports finishing its work, or rejects if the
   * updater reports an issue.</p>
   *
   * @param {Summary~SummaryBatchUpdater} updater - an updater which will report items to remove.
   * @returns {external:Promise.<Summary>} a promise which will resolve to a summary.
   * @function Summary#minusMany
   */
  /**
   * Retrieves a view of the summary as a difference.
   *
   * @returns {Difference.<external:ArrayBuffer>} a difference view of the summary or <code>null</code> if it cannot be resolved with the information it contains.
   * @function Summary#toDifference
   */
  /**
   * Retrieves a JSON view of the summary.
   *
   * @returns {Object} a JSON view of the summary.
   * @function Summary#toJSON
   */
  /**
   * Adds/removes multiple items to a summary.
   *
   * <p>This function is provided to the summary and called by it with appropriate parameters. The function is then
   * responsible for calling <code>item</code> function repeatedly with a single argument being the
   * {@link external:ArrayBuffer buffer} representing the item to add or remove. Once all items have been, the
   * <code>done</code> method has to be called to notify the summary batch update is finished. If any issue occurs, call
   * <code>fail</code> function with an {@link external:Error error} object.<p>
   *
   * @example <caption>Synchronously add items to the summary</caption>
   * var promise = summary.plusMany(function(item, done) {
   *   item(new Int8Array([1, 2, 3]).buffer);
   *   item(new Int8Array([4, 5, 6]).buffer);
   *   done();
   * });
   *
   * @example <caption>Asynchronously add items to the summary, with possible failure</caption>
   * var promise = summary.plusMany(function(item, done, fail) {
   *   readLines('file.csv', function (err, lines) {
   *     if (err) {
   *       return fail(err);
   *     }
   *     lines.forEach(function (line) {
   *       var buffer = ...
   *       item(line);
   *     });
   *     done();
   *   });
   * });
   *
   * @name Summary~SummaryBatchUpdater
   * @function
   * @param {function} item - a function to call on each item to add/remove from the summary.
   * @param {function} done - a function to call once all items have been added/removed from the summary.
   * @param {function} fail - a function to call if any issue occurs.
   */

  /**
   * Represents the difference between two states.
   *
   * @class Difference
   */
  /**
   * Represents the set of items added on the remote side compared to the local state.
   *
   * @returns {Array.<T>} the array of items added on the remote side compared to the local state.
   * @function Difference#added
   */
  /**
   * Represents the set of items removed on the remote side compared to the local state.
   *
   * @returns {Array.<T>} the array of items removed on the remote side compared to the local state.
   * @function Difference#removed
   */

  var sha1 = require('./sha1');
  var summarizer = require('./summarizer');
  var selector = require('./bucketSelector').padAndHash(sha1, 3);

  function fromItems(array, serialize) {
    return summarizer.fromItems(array, serialize, sha1, selector);
  }

  function fromJSON(producer) {
    return summarizer.fromJSON(producer, sha1, selector);
  }

  function fromStream(stream, serialize) {
    return summarizer.fromStream(stream, serialize, sha1, selector);
  }

  function fromGenerator(generator, serialize) {
    return summarizer.fromGenerator(generator, serialize, sha1, selector);
  }

  /**
   * Entry point to default instances.
   *
   * @module mathsync
   */
  module.exports = {

    /**
     * Exposes the same members of {@link module:summarizer} with default settings.
     *
     * <p>All summarizers provided here use SHA-1 hashing and a bucket selector putting each item in 3 buckets.</p>
     *
     * @member
     */
    summarizer: {

      /**
       * Creates summaries representing an array.
       *
       * @example <caption>Simple strings in an array</caption>
       * var ms = require('mathsync');
       * var data = ["aaa", "bbb", "ccc"];
       * var summarizer = ms.summarizer.fromItems(data, ms.string.newSerializer());
       *
       * @example <caption>More complex objects with custom serializer</caption>
       * var ms = require('mathsync');
       * var data = [{ id: 1, value: 5 }, { id: 10, value: 50 }];
       * var serializer = ms.string.newSerializer()(function (item) {
       *   var buffer = new ArrayBuffer(8);
       *   var dv = new DataView(buffer);
       *   dv.setInt32(0, item.id);
       *   dv.setInt32(4, item.value);
       *   return buffer;
       * });
       * var summarizer = ms.summarizer.fromItems(data, serializer);
       *
       * @function summarizer.fromItems
       * @param {Object[]} array - the array of items in the current state.
       * @param {Serial~Serialize} serialize - a serializer for items in the array.
       * @return {summarizer} a summarizer returning summaries representing the given array.
       *
       * @see {@link module:summarizer.fromItems} for customized instances
       * @memberof! module:mathsync
       */
      fromItems : fromItems,

      /**
       * Deserializes JSON views of summaries, likely obtained throught the network.
       *
       * @example <caption>From an HTTP endpoint using XMLHttpRequest</caption>
       * var Promise = require('mathsync/src/promise'); // polyfill
       * function fetchSummary(level) {
       *   var p = new Promise(function (resolve, reject) {
       *     var req, url = 'http://localhost:4000/api/summary/' + level;
       *     function ready() {
       *       if (req.status === 200) {
       *         resolve(req.responseText);
       *       } else {
       *         reject(new Error('Failed to get summary from ' + url));
       *       }
       *     }
       *     function stateChange() {
       *       if (req.readyState === 4) {
       *         ready();
       *       }
       *     }
       *     req = new XMLHttpRequest();
       *     req.onreadystatechange = stateChange;
       *     req.open('GET', url);
       *     req.send(null);
       *   });
       *   return p.then(JSON.parse);
       * }
       * var summarizer = ms.summarizer.fromJSON(fetchSummary);
       *
       * @example <caption>From an HTTP endpoint using jQuery</caption>
       * var Promise = require('mathsync/src/promise'); // polyfill
       * function fetchSummary(level) {
       *   return Promise.resolve($.getJSON('http://localhost:4000/api/summary/' + level));
       * }
       * var summarizer = ms.summarizer.fromJSON(fetchSummary);
       *
       * @example <caption>From an HTTP endpoint using Node's http</caption>
       * var Promise = require('mathsync/src/promise'); // polyfill
       * var http = require('http');
       * function fetchSummary(level) {
       *   var p = new Promise(function (resolve, reject) {
       *     http.get('http://localhost:4000/api/summary/' + level, function (res) {
       *       var chunks = [];
       *       res.on('data', function(chunk) {
       *         chunks.push(chunk);
       *       });
       *       res.on('end', function() {
       *         resolve(chunks);
       *       });
       *     }).on('error', reject);
       *   });
       *   return p.then(Buffer.concat).then(JSON.parse);
       * }
       * var summarizer = ms.summarizer.fromJSON(fetchSummary);
       *
       * @function summarizer.fromJSON
       * @param {Function} producer - the producer of JSON summaries, returns promises resolving to JSON content.
       * @return {summarizer} a summarizer returning deserialized summaries.
       *
       * @see {@link module:summarizer.fromJSON} for customized instances
       * @memberof! module:mathsync
       */
      fromJSON : fromJSON,

      /**
       * Creates summaries representing a stream of data.
       *
       * @example <caption>Taking items from a {@link https://github.com/maxogden/level.js level.js} database</caption>
       * var ms = require('mathsync');
       * var levelup = require('levelup');
       * var leveljs = require('level-js');
       * var db = levelup(name, { db : leveljs });
       * var summarizer = ms.summarizer.fromStream(function () {
       *   return db.createReadStream();
       * }, ms.string.newSerializer()(function (d) {
       *   return d.key + ':' + d.value;
       * }));
       *
       * @function summarizer.fromStream
       * @param {function} streamer - function returning a new {@link external:Readable stream} every time it is called.
       * @param {Serial~Serialize} serialize - a serializer for yielded items.
       * @return {summarizer} a summarizer returning summaries containing emitted items.
       *
       * @see {@link module:summarizer.fromStream} for customized instances
       * @memberof! module:mathsync
       */
      fromStream : fromStream,

      /**
       * Creates summaries representing items yielded by a generator.
       *
       * @example <caption>Yields strings from a hash</caption>
       * var ms = require('mathsync');
       * var data = { key1: "value", key2: "other" };
       * var summarizer = ms.summarizer.fromGenerator(function* () {
       *   for (var k in data) {
       *     if (data.hasOwnProperty(k)) {
       *       yield k + ':' + data[k];
       *     }
       *   }
       * }, ms.string.newSerializer());
       *
       * @function summarizer.fromGenerator
       * @param {external:Generator} generator - the generator that will yield all items.
       * @param {Serial~Serialize} serialize - a serializer for yielded items.
       * @return {summarizer} a summarizer returning summaries representing the yielded items.
       *
       * @see {@link module:summarizer.fromGenerator} for customized instances
       * @memberof! module:mathsync
       */
      fromGenerator : fromGenerator
    },

    /**
     * Exposes {@link module:serialize}.
     *
     * @member
     */
    string: require('./string'),

    /**
     * Exposes {@link module:resolver}.
     *
     * @member
     */
    resolver: require('./resolver')
  };
})();
