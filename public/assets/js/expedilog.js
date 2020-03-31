let locationSearch = ["Alamo", "Golden Gate Bridge", "Grand Canyon", "AT&T Stadium"]; // This will be the array of our log locations
let userSearch = []; // This will be the array of our usernames

let mymap = L.map('mapid').setView([37.0902, -95.7129], 5);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic2hhd24yMjBhIiwiYSI6ImNrNnY0MnAycjBnM2UzbnBhNTF3dm8ycm8ifQ.aKQXbriGCk9DpMsks6Cwpw"
  }
).addTo(mymap);

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}


autocomplete(document.getElementById("location"), locationSearch);

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

let background = function() {
  // Event listener for our cat-button

  // Storing our giphy API URL for a random cat image
  var queryURL = "https://pixabay.com/api/?key=15801379-7b9c3ade3001b04f83cbbf0cd&q=travel&q=destination&per_page=200&safesearch=true";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  // After the data from the AJAX request comes back
    .then(function(response) {
      // console.log("start");

    // Saving the image_original_url property
      let tinyImageURL;
      // console.log("2nd")
      const randomizer = function () {
        const rando = Math.floor(Math.random() * 200); 
        console.log("rando: "+rando);
        tinyImageURL = response.hits[rando];
        if (tinyImageURL.tags.includes("fantasy")) {
          randomizer();
        } else {
          console.log("tinyImageURL: "+tinyImageURL.previewURL);
          const tinyImageLength = tinyImageURL.previewURL.length;
          console.log("tinyImageLength: "+tinyImageLength);
          const imageURL = tinyImageURL.previewURL.slice(0, tinyImageLength-7)+"960_720."+tinyImageURL.previewURL.slice(tinyImageLength-3);
          console.log("imageURL: "+imageURL)
          document.querySelector(".imgBackground").setAttribute("src", `${imageURL}`);
        };
      };
      randomizer();
    });
}

// $(function() {
//   $(".devourIt").on("click", function (event) {
//     let id = $(this).data("id");
//     // let nowDevoured = $(this).data("devoured");

//     var nowDevouredState = {
//       devoured: 1   //nowDevoured
//     };

//     // Send the PUT request.
//     $.ajax("/api/burgers/" + id, {
//       type: "PUT",
//       data: nowDevouredState
//     }).then(
//       function() {
//         console.log("changed sleep to 1");
//         // Reload the page to get the updated list
//         location.reload();
//       }
//     );
//   });

//   $(".create-form").on("submit", function(event) {
//     // Make sure to preventDefault on a submit event.
//     event.preventDefault();

//     var newBurger = {
//       burger_name: $("#ca").val().trim(),
//       devoured: 0  //$("[name=devoured]:checked").val().trim()
//     };

//     // Send the POST request.
//     $.ajax("/api/burgers", {
//       type: "POST",
//       data: newBurger
//     }).then(
//       function() {
//         console.log("created new burger");
//         // Reload the page to get the updated list
//         location.reload();
//       }
//     );
//   });

//   // $(".delete-cat").on("click", (event) => {
//   //   var id = $(this).data("id");

//   //   // Send the DELETE request.
//   //   $.ajax("/api/cats/" + id, {
//   //     type: "DELETE"
//   //   }).then(
//   //     function() {
//   //       console.log("deleted cat", id);
//   //       // Reload the page to get the updated list
//   //       location.reload();
//   //     }
//   //   );
//   // });
// });
