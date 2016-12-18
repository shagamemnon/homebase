$(function(){
  $('.filterMenu a').click(function(e){
    var $selection = $(this);
        queryValue = $(this).text(),
        filter = $('section a:contains(' + queryValue + ')'),
        results = filter.parents('article');
    e.preventDefault();
    $('.filterMenu a').removeClass('is-active-filter');
    $selection.addClass('is-active-filter');
    results.siblings('article').addClass('is-inactive');
  });
  $('#all a').click(function(){
    $('article').removeClass('is-inactive');
    $('.filterMenu a').removeClass('is-active-filter');
    $(this).addClass('is-active-filter');
  });
});