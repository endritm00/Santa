(function($) {
  $('.who__slider').slick({
    centerMode: true,
    slidesToShow: 3,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  });
  $('body').on('keyup', 'input.card-input', function () {
    var key = event.keyCode || event.charCode;
    var inputs = $('input.card-input');
    if (($(this).val().length === this.size) && key != 32) {
      inputs.eq(inputs.index(this) + 1).focus();
    }
    if (key == 8 || key == 46) {
      var indexNum = inputs.index(this);
      if (indexNum != 0) {
        inputs.eq(inputs.index(this) - 1).val('').focus();
      }
    }
  });
  $('body').on('keyup', 'input.exp-input', function () {
    var key = event.keyCode || event.charCode;
    var inputs = $('input.exp-input');
    if (($(this).val().length === this.size) && key != 32) {
      inputs.eq(inputs.index(this) + 1).focus();
    }
    if (key == 8 || key == 46) {
      var indexNum = inputs.index(this);
      if (indexNum != 0) {
        inputs.eq(inputs.index(this) - 1).val('').focus();
      }
    }
  });
  $('.purchase__form-card').on('click', function () {
    $('#card').focus();
  })
  $('.purchase__form-exp').on('click', function () {
    $('#expire-card').focus();
  })


  $(function () {
    new WOW().init();
  });
  $(".hero__order-btn, .who__bonus-oder a").on('click', function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $(".purchase").offset().top
    }, 2000);
  });
  let countDate = moment().format('2020/11/28 12:00', "America/Sao_Paulo");
  $('#daysUntilStream').countdown(countDate, function(event) {
    $(this).html(event.strftime('%D Days'));
  });
  $('#daysUntilStream1').countdown(countDate, function(event) {
    $(this).html(event.strftime('%D Days'));
  });
  $('#hoursUntilStream').countdown(countDate, function(event) {
    $(this).html(event.strftime('%H Hours'));
  });
  $('#hoursUntilStream1').countdown(countDate, function(event) {
    $(this).html(event.strftime('%H Hours'));
  });
  $(function(){
    let formRow = $('.form-row_duplicate');
    let formRowDuplicate = $('.form-row_duplicate .form-row_hidden');
    let formRowDelete = $('.form-row_active_close');

    $('.purchase__form-footer-add a').on('click', function(e){
      e.preventDefault();
      if( $('.form-row_duplicate .form-row').length < 4 ){
        $(formRowDuplicate).clone().appendTo(formRow).removeClass('form-row_hidden').addClass('form-row_active');
      }
    })

    $('.form-row_duplicate').on('click', '.form-row_active_close', function(){
        $(this).closest('.form-row_active').remove();
    })
  });

  var isFirefox = (navigator.userAgent.indexOf('Firefox') !== -1);
  if(isFirefox){
    $('body').addClass('isFirefox')
  }
  else{
    $('body').addClass('isNotFirefox')
  }
})

