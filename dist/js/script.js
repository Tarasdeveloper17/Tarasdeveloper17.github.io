$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"> <img src="./img/prev.svg" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/next.svg" alt="next"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__list__back');

  //Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click',function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.catalog-item__btn').on('click', function() {
    $('.overlay, #order').fadeIn('slow');
  });

  // перебираю кнопки шоб виводилася відповідна інфа при покупці

const catalogItemBtns = document.querySelectorAll('.catalog-item__btn');

catalogItemBtns.forEach(function(btn, i) {
  btn.addEventListener('click', function() {
    const catalogItemSubtitle = document.querySelectorAll('.catalog-item__subtitle')[i];
    let modalDescr = document.querySelector('#order .modal__descr');
    modalDescr.textContent = catalogItemSubtitle.textContent;
  });

});



function validateForm(form){
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Please specify your name",
      phone: {
       phone: "Your phone number must be in the format of +380",
       required: "We need your phone number to contact you",
      },
      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com"
      }
    }
  }); 
}

validateForm('#consultation-form');
validateForm('#consultation form');
validateForm('#order form');

$('input[name=phone]').mask("+38 (999)-99-99-999");


$('form').submit(function(e) {
  e.preventDefault();

  if(!$(this).valid()){
    return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");

      $('#consultation, #order').fadeOut(); 

      $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');

  });
  return false;
});

//Smooth Scroll pageup

$(window).scroll(function(){

  if($(this).scrollTop() > 1600){
    $('.pageup').fadeIn();
  }
  else
  {
    $('.pageup').fadeOut();
  }
 

});

// $(window).scroll(function(){

//   if($(this).scrollTop() > 3000){
//     $('.reviews-block').fadeIn();
//   }
//   else
//   {
//     $('.reviews-block').fadeOut();
//   }

// });

new WOW().init();


});

