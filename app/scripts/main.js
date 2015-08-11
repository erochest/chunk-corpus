/* global
 * jQuery
 * Bacon
 * zip
 */


(function($) {
  'use strict';

  zip.workerScriptsPath = "/scripts/";

  var logAll = function(xs) {
    for (var i=0, x; x=xs[i]; i++) {
      console.log(x);
    }
  };

  var outputFileName = function(file, tokenStart) {
  };

  var updateOutputFileName = function(fileChunk) {
  };

  var tokenize = function(dataStr) {
  };

  var chunk = function(xs, size, step) {
  };

  var readTextFile = function(f) {
    var reader = new FileReader();
    onLoad = Bacon.fromEvent(reader, 'load');
    reader.readAsText(f, function(evt) {
      return {
        name: f.name,
        contents: evt.target.result
      };
    });
    return onLoad;
  };

  var zipfile = function(z, f) {
  };

  var finis = function(z) {
  };

  var forward = function(dataUrl) {
  };

  var over = function(property, f) {
    return function(x) {
      x[property] = f(x[property]);
      return x;
    };
  };

  var spread = function(property) {
    return function(x) {
      var xs    = x[property].slice();
          names = Object.getOwnPropertyNames(x);

      for (var i=0; i<xs.length; i++) {
        var y = {};

        for (var j=0, n; n=names[j]; j++) {
          y[n] = x[n];
        }

        y[property] = xs[i];
        xs[i] = y;
      }

      return Bacon.fromArray(xs);
    };
  };

  $(function() {

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var fileInput  = $('#input_files'),
          dropTarget = $('#drop_target'),
          size       = parseInt($('#chunk_size').val()),
          step       = parseInt($('#chunk_step').val()),
          change     = null,
          drop       = null,
          inputFiles = null,
          dropFiles  = null,
          files      = null,
          zipper     = null;

      change = fileInput.asEventStream('change');
      inputFiles = change.flatMap(function(evt) {
        return Bacon.fromArray(evt.target.files);
      });

      dropTarget.on('dragover', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.originalEvent.dataTransfer.dropEffect = 'copy';
      });
      drop = dropTarget
        .asEventStream('drop')
        .doAction(function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
        });
      dropFiles = drop.flatMap(function(evt) {
        return Bacon.fromArray(evt.originalEvent.dataTransfer.files);
      });

      zipper = Bacon.mergeAll(change, drop).map(function(_) {
        return new zip.BlobWriter();
      }).toProperty();

      files = Bacon.mergeAll(inputFiles, dropFiles)
        .filter(function(f) { return f.type == 'text/plain'; })
        .flatMap(readTextFile)
        .map(over('contents', tokenize))
        .map(over('contents', function(tokens) {
          return chunk(tokens, size, step);
        }))
        .flatMap(spread('contents'))
        .map(updateOutputFileName);

      Bacon
        .combineWith(zipfile, zipper, files)
        .last(finis)
        .doAction(forward);

    } else {
      $('#error_modal').openModal();
    }

  });

})(jQuery);
