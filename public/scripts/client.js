/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetInfo)  {
  //responsible for returning a tweet <article>
  //Must contain entire HTML structure of the tweet
  const newTweet =
  `
  <article>
    <header class="tweetHeader">
      <div>
        <img src=${tweetInfo.user.avatars}/>
        <span>${tweetInfo.user.name}</span>
      </div>
      <div>
        <span class="handle">${tweetInfo.user.handle}</span>
      </div>
    </header>
    <div id="info">
      <span>${escape(tweetInfo.content.text)}</span>
    </div>
    <footer class="tweetFooter">
      <div>
        <span class="timeStamp">${moment(tweetInfo.created_at).fromNow()}</span>
      </div>
      <div class="tweet-reactions"> 

        <span>
        <i id="flag" class="fas fa-flag"></i> 
        <i id= "retweet" class="fas fa-retweet"></i> 
        <i  id="heart" class="fas fa-heart"></i>
        </span>

      </div>
    </footer>
  </article>
  `
  return newTweet;
};

const renderTweets = arrayOftweetInfo => {
  for (let obj of arrayOftweetInfo) {
    $('.tweet-container').prepend(createTweetElement(obj));
  }
};

const renderLastTweet = arrayOftweetInfo => {
  const lastTweet = arrayOftweetInfo[arrayOftweetInfo.length - 1];
  $('.tweet-container').prepend(createTweetElement(lastTweet));
};

const ajaxPost = (url, data, callback) => {
  $.post(url, data, callback);
};

const getText = queryString => {
  let text = '';
  for (let index in queryString) {
    if (index > 4) {
      text += queryString[index];
    }
  }
  return decodeURIComponent(text);
};

const resetErrorMessage = violation => {

  if (violation === 'empty') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append("<p>Please add some text!</p>");
    $(".error-message").slideDown("slow");
    $('textarea').focus();
  } else if (violation === 'over count') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append("<p>Exceeds character count!</p>");
    $(".error-message").slideDown("slow");
    $('textarea').focus();
  } else {
    $(".error-message").hide();
    $(".error-message").empty();
    $('textarea').focus();
  }
};

$(document).ready(function() {
  $.get('/tweets', renderTweets);

  $('.write').click(function(event) {
    $('textarea').focus();
  });
  $('.submit-and-display button').click(function(event) {
    event.preventDefault();
    const data = $('form').serialize();
    const dataLength = getText(data).length;

    if (dataLength > 140) {
      resetErrorMessage('over count');
    } else if (dataLength === 0) {
      resetErrorMessage('empty');
    } else {
      resetErrorMessage();
      ajaxPost('/tweets', data, function() {
        $.get('/tweets', renderLastTweet);
        $('textarea').val("");
      });
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .removeClass("negative-count")
        .text(140);
    }
  });
});

// escape function for writing tweet 
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};