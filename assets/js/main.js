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
const happyemotions = ["happy hopper.","happy.","content clam.", "content."];
const neutralemotions = ["ok.","fine.","alright."];
const sademotions = ["angry avian syndrome.","an inadequate ibis complex.", "upset urchin.", "angry."];

const randomhappy = Math.floor(Math.random() * happyemotions.length);
const randomneutral = Math.floor(Math.random() * neutralemotions.length);
const randomsad = Math.floor(Math.random() * sademotions.length);

document.getElementById('button').addEventListener('click', function(){
    document.getElementById('report').style.display = "block";
});

function getNameAndDate() {
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

}

function getInputValue() {
    //inputVal variables
    let inputVal = document.getElementById("inputVal").value;
    var value = JSON.stringify(inputVal);

    //sentiment analysis call
    fetchSentiment(value);
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
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling <strong>"  + happyemotions[randomhappy] + "</strong>";
      }
      else if (sentimentAnalysis<0) {
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling "  + sademotions[randomsad];
      }
      else {
        document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling "  + neutralemotions[randomneutral];
      }
    });
}

/*--------------------MODAL SHIT---------------------------*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

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
/*end modal shit*/

/*--------------------NAV BAR---------------------------*/
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
