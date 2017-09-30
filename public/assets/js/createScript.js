function initEditor() {
  new ABCJS.Editor("abc", { 
    paper_id: "canvas",
    generate_midi: false,
    generate_warnings: true,
    warnings_id:"warnings"
  });
}

function addToSavedList(music, title, id){
  var html = 
`<li class="row score-list-item" id="score${id}">
  <div class="col-xs-10">
    <div music='${music}' score-id='${id}'class="score-item text-center">
    <strong>${title}</strong></div>
  </div>
  <div class="col-xs-2">
    <span class="delete glyphicon glyphicon-remove" title="Delete" score-id='${id}'></span>
  </div>
</li>`;
  $("#score-list").append(html);
  $("#saveCreation").attr("score-id", id);
}

window.addEventListener("load", initEditor, false);
function makeMidi(){
    if($("#abc").val().trim() === ""){
      return;
    }
    $("#midi").hide();
    $("#message").empty();
    try{
      abc_editor = new ABCJS.Editor(
        "abc", {
          generate_midi: true,
          paper_id: "canvas",
          midi_id: "midi",
          midi_download_id: "message", 
          generate_warnings: false,
          midi_options: {
            generateDownload: true
          }
        });
    }catch(err){
      modalAlert("Resolve errors in abc text");
    }
      //console.log(abc_editor);
    abc_editor = null; //after it makes the midi, nullify the editor
                       //or user will get errors the first change they make
    $("#warnings").empty();//abc_editor leaves a blanks space after creating the midi, which
                           //interupts the ability to save afterwards
    modalAlert();
  }
var user;
$(document).ready(function () {
  $("#signOut").empty().html("<a href='/'>Home</a>");
/*
  abc_editor = new ABCJS.Editor("abc", { 
    paper_id: "canvas",
    generate_midi: false,
    generate_warnings: true,
    warnings_id:"warnings"
  });
*/
  try{
    user = JSON.parse(sessionStorage.getItem("user")).id;
  }catch(err){
    console.log("No user logged.  Saving disabled");
    $("#title-row").remove();
    $("#body-row").remove();
    $("#saveCreation").remove();
  }

  
  $("#saveCreation").on("click",
    function () {
      var abc = $("#abc").val().trim();
      var title = new ABCJS.TuneBook(abc).tunes[0].title;
      if(title === "")
        title = "Untitled";

      if ($("#warnings").is(":empty") && abc !== "") { //only allow user to save if score is error free, and not blank
        var id = $(this).attr("score-id");
        if(id){
          $.ajax({
            method: "PUT",
            url: "/api/update/creation",
            data: {
              title: title,
              music: abc,
              user: user,
              id: id,
            },
            success: function(data){
              modalAlert("Success!");
            }
          })

        } else {
          $.post(
            "/api/save/creation", {
              title: title,
              music: abc,
              random: false,
              user: user,
            },
            function (result) {
              addToSavedList(abc, title, result.score.id);
              modalAlert("Success!");
              //window.location.href = "/create/" + user;
            });
          }
      } else {
        modalAlert(
          "Please resolve warnings before saving.  ABC cannot be blank"
        );
      }
    });

  $("#makeMidi").on("click", makeMidi);

  $("#newScore").on("click", function(){
    $("#saveCreation").removeAttr("score-id");
    $("#abc").val("");
  })

  $(document).on("click", ".score-item", function(){
    $("#abc").val($(this).attr("music"));
    $("#abc").focus();
    $("#saveCreation").attr("score-id", $(this).attr("score-id"));
  });

  $(document).on("click", ".delete", function(){
    var package = {
      id: $(this).attr("score-id")
    } 

    $.ajax({
      url: "/api/delete/score",
      method: "DELETE",
      data: package,
      success: function(){
        $("#score" + package.id).remove();
      }
    });
  });
});