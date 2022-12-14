/* javascript */
function typeEffect(element, speed) {
	var text = element.innerHTML;
	element.innerHTML = "";
	var i = 0;

	var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// application
var speed = 105;
var splash = document.getElementById('splash');
var delay = splash.innerHTML.length * speed + speed;

// type affect to header
typeEffect(splash, 105);

$(window).on('load', function(){
    $('html, body').scrollTop(0);
});

// $('#treatment1').click(function(e) {
//   e.preventDefault();
// });
// $('#treatment2').click(function(e) {
//   e.preventDefault();
// });
// $('#treatment3').click(function(e) {
//   e.preventDefault();
// });

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
  // var date = document.getElementById('date');
  // let currentDate = new Date();
  // let cDay = currentDate.getDate();
  // let cMonth = currentDate.getMonth() + 1;
  // let cYear = currentDate.getFullYear();
  // date.innerHTML = "<strong>Date: </strong>" + cDay + "/" + cMonth + "/" + cYear;

  //inputVal variables
  let inputVal = document.getElementById("inputVal").value;
  var value = JSON.stringify(inputVal);

  //Name variables
  // let arr = value.split(' ');
  var name = document.getElementById('name');
  // let nameCap = arr[Math.floor(Math.random() * arr.length)];
  // let finalName = nameCap.replace(/"/g, '');
  let patient = Math.floor((Math.random() * 9) + 1);
  name.innerHTML = "<small> Patient ID:  A0" + patient + "F" + patient + "</small>";
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
          document.getElementById("treatment1").innerHTML = "Think Outside the Box";
          document.getElementById("treatment1").href = "https://poorlydrawnlines.com/wp-content/uploads/2015/01/sing.png";
          document.getElementById("treatment2").innerHTML = "Share Your Happiness";
          document.getElementById("treatment2").href = "https://lowres.cartooncollections.com/birds-baby_birds-chicks-pigeons-children-families-WJ500834_low.jpg";
          document.getElementById("treatment3").innerHTML = "Adorn An New Persona";
          document.getElementById("treatment3").href = "https://i.pinimg.com/originals/94/93/33/94933365aa4682a28d2823a0a42bd8c9.jpg";
        } else if (sentimentAnalysis=='N') {
          const condition = sademotions[randomsad];
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <u>negative</u> emotions. Dr. Duck believes you are at risk of <strong style='color: #FF8D4E !important;'>"  + condition + "</strong>";
          document.getElementById("symptoms").innerHTML = "<ul><li>Lack of emotions</li><li>Unending drowsiness</li><li>Low self-esteem</li></ul>";
          document.getElementById("treatment1").innerHTML = "A Self-Care Guide";
          document.getElementById("treatment1").href = "https://i.etsystatic.com/18685415/r/il/e9684f/1781637953/il_794xN.1781637953_hgeq.jpg";
          document.getElementById("treatment2").innerHTML = "Positive Mindsets";
          document.getElementById("treatment2").href = "https://www.sunnyskyz.com/uploads/2017/03/f5yvc-wholesome-comics-15.png";
          document.getElementById("treatment3").innerHTML = "Renvision Yourself";
          document.getElementById("treatment3").href = "https://www.pleated-jeans.com/wp-content/uploads/2016/02/jim_33-1.jpg";
        } else {
          const condition = neutralemotions[randomneutral];
          document.getElementById("info").innerHTML = "Based on your input, the algorithm has identified symptoms of <u>neutral</u> emotions. Dr. Duck believes you are at risk of <strong style='color: #FF8D4E !important;'>"  + condition + "</strong>";
          document.getElementById("symptoms").innerHTML = "<ul><li>Spiritless apathy</li><li>Passive indifference</li><li>Impartial detachment</li></ul>";
          document.getElementById("treatment1").innerHTML = "A Break from Neutrality";
          document.getElementById("treatment1").href = "http://cdn.ebaumsworld.com/mediaFiles/picture/540044/813313.png";
          document.getElementById("treatment2").innerHTML = "Learn from Example";
          document.getElementById("treatment2").href = "chickadee.html";
          document.getElementById("treatment3").innerHTML = "Try Something New";
          document.getElementById("treatment3").href = "https://forklores.files.wordpress.com/2013/09/bird-yoga-cartoon.jpg";
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
