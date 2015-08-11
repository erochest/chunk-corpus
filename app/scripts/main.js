/* global jQuery
 */


(function($) {
  'use strict';

  var logAll = function(xs) {
    for (var i=0, x; x=xs[i]; i++) {
      console.log(x);
    }
  };

  var outputFileName = function(file, tokenStart) {
    file.name;
  };

  var tokenize = function(dataStr) {
  };

  var chunk = function(xs, size, step) {
  };

  var tokenizeFile = function(f, size, step) {
    if (f.type == 'text/plain') {
      var reader = new FileReader();

      reader.onload = (function(file) {
        return function(e) {
          var tokens = tokenize(e.target.result);
          var chunks = chunk(tokens, size, step);
          for (var i=0, c; c=chunks[i]; i++) {
            var output = outputFileName(file, c.start);
            // TODO: write the output file
          }
        };
      })(f);

      reader.readAsText(f);
    }
  };

  $(function() {
    $('.button-collapse').sideNav();

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      $('#input_files')
        .on('change', function(evt) {
          logAll(evt.target.files);
        });

      $('#drop_target')
        .on('dragover', function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          evt.originalEvent.dataTransfer.dropEffect = 'copy';
        })
        .on('drop', function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          logAll(evt.originalEvent.dataTransfer.files);
        });

    } else {
      $('#error_modal').openModal();
    }

  });

})(jQuery);
