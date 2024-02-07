/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $, document, timeago */

/* const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    // eslint-disable-next-line camelcase
    created_at: 1461116232227,
  }
]; */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  //Use the escape function in out <p> element
  const escapedText = escape(tweet.content.text);

  const $tweetElement = $(`
  <article class="tweet">
         <header class="tweet-header">
  
          <img src="${tweet.user.avatars}" alt="User's Profile Pic">
          <div class="user-first-name">${tweet.user.name}</div>
          <div class="username">${tweet.user.handle}</div>
          </header>
          <p class="tweet-content">${escapedText}</p>

          <div class="tweet-footer">
            <div class="tweet-date">${timeago.format(tweet.created_at)}</div>
            <div class="tweet-footer-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>

  </article>`);
  return $tweetElement;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  $(".tweets-container").empty(); //empties our original tweets in index.html

  for (const tweet of tweets) {
    const $tweetItem = createTweetElement(tweet);
    $(".tweets-container").prepend($tweetItem);
  }
};

$(document).ready(() => {
  //Hide error messages
  $("#alert").hide();
  $("#alertNoChar").hide();

  //Event listener for submit and prevent its default behaviour.
  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();

    // Get tweet & perform tweet validations
    const tweetContent = $("#tweet-text").val();
    const alertElement = document.getElementById("alert");
    const alertNoChar = document.getElementById("alertNoChar");

    $("#alertNoChar").slideUp();
    $("#alert").slideUp();

    if (!tweetContent || tweetContent.trim() === "") {
      $("#alertNoChar").slideDown();
      alertNoChar.style.display = "flex";
      return;
    }

    /* const eraseText = function() {
      document.getElementById("tweet-text").value = "";
    }; */
    
    const counterRestart = function() {
      $('.counter').val(140);
      $('.counter').removeClass("turnRed");
    };

    if (tweetContent.length > 140) {
      $("#alert").slideDown();
      alertElement.style.display = "flex";
      //eraseText();
      counterRestart();
      return;
    }

    //The jQuery .serialize() function turns a set of form data into a query string.
    const serializedData = $("#tweet-form").serialize();
    console.log(serializedData);

    // This serialized data should be sent to the server in the data field of the AJAX POST request.
    $.post("/tweets/", serializedData).then(() => {
      loadTweets();
    });

    //Fetches tweets from the /tweets page. Uses jQuery to make a request to /tweets and receive the array of tweets as JSON.
    const loadTweets = function() {
      $.ajax("/tweets/", { method: "GET" })
        .then(function(response) {
          renderTweets(response);
        })
        .catch(function(error) {
          console.log("Error", error);
        });
    };
  });
});

