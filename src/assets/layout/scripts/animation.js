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
