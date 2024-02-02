/* global $, document */
$(document).ready(function() {
  // --- our code goes here ---
  console.log("JS for Character counter is working");

  // Event handler for textarea element for the form inside of the .new-tweet section. Using the id #tweet-text
  $(".new-tweet textarea#tweet-text").on("input", function() {
    //const maxLength = 140;

    //What is inside the textarea
    const inputValue = $(this).val();

    // count the 'letters' in the textarea
    let characterCount = inputValue.length;

    const counterElement = $(this).closest(".new-tweet").find(".counter");
    counterElement.text(140 - characterCount);

    if (characterCount > 140) {
      counterElement.addClass("turnRed");
    } else {
      counterElement.removeClass("turnRed");
    }

   
  });
});