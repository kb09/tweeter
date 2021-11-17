/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet)  {
  //responsible for returning a tweet <article>
  //Must contain entire HTML structure of the tweet
  const newTweet = 
  `
  <article>

  <header class="tweetHeader">
  
    <div>
      <img src=${tweet.user.avatars}/>
      <span><br>${tweet.user.name}</span>
    </div>
    <div>
      <span>${tweet.user.handle}</span>
    </div>
  </header>
    <div>
      <span> ${tweet.content.text}</span>
    </div>
  <footer class="tweetFooter">
  <br>
    <div>
      <span>${tweet.created_at}</span>
    </div>
    
    <div class="tweetLogo"> 
    
      <span class="flag">  <i class="fas fa-flag"></i>  </span>
      <span class="retweet"> <i class="fas fa-retweet"></i> </span>
      <span class="heart"> <i class="fas fa-heart"></i> </span>

    </div>
  </footer>
  </article>
  `
  return newTweet;
}

const renderTweets = function(tweetData) {
  for (obj of tweetData) {
    $('.all-tweets').append(createTweetElement(obj))
  }
}

const ajaxPost = function (url, data, callback) {
  $.post(url, data, callback);
}


const getTextLength = function(inputString) {
  let text = ''; 
  for (index in inputString) {
    if (index > 5) {
      text += inputString[index];
    }
  }
  return text.replace(/%20/g, " ").length;
}

$(document).ready(function() {
  const loadtweets = $.get('/tweets', function(data) {
      renderTweets(data);
  })

  
  $('button').click(function(event) {
    event.preventDefault();
    const data = $('form').serialize()
    console.log(getTextLength(data));

    const dataToPost = ajaxPost('/tweets', data, function() {
    })
  })
})