/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $,document */
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
            <div class="tweet-date">${tweet.created_at}</div>
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
  renderTweets(data);
});