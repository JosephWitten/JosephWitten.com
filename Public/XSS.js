let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    input.value = 'refreshed';
  });



window.onsubmit = function() {
    var val = document.getElementById("input").value
    document.getElementById("output").innerHTML = val
};



