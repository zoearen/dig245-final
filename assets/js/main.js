/* javascript */

/*--------------------Button Function---------------------------*/
var current = 0;
for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href === document.URL) {
        current = i;
    }
}
document.links[current].className = 'current';
//end button

/*--------------------ARRAYS/VARIABLES---------------------------*/
const happyemotions = ["Happy Hummer Syndrome.", "Cheerful Chick Syndrome."];
const neutralemotions = ["Indifferent Ibis Complex.", "Mellow Mallard Syndrome."];
const sademotions = ["Angry Avian Disorder.", "Inadequate Ibis Complex."];

const randomhappy = Math.floor(Math.random() * happyemotions.length);
const randomneutral = Math.floor(Math.random() * neutralemotions.length);
const randomsad = Math.floor(Math.random() * sademotions.length);

function getInputValue() {
    //inputVal variables
    let inputVal = document.getElementById("inputVal").value;
    var value = JSON.stringify(inputVal);


    if(document.getElementById("inputVal").value.trim() == ''){
        alert("Please enter text in the form.");
        document.querySelector('#inputVal').classList.add('border');
    } else {
      try {
          modal.style.display = "block";
          fetchSentiment(value);
      }
      catch ( e ) {
          getDiagnosis();
      }
      finally {
          getNameAndDate();
      }
    }
}

function getNameAndDate() {
  //Date variables
  var date = document.getElementById('date');
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  date.innerHTML = "<strong>Date: </strong>" + cDay + "/" + cMonth + "/" + cYear;

  //inputVal variables
  let inputVal = document.getElementById("inputVal").value;
  var value = JSON.stringify(inputVal);

  //Name variables
  let arr = value.split(' ');
  var name = document.getElementById('name');
  let nameCap = arr[Math.floor(Math.random() * arr.length)];
  let finalName = nameCap.replace(/"/g, '');
  name.innerHTML = "<strong>Name: </strong>" + finalName.toUpperCase();
  console.log(finalName);
}

function getDiagnosis(){
  alert("Sorry, the code for this website is experiencing an error. Please try again.");
}

async function fetchSentiment(text) {
  // data to send to the sentiment api
  const formdata = new FormData();
  formdata.append("key", "d465489ee701fc545ad8161d0c4e1137");
  formdata.append("txt", text);
  formdata.append("lang", "en");  // 2-letter code, like en es fr ...

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  var response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then(response =>
      {return response.json();})

    .then(body =>
      {console.log(body);
        console.log(body.score_tag);
        var sentimentAnalysis = body.score_tag;
        if (sentimentAnalysis=='P') {
          const condition = happyemotions[randomhappy];
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <u>happy</u> emotions. Dr. Duck believes you are at risk of <strong style='color: #FF8D4E !important;'>"  + condition + "</strong>";
          document.getElementById("symptoms").innerHTML = "<ul><li>Excessive happiness</li><li>Tickled feathers</li><li>High Resiliancy</li></ul>";
          // document.getElementById("treatment").innerHTML = "<a href='https://www.theonion.com/free-spirited-man-informed-it-time-to-grow-up-and-stop-1849518790'>Stop Being Happy</a><a href='https://thelawofattraction.com/how-to-be-unhappy/'>Guide to Unhapiness</a>";
        } else if (sentimentAnalysis=='N') {
          const condition = sademotions[randomsad];
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <u>negative</u> emotions. Dr. Duck believes you are at risk of <strong style='color: #FF8D4E !important;'>"  + condition + "</strong>";
          document.getElementById("symptoms").innerHTML = "<ul><li>Spiritless apathy</li><li>Passive indifference</li><li>Impartial detachment</li></ul>" ;
        } else {
          const condition = neutralemotions[randomneutral];
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <u>neutral</u> emotions. Dr. Duck believes you are at risk of <strong style='color: #FF8D4E !important;'>"  + condition + "</strong>";
          document.getElementById("symptoms").innerHTML = "<ul><li>Dispirited disdain</li><li>Unending drowsiness</li><li>Shiftless</li></ul>" ;
        }
      }
    )
    .catch(error => console.log('error', error));
}
/*--------------------MODAL SHIT---------------------------*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
/*end modal shit*/

/*--------------------NAV BAR-------------------------*/
