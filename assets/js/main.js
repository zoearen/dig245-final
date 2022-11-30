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

function getInputValue() {
    //inputVal variables
    let inputVal = document.getElementById("inputVal").value;
    var value = JSON.stringify(inputVal);

    //sentiment analysis call
    fetchSentiment(value);
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

  const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then(response =>
      {return response.json()}
      ({
      status: response.status,
      body: response.json()
    })
  )
    .then(body =>
      {console.log(body);
        console.log(body.score_tag);
        var sentimentAnalysis = body.score_tag;
        document.getElementById("info").innerHTML = "Content Moderator Score: " + sentimentAnalysis;

        if (sentimentAnalysis='P') {
          document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling <strong>"  + happyemotions[randomhappy] + "</strong>";
        }
        else if (sentimentAnalysis='N') {
              document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling "  + sademotions[randomsad];
        }
        else {
              document.getElementById("diagnosis").innerHTML = "Dr. Duck has concluded that you are feeling "  + neutralemotions[randomneutral];
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

// When the user clicks the button, open the modal
function display() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function exit() {
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
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
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
    }

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
