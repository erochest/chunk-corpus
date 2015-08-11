/* global jQuery
 */


(function($) {
  'use strict';

  var logAll = function(xs) {
    for (var i=0, x; x=xs[i]; i++) {
      console.log(x);
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
          console.log(evt);
          evt.originalEvent.dataTransfer.dropEffect = 'copy';
        })
        .on('drop', function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          console.log(evt);
          logAll(evt.originalEvent.dataTransfer.files);
        });

    } else {
      $('#error_modal').openModal();
    }

  });

})(jQuery);
