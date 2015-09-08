/* global
 * exports
 */

// module Chunk.Main

exports.watch_ = function(unit) {
    "use strict";
    return function(msg) {
        return function(obj) {
            console.log(msg, obj);
            return unit;
        };
    };
};
