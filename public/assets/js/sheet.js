function Sheet(clef, meter, key, baseNoteLength) {
  var time = moment().format("ll");
  //console.log(time);
  var music = "X: 1\n" + 
              "T: " + time + "\n" + 
              "M: " + meter + "\n" + 
              "L: " + baseNoteLength + "\n" + 
              "K: " + key;

  this.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'c', 'd', 'e', 'f', 'g', 'a', 'b'];
  this.beats =  (eval(meter)/eval(baseNoteLength));
  this.keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Ab', 'Bb', 'C#', 'Cb', 'Db', 'Eb', 'F#', 'Gb'];
  this.random = function(){
    for(var i = 0; i < 28; i++){
      
      if(i % 4 === 0){
        music += "\n"; //every 4 bars start a new line
      }
      music += this.newBar(4);
    }
    return music;
  }
  this.newBar = function(beats){
    var bar = "";  //initialize a new bar as an empty string
    while (beats > 0){
      var options = ["3", "2", "1", "1/2"];
      var newBeat = options[Math.floor(Math.random()* options.length)];
      if (parseFloat(eval(newBeat)) <= beats){
        bar += this.notes[Math.floor(Math.random() * this.notes.length)] + newBeat;
        beats -= parseFloat(eval(newBeat));
      } else {
        var index = options.indexOf(newBeat);
        options.splice(index);
      }
    }
    bar += "|";
    return bar;
  }
}

/*
var s = new Sheet("treble", "4/4", "A", "1/4");
var m = s.random();
console.log(m);
*/
