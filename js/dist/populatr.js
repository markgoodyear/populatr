/*!
 *  Populatr v1.0.0
 *  Author: Mark Goodyear | @markgdyr | markgoodyear.com
 *  Demo: markgoodyear.com/labs/populatr/
 *  GitHub: github.com/markgoodyear/populatr
 *  Copyright 2013 | MIT
 */
window.Populatr = (function (window, document, undefined) {

  'use strict';

  var self = {

    init: function(active, forms) {

      // Only run if active is true (boolean or string)
      if (active === true || active === 'true') {

        // indexOf for IE8
        // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            if (this == null) {
              throw new TypeError();
            }
            var n, k, t = Object(this),
              len = t.length >>> 0;

            if (len === 0) {
              return -1;
            }
            n = 0;
            if (arguments.length > 1) {
              n = Number(arguments[1]);
              if (n !== n) { // shortcut for verifying if it's NaN
                n = 0;
              } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
              }
            }
            if (n >= len) {
              return -1;
            }
            for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
              if (k in t && t[k] === searchElement) {
                return k;
              }
            }
            return -1;
          };
        }

        // If not object, assume using json file
        if (Object.prototype.toString.call(forms) !== '[object Object]') {
          self.fetchJSON(forms, function(jsonData) {
            self.populate(jsonData);
          });
        } else {
          self.populate(forms);
        }
      }
    },

    fetchJSON: function(path, callback) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200 || httpRequest.status === 0) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) {
              callback(data);
            }
          } else {
            alert('HTTP error '+this.status+' '+this.statusText);
          }
        }
      };
      httpRequest.open('GET', path);
      httpRequest.send();
    },

    populate: function(formData) {

      for (var form in formData) {
        if (formData.hasOwnProperty(form)) {
          var inputElem = formData[form];

          for (var inputName in inputElem) {
            if (inputElem.hasOwnProperty(inputName)) {
              var inputValue = inputElem[inputName],
                  inputByName = document.querySelector(form + ' [name="' + inputName + '"]'),
                  inputByValue = document.querySelector(form + ' [value="' + inputValue + '"]'),
                  inputType;

              // Make sure input exists
              if (inputByName) {

                if (inputByName.tagName.toLowerCase() === 'input') {
                  inputType = inputByName.type;
                } else if (inputByName.tagName.toLowerCase() === 'select') {
                  inputType = 'select';
                }

                // Switch input type
                switch(inputType) {

                  // Value based inputs
                  case 'text':
                  case 'email':
                  case 'hidden':
                  case 'password':
                  case 'tel':
                  case 'number':
                  case 'url':
                  case 'search':
                  case 'color':
                  case 'date':
                  case 'month':
                  case 'range':
                  case 'time':
                    inputByName.value = inputValue;
                    break;

                  // Checkbox inputs
                  case 'checkbox':
                    if(inputValue === true || inputValue === 'true') {
                      inputByName.checked = true;
                    } else {
                      inputByName.checked = false;
                    }
                    break;

                  // Radio inputs
                  case 'radio':
                    inputByValue.checked = true;
                    break;

                  // Select inputs
                  case 'select':

                    // Loop all options, useful for multselect
                    for (var i = 0; i < inputByName.options.length; i++) {
                      var selectOption = inputByName.options[i];

                      if (inputValue.indexOf(selectOption.value) !== -1 ) {
                        selectOption.selected = true;
                      }
                    }
                    break;
                }

              } else {
                console.warn('Populatr.js: Input "' + inputName + '" does not exist in ' + form);
              }
            }
          }
        }
      }
    }

  };

  return {
    init: self.init
  };

})(window, document);
