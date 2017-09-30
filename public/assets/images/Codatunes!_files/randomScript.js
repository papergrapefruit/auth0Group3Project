var user = JSON.parse(sessionStorage.getItem("user")).id;
$(document).ready(function(){
  ABCJS.plugin.hide_abc = true;
  const music = new Sheet("treble", "4/4", "C", "1/4").random();
  //$("#canvas").html(music.replace(/Q:1\/4=[0-9]*/, "Q:1/4=" + $(this).val()));
  $("#canvas").html(music);
  ABCJS.plugin.start(jQuery);
  console.log(user);

  $("#saveRandom").on("click", function(){
    $.post("/api/save/random", {
      title: "test", 
      music: music, 
      random: true,
      user: user}, 
      function(result){
      console.log(result);
    });
  });
});
