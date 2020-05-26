$('.tabs .tab').click(function(){
    if ($(this).hasClass('faculty')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.faculty-cont').show();
    } 
    if ($(this).hasClass('admin')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.admin-cont').show();

    }
    if ($(this).hasClass('guest')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.guest-cont').show();

    }
});

