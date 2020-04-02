const mymap = L.map('mapid').setView([37.0902, -95.7129], 4);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1Ijoic2hhd24yMjBhIiwiYSI6ImNrNnY0MnAycjBnM2UzbnBhNTF3dm8ycm8ifQ.aKQXbriGCk9DpMsks6Cwpw',
  }
).addTo(mymap);

$(document).ready(function () {

  $('#newEntry').submit(function () {
    event.preventDefault();

    const locValue = $('#attractionName').val().trim();
    const journalValue = $('#attractionDescription').val().trim();

    const geo = function (address) {
      const queryURL = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=3cca82ed19694ee4be80b7b5ffa9b7a6`;
      $.ajax({
        url: queryURL,
        method: 'GET',
      }).then(function (response) {
        // console.log(response.results[0].geometry.lat)
        // const localeLat = ;
        // const localeLng = ;

        const newData = {
          location: locValue,
          journal_entry: journalValue,
          latitude: response.results[0].geometry.lat,
          longitude: response.results[0].geometry.lng,
        };

        $.ajax({
          url: '/api',
          type: 'POST',
          data: newData,
        }).then(function () {
          $("#newEntry")[0].reset();
          getData();
        });
      });
    };
    geo($('#attractionLocation').val().trim());
  });
});

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  console.log(response);
  console.log(data);
  
  

  for (item of data) {
    const txt1 = `<li class="entryLog" data-id="${item.id}">`;
    const txt2 = `<p class="entryTitle">${item.location}</p>`;
    const txt3 = `<div class="entry entryTitle"><p>${item.journal_entry}</p><button class="delete">Delete this log!</button></div></li>`;

    $('ul').prepend(txt1 + txt2 + txt3);
    

    const marker = L.marker([item.latitude, item.longitude]).addTo(mymap);
    const txt = `${item.location}`;

    marker.bindPopup(txt);
  }
  $('.delete').click(function () {
    // console.log("fuck this")
    event.stopPropagation();
    const id = this.parentElement.parentElement.attributes[1].value;
    // console.log(this.parentElement.parentElement.attributes[1].value)
    $.ajax({
      method: "DELETE",
      url: `/api/logs/${id}`
    }).then(function () {
      getData();
    });
  });
}

getData();

const coll = document.getElementsByClassName('collapsible');
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
}

// const marker = L.marker([37.8199, -122.4783]).addTo(mymap)
