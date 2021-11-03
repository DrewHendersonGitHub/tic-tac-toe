$(document).ready(function() {
  $("#mainForm").submit(function(event) {
    event.preventDefault();

    $("#results").show();
  });
});