function modalAlert(message){
    if(message)
        $("#message").html(message);
    modal.style.display = "block";
}
var modal;
var span;
$(document).ready(function(){


modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
 span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

});