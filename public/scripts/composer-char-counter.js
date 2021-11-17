// This file will be solely responsible for this character counter

$(document).ready(function() {
  // --- our code goes here ---
  $('textarea').keyup(function() {
    
    let count = $(this).val().length;

    if (count <= 140) {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .removeClass("negative-count")
        .text(140 - count);
    } else {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .addClass("negative-count")
        .text(140 - count);
    }
  })
})