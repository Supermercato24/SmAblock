'use strict';

/**
 * saves options to chrome.storage
 * 
 * @returns
 */
function save_options() {

  var like = document.getElementById('like').checked;
  chrome.storage.sync.set({
    like: like
  }, function() {

    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function() {

      status.textContent = '';
    }, 750);
  });
}

/**
 * restores checkbox state using the preferences stored in chrome.storage
 * 
 * @returns
 */
function restore_options() {

  // use default value
  chrome.storage.sync.get({
    like: true
  }, function(items) {

    document.getElementById('like').checked = items.like;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
