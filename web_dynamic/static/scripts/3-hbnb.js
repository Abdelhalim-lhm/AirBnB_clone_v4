window.addEventListener('load', function () {
  function checkAPIStatus() {
    $.ajax('http://0.0.0.0:5001/api/v1/status')
      .done(function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      })
      .fail(function () {
        $('#api_status').removeClass('available');
      });
  }

  checkAPIStatus();

  function fetchAndRenderPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        renderPlaces(data);
      },
      error: function (xhr, status, error) {
        console.error('Error fetching places:', error);
      }
    });
  }

  function renderPlaces(places) {
    var placesSection = document.querySelector('.places');
    placesSection.innerHTML = '';
    places.forEach(function (place) {
      var article = document.createElement('article');
      article.innerHTML = `
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">${place.description}</div>
      `;
      placesSection.appendChild(article);
    });
  }

  fetchAndRenderPlaces();
});
