/* javascript */
const happyemotions = ["happy","happy.","happy.", "content."];
const neutralemotions = ["ok.","fine.","alright."];
const sademotions = ["inadequate.","sad.","upset.", "angry."];

const randomhappy = Math.floor(Math.random() * happyemotions.length);
const randomneutral = Math.floor(Math.random() * neutralemotions.length);
const randomsad = Math.floor(Math.random() * sademotions.length);

document.getElementById('button').addEventListener('click', function(){
    document.getElementById('report').style.display = "block";
});

function getInputValue() {
    //Date variables
    var date = document.getElementById('date');
    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()
    date.innerHTML = "Date: " + cDay + "/" + cMonth + "/" + cYear;

    //inputVal variables
    let inputVal = document.getElementById("inputVal").value;
    var value = JSON.stringify(inputVal);

    //Name variables
    let arr = value.split(' ');
    var name = document.getElementById('name');
    let nameCap = arr[Math.floor(Math.random() * arr.length)];
    let finalName = nameCap.replace(/"/g, '');
    name.innerHTML = "Patient Name: " + finalName.toUpperCase();

    //console testers
    console.log(arr);
    console.log(name);
    fetchSentiment(value);
    /*textSentiment(value);*/
}

function displayJSON(d) {
  $("textarea").html(d)
}

async function fetchSentiment(text) {
  // data to send to the sentiment api
  var requestData = {
    "text": text
  };

  await fetch('https://sentim-api.herokuapp.com/api/v1/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      return response.json();
    })
    .then(responseData => {

      console.log(
        responseData.sentences[0].sentence,
        responseData.sentences[0].sentiment.polarity,
        responseData.sentences[0].sentiment.type,
        responseData);

      var sentimentAnalysis = responseData.sentences[0].sentiment.polarity;
      document.getElementById("info").innerHTML = "Content Moderator Score: " + sentimentAnalysis;

      if (sentimentAnalysis>0) {
        document.getElementById("diagnosis").innerHTML = "Your Facebook content recieved a score of " + sentimentAnalysis + ". Dr. Duck has concluded that you are feeling "  + happyemotions[randomhappy];
      }
      else if (sentimentAnalysis<0) {
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling "  + sademotions[randomsad];
      }
      else {
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling "  + neutralemotions[randomneutral];
      }
    });
}