(jQuery);
  

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgJCgnLndob19fc2xpZGVyJykuc2xpY2soe1xyXG4gICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgIHNsaWRlc1RvU2hvdzogOCxcclxuICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcbiAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgIGFycm93czogZmFsc2UsXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICB9KTtcclxuXHJcbiAgJCgnYm9keScpLm9uKCdrZXl1cCcsICdpbnB1dC5jYXJkLWlucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGtleSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQuY2hhckNvZGU7XHJcbiAgICB2YXIgaW5wdXRzID0gJCgnaW5wdXQuY2FyZC1pbnB1dCcpO1xyXG4gICAgaWYgKCgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PT0gdGhpcy5zaXplKSAmJiBrZXkgIT0gMzIpIHtcclxuICAgICAgaW5wdXRzLmVxKGlucHV0cy5pbmRleCh0aGlzKSArIDEpLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5ID09IDggfHwga2V5ID09IDQ2KSB7XHJcbiAgICAgIHZhciBpbmRleE51bSA9IGlucHV0cy5pbmRleCh0aGlzKTtcclxuICAgICAgaWYgKGluZGV4TnVtICE9IDApIHtcclxuICAgICAgICBpbnB1dHMuZXEoaW5wdXRzLmluZGV4KHRoaXMpIC0gMSkudmFsKCcnKS5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgJCgnYm9keScpLm9uKCdrZXl1cCcsICdpbnB1dC5leHAtaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIga2V5ID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC5jaGFyQ29kZTtcclxuICAgIHZhciBpbnB1dHMgPSAkKCdpbnB1dC5leHAtaW5wdXQnKTtcclxuICAgIGlmICgoJCh0aGlzKS52YWwoKS5sZW5ndGggPT09IHRoaXMuc2l6ZSkgJiYga2V5ICE9IDMyKSB7XHJcbiAgICAgIGlucHV0cy5lcShpbnB1dHMuaW5kZXgodGhpcykgKyAxKS5mb2N1cygpO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PSA4IHx8IGtleSA9PSA0Nikge1xyXG4gICAgICB2YXIgaW5kZXhOdW0gPSBpbnB1dHMuaW5kZXgodGhpcyk7XHJcbiAgICAgIGlmIChpbmRleE51bSAhPSAwKSB7XHJcbiAgICAgICAgaW5wdXRzLmVxKGlucHV0cy5pbmRleCh0aGlzKSAtIDEpLnZhbCgnJykuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQoJy5wdXJjaGFzZV9fZm9ybS1jYXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2NhcmQnKS5mb2N1cygpO1xyXG4gIH0pXHJcbiAgJCgnLnB1cmNoYXNlX19mb3JtLWV4cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNleHBpcmUtY2FyZCcpLmZvY3VzKCk7XHJcbiAgfSlcclxuXHJcblxyXG4gICQoZnVuY3Rpb24gKCkge1xyXG4gICAgbmV3IFdPVygpLmluaXQoKTtcclxuICB9KTtcclxuICAkKFwiLmhlcm9fX29yZGVyLWJ0biwgLndob19fYm9udXMtb2RlciBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xyXG4gICAgICBzY3JvbGxUb3A6ICQoXCIucHVyY2hhc2VcIikub2Zmc2V0KCkudG9wXHJcbiAgICB9LCAyMDAwKTtcclxuICB9KTtcclxuICBsZXQgY291bnREYXRlID0gbW9tZW50KCkuZm9ybWF0KCcyMDIwLzExLzI4IDEyOjAwJywgXCJBbWVyaWNhL1Nhb19QYXVsb1wiKTtcclxuICAkKCcjZGF5c1VudGlsU3RyZWFtJykuY291bnRkb3duKGNvdW50RGF0ZSwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICQodGhpcykuaHRtbChldmVudC5zdHJmdGltZSgnJUQgRGF5cycpKTtcclxuICB9KTtcclxuICAkKCcjZGF5c1VudGlsU3RyZWFtMScpLmNvdW50ZG93bihjb3VudERhdGUsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAkKHRoaXMpLmh0bWwoZXZlbnQuc3RyZnRpbWUoJyVEIERheXMnKSk7XHJcbiAgfSk7XHJcbiAgJCgnI2hvdXJzVW50aWxTdHJlYW0nKS5jb3VudGRvd24oY291bnREYXRlLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgJCh0aGlzKS5odG1sKGV2ZW50LnN0cmZ0aW1lKCclSCBIb3VycycpKTtcclxuICB9KTtcclxuICAkKCcjaG91cnNVbnRpbFN0cmVhbTEnKS5jb3VudGRvd24oY291bnREYXRlLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgJCh0aGlzKS5odG1sKGV2ZW50LnN0cmZ0aW1lKCclSCBIb3VycycpKTtcclxuICB9KTtcclxufVxyXG4pKGpRdWVyeSk7XHJcbiAgXHJcbiJdfQ==
