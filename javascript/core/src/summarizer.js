(function () {
  'use strict';

  var q = require('q');
  var ibfBuilder = require('./ibf');

  function levelToSize(level) {
    return Math.pow(2, level);
  }

  function fromItems(array, serialize, digest, spread) {
    return function (level) {
      var ibf = ibfBuilder(levelToSize(level), digest, spread);
      for (var i = 0; i < array.length; i++) {
        ibf = ibf._addItem(serialize(array[i]));
      }
      return q(ibf);
    };
  }

  function fromJSON(producer, digest, spread) {
    return function (level) {
      return q(producer(level)).then(function (json) {
        return ibfBuilder.fromJSON(json, digest, spread);
      });
    };
  }

  function fromLarge(producer) {
    return function (level) {
      return q(producer()).then(function (ibf) {
        return ibf._reduce(levelToSize(level));
      });
    };
  }

  module.exports = {
    fromItems : fromItems,
    fromJSON : fromJSON,
    fromLarge : fromLarge
  };
})();
