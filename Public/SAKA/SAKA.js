let form = document.getElementById('form');
let input = document.getElementById('input');
let output = document.getElementById("caeserOutput")
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("")
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
let toAddToMaster = ""

form.addEventListener('submit', function(e) {
    masterCode = input.value
    masterCode = masterCode.toString()
    e.preventDefault();

    for (let i = 0; i < 26; i++) {
      toAddToMaster +=  "<br>" + "ROT" + i + " is " + caeser(masterCode, i)
    }
    console.log(lowercase)
    output.innerHTML = masterCode
  });

//1 means lower case, 2 means upper, 3 means not a letter
function caeser(masterCode, i) {
  let indexArray = []
    for (let j = 0; j < masterCode.length; j++) {
        let temp = []
        console.log(lowercase.indexOf(masterCode.charAt[j]))
        if (masterCode.indexOf(masterCode.charAt[j]) > -1) {
          temp.push(1)
          temp.push(lowercase.indexOf(masterCode.charAt[j]))
          indexArray.push(temp)
        }
        else if (uppercase.indexOf(masterCode.charAt(j)) > -1 ) {
          temp.push(2)
          temp.push(uppercase.indexOf(masterCode.charAt(j)))
          indexArray.push(temp)
        }
        else {
          temp.push(3)
          temp.push(masterCode.charAt(j))
          indexArray.push(temp)
        }
    }
    console.log(indexArray)

    return masterCode
}