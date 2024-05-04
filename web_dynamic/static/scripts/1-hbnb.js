window.addEventListener('load', function () {
    let amenity_ids = {};
    $('input[type=checkbox]').change(function () {
      if ($(this).prop('checked')) {
        amenity_ids[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete amenity_ids[$(this).attr('data-id')];
      }
      if (Object.keys(amenity_ids).length === 0) {
        $('div.amenities h4').html('&nbsp');
      } else {
        $('div.amenities h4').text(Object.values(amenity_ids).join(', '));
      }
    });
  });