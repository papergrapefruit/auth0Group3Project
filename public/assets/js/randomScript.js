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
}
function generateRandomScore(){
  ABCJS.plugin.hide_abc = true;
  music = new Sheet("treble", "4/4", "C", "1/4").random();
  $("#saveRandom").attr("score-id", "none");
  $("#canvas").html(music);
  ABCJS.plugin.start(jQuery);
}
var user;
var music;
$(document).ready(function(){
  $("#signOut").empty().html("<a href='/'>Home</a>");
  try{
    user = JSON.parse(sessionStorage.getItem("user")).id;
  }catch(err){
    console.log("No user logged.  Saving disabled");
    $("#title-row").remove();
    $("#body-row").remove();
    $("#saveRandom").remove();
  }
  generateRandomScore();


  $("#saveRandom").on("click", function(){
    if (user === undefined)
      return;
    var scoreId = $(this).attr("score-id");
    console.log(scoreId);
    if(scoreId !== "none"){
      modalAlert("Already Saved!");
      return;
    }
    var title = new ABCJS.TuneBook(music).tunes[0].title.trim();
    console.log(title);

    $.post("/api/save/random", {
      title: title, 
      music: music, 
      random: true,
      user: user }, 
      function(result){
        //console.log(result.score.id);
        addToSavedList(music, title, result.score.id);
        modalAlert("Success!");
      });
    });

  $("#newRandom").on("click", function(){
    $("#saveRandom").attr("score-id", "none");
    generateRandomScore();
  })

  $(document).on("click", ".score-item", function(){
    music = $(this).attr("music");
    $("#saveRandom").attr("score-id", $(this).attr("score-id"));
    $("#canvas").html(music);
    ABCJS.plugin.start(jQuery);
  });

  $(document).on("click",".delete", function(){
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
