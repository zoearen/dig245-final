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

function displayJSON(d) {
  $("textarea").html(d);
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
        var condition = "";
        if (sentimentAnalysis=='P') {
          condition = happyemotions[randomhappy];
          document.getElementById("condition").innerHTML = "More about <strong> " + condition + "</strong>";
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <strong>positive</strong> emotions";
          document.getElementById("diagnosis").innerHTML = "Dr. Duck believes you are at risk of <strong>"  + condition + "</strong>";
        }
        else if (sentimentAnalysis=='N') {
          condition = sademotions[randomhappy];
          document.getElementById("condition").innerHTML = "Read More about  " + condition + ".";
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <strong>negative</strong> emotions";
          document.getElementById("diagnosis").innerHTML = "Dr. Duck believes you are at risk of <strong>"  + sademotions[randomsad] + "</strong>";
        }
        else {
          condition = neutralemotions[randomhappy];
          document.getElementById("condition").innerHTML = "Read More about  " + condition + ".";
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <strong>neutral</strong> emotions";
          document.getElementById("diagnosis").innerHTML = "Dr. Duck believes you are at risk of <strong>"  + neutralemotions[randomneutral] + "</strong>";
        }
      }
    )
    .catch(error => console.log('error', error));
}

function getDiagnosis(){
  const happydiagnoses = ["Happy Hummer Syndrome", "Cheerful Chick Syndrome"];
  const saddiagnoses = ["Angry Avian Disorder", "Inadequate Ibis Complex"];
  const neudiagnoses = ["Indifferent Ibis Complex", "Mellow Mallard Syndrome"];

  const randhap = Math.floor(Math.random() * happydiagnoses.length);
  const randsad = Math.floor(Math.random() * saddiagnoses.length);
  const randneu = Math.floor(Math.random() * neudiagnoses.length);
  var sentimentAnalysis = Math.random(20);
  document.getElementById("info").innerHTML = "Content Moderator Score: " + sentimentAnalysis;

  if (sentimentAnalysis>10) {
    document.getElementById("diagnosis").innerHTML = "Dr. Duck has diagnosed you with <strong>"  + happydiagnoses[randhap] + "</strong>";
  }
  else if (sentimentAnalysis<10) {
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has diagnosed you with <strong>"  + saddiagnoses[randsad];
  }
  else {
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has diagnosed you with <strong>" + neudiagnoses[randneu];
  }
}

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
