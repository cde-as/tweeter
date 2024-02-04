/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $, document, timeago */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const createTweetElement = (tweet) => {
  const $tweetElement = $(`
  <article class="tweet">
         <header class="tweet-header">
  
          <img src="${tweet.user.avatars}" alt="User's Profile Pic">
          <div class="user-first-name">${tweet.user.name}</div>
          <div class="username">${tweet.user.handle}</div>
          </header>
          <p class="tweet-content">${tweet.content.text}</p>

          <div class="tweet-footer">
            <div class="tweet-date">${timeago.format(tweet.created_at)}</div>
            <div class="tweet-footer-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>

  </article>`
  );
  return $tweetElement;
};


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  
  $('.tweets-container').empty(); //empties our original tweets in index.html

  for (const tweet of tweets) {
    const $tweetItem = createTweetElement(tweet);
    $('.tweets-container').append($tweetItem);
  }
};



$(document).ready(() =>{
  //Event listener for submit and prevent its default behaviour.

  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();

    //The jQuery .serialize() function turns a set of form data into a query string.
    const serializedData = $('#tweet-form').serialize();
    console.log(serializedData);
    
    // This serialized data should be sent to the server in the data field of the AJAX POST request.
    $.post('/tweets/', serializedData).then(() => {
      loadTweets();
    });

    //Fetches tweets from the /tweets page. Uses jQuery to make a request to /tweets and receive the array of tweets as JSON.
    const loadTweets = function() {
      $.ajax('/tweets/', {method: 'GET'})
        .then(function(response) {
          renderTweets(response);
        })
        .catch(function(error) {
          console.log('Error', error);
        });
      
    };
  });
});

$(document).ready(() =>{
  renderTweets(data);
});