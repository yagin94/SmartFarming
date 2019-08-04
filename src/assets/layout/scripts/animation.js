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

//qa-page-post
// $(document).on('ready', function() {
//   $(document).on('click', '.tag', function() {
//     var tagsInput = $('input[data-role="tagsinput"]');
//     var valuesStr = tagsInput.val();
//     var values = valuesStr.split(',');
//
//     var bootstrapTagsInput = $('.bootstrap-tagsinput');
//     bootstrapTagsInput.style.display ="block !important";
//     var input = bootstrapTagsInput.find('input');
//     var index = bootstrapTagsInput.children().index($(this));
//     value = values[index];
//
//     var htmlStr = 	'<span class="tag label label-info" id="js-edit-container">' +
//       '<input type="text" class="form-control" id="js-edit-input" style="background-color: white;min-width: 100%;">' +
//       '</span>'
//     $(this).after(htmlStr);
//     $(this).hide();
//     input.hide();
//
//     var editContainer = $('#js-edit-container');
//     var editInput = $('#js-edit-input');
//     editContainer.data('value', value);
//     editInput.val(value);
//     editInput.focus();
//   });
//
//   $(document).on('focusout', '#js-edit-input', function() {
//     var bootstrapTagsInput = $('.bootstrap-tagsinput');
//     var editContainer = $('#js-edit-container');
//     var tags = bootstrapTagsInput.children();
//     var index = tags.index(editContainer);
//
//     var tagsInput = $('input[data-role="tagsinput"]');
//     var values = tagsInput.val().split(',');
//
//     var value = $(this).val();
//     var defaultValue = editContainer.data('value');
//     var value = value || defaultValue;
//
//     var input = bootstrapTagsInput.find('input');
//
//     editContainer.remove();
//     values[index - 1] = value;
//     tagsInput.tagsinput('removeAll');
//
//     for (var i = 0; i < values.length; i++) {
//       tagsInput.tagsinput('add', values[i]);
//     }
//
//     input.show();
//     input.focus();
//   });
// });

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


