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
  });

  /* stretch sceoll button  */

  // toggle button for getting to the top of the screen
 const buttonToTriggerScroll = '.scrollButton button';
 $(window).scroll(function() {
   if ($(this).scrollTop() > 40) {
     $(buttonToTriggerScroll).fadeIn();
   } else {
     $(buttonToTriggerScroll).fadeOut();
   }
 });
  // click to top 
 $(buttonToTriggerScroll).click(function() {
   $(window).scrollTop(0);
   if ($('.new-tweet').is(':hidden')) {
     $('.new-tweet').show();
   }
   $('textarea').focus();
 });
  
});

 


