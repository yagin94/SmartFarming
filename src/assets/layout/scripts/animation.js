//qa-page-detail

window.showAnswer = function () {
  // location.replace(window.location.href);
  var divAnswer = document.getElementById("showAnswer");
  var nameAnser = document.getElementById("nameAnswer");
  var timeAnser = document.getElementById("timeAnswer");
  var contentAnser = document.getElementById("contentAnswer");

  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


  divAnswer.style.display = "block";
  nameAnser.text = document.getElementById("nameOfAnswer").value;
  timeAnser.textContent = date + ' ' + time;
  contentAnser.textContent = document.getElementById("contentOfAnswer").value;

}

window.sortQA_like = function () {
  var sort_like = document.getElementById("sort-qa-like");
  var sort_time = document.getElementById("sort-qa-time");
  var sort_upvote = document.getElementById("sort-qa-upvote");
  sort_like.style.backgroundColor = "#FBFBFB";
  sort_time.style.backgroundColor = "gainsboro";
  sort_upvote.style.backgroundColor = "gainsboro";
}


window.sortQA_upvote = function () {
  var sort_like = document.getElementById("sort-qa-like");
  var sort_time = document.getElementById("sort-qa-time");
  var sort_upvote = document.getElementById("sort-qa-upvote");

  sort_like.style.backgroundColor = "gainsboro";
  sort_time.style.backgroundColor = "gainsboro";
  sort_upvote.style.backgroundColor = "#FBFBFB";
}

window.sortQA_time = function () {
  var sort_like = document.getElementById("sort-qa-like");
  var sort_time = document.getElementById("sort-qa-time");
  var sort_upvote = document.getElementById("sort-qa-upvote");

  sort_like.style.backgroundColor = "gainsboro";
  sort_time.style.backgroundColor = "#FBFBFB";
  sort_upvote.style.backgroundColor = "gainsboro";
}

//----------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------
//manage-page

window.showView = function () {
  var chartContainer = document.getElementById("chartContainer");
  if (chartContainer.style.display === "none") {
    chartContainer.style.display = "";
  }
  else if (chartContainer.style.display === "") {
    chartContainer.style.display = "none";
  }
}


//-----------------------------------------------------------------------------------
//user-detail-page
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function setStyle() {
  document.getElementById("numberIndex").style.backgroundColor = "blue";
}

function scrollDiv(e) {
  if (e.keyCode == 13) {
    var tb = document.getElementById("topView");
    tb.scrollIntoView(true);
  }

}

function showTagUser(i){
  if (i === 0) {
    var tag = document.getElementById("tagUser0");
    if (tag.style.display === "none") {
      tag.style.display = "block";
    }
    else if (tag.style.display === "block") {
      tag.style.display = "none";
    }
  }
  if (i === 1) {
    var tag1 = document.getElementById("tagUser1");
    if (tag1.style.display === "none") {
      tag1.style.display = "block";
    }
    else if (tag1.style.display === "block") {
      tag1.style.display = "none";
    }
  }
}

// angular.module('myApp', [])
//   .controller('myCtrl', ['$scope', function($scope) {
//     $scope.showTagUser = function(i) {
//
//
//
//     };
//   }]);
// Add active class to the current button (highlight it)
function ab() {
  const header = document.getElementById("pagination");
  const btns = header.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      const current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}



