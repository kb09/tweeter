// This file will be solely responsible for this character counter

// Add a $(document).ready() function to your file to ensure the DOM has loaded


// console.log('hello')
$(document).ready(function() {
  // --- our code goes here ---
  // console.log('ready')
  document.addEventListener("click", (event) => {
    console.log(event);
     
    let count = $(this).val().length;
  })

})