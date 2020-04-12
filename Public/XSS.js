let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById("output").innerHTML = input.value;
  });



