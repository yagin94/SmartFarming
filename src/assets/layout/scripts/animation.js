//qa-page-detail

window.showAnswer = function(){
  // location.replace(window.location.href);
  var divAnswer = document.getElementById("showAnswer");
  var nameAnser = document.getElementById("nameAnswer");
  var timeAnser = document.getElementById("timeAnswer");
  var  contentAnser = document.getElementById("contentAnswer");

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


  divAnswer.style.display = "block";
  nameAnser.text = document.getElementById("nameOfAnswer").value;
  timeAnser.textContent = date+' '+time;
  contentAnser.textContent = document.getElementById("contentOfAnswer").value;

}

window.sortQA_like = function(){
  var sort_like = document.getElementById("sort-qa-like");
  var sort_time = document.getElementById("sort-qa-time");
  sort_like.style.backgroundColor ="#FBFBFB";
  sort_time.style.backgroundColor ="gainsboro";
}

window.sortQA_time = function(){
  var sort_like = document.getElementById("sort-qa-like");
  var sort_time = document.getElementById("sort-qa-time");

  sort_like.style.backgroundColor ="gainsboro";
  sort_time.style.backgroundColor ="#FBFBFB";

}

//----------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------
//manage-page

window.showView = function(){
  var chartContainer = document.getElementById("chartContainer");
  if(chartContainer.style.display === "none"){
    chartContainer.style.display = "";
  }
  else if(chartContainer.style.display === ""){
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

function scrollDiv(e){
  if (e.keyCode == 13) {
    var tb = document.getElementById("topView");
    tb.scrollIntoView(true);
  }

}
  let userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
  let url = 'http://localhost:8080/notification/viewNumberOfUnseenNotfication/';
  let result =  url.concat(userId);

$(document).ready(function () {
  // $.get("http://localhost:8080/notification/viewNumberOfUnseenNotfication/"+ `${userId}`)
  $.get("http://localhost:8080/notification/viewNumberOfUnseenNotification/" + `${userId}`)
    .done(function (data) {
      // ANIMATEDLY DISPLAY THE NOTIFICATION COUNTER.
      $('#noti_Counter')
        .css({opacity: 0})
        .text(1)  // ADD DYNAMIC VALUE (YOU CAN EXTRACT DATA FROM DATABASE OR XML).
        .css({top: '-10px'})
        .animate({top: '-2px', opacity: 1}, 500);
    });


  $('#noti_Button').click(function () {

    // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
    $('#notifications').fadeToggle('fast', 'linear', function () {
      if ($('#notifications').is(':hidden')) {
        // $('#noti_Button').css('background-color', '#2E467C');
      }
      // CHANGE BACKGROUND COLOR OF THE BUTTON.
      // else $('#noti_Button').css('background-color', '#FFF');
    });

    $('#noti_Counter').fadeOut('slow');     // HIDE THE COUNTER.

    return false;
  });

  // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
  $(document).click(function () {
    $('#notifications').hide();

    // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
    if ($('#noti_Counter').is(':hidden')) {
      // CHANGE BACKGROUND COLOR OF THE BUTTON.
      // $('#noti_Button').css('background-color', '#2E467C');
    }
  });

  $('#notifications').click(function () {
    return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
  });
});

