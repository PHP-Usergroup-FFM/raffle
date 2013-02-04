
$(document).ready( function() {

    $('a.add_attendee').live('click', function() {
        if( $(this).find('i').hasClass('icon-plus') ) {
            var newElem = $($(this).parent()[0]).clone(true);
            $(newElem).find('input[type="text"]').val('');
            $('#attendee_form').append(newElem);
            $(newElem).find('input').focus();
            $(this).find('i').removeClass('icon-plus').addClass('icon-minus');
        } else if( $(this).find('i').hasClass('icon-minus') ) {
            $($(this).parent()[0]).remove();
        }
    });

    $('a[rel="raffle"]').click( function() {
        var attendees = [];
        $('input[name="attendee"]').each( function( index, elem ) {
            attendees.push( $(elem).val() );
        });

        var randomNumberGenerator = new Alea();
        var randomWinnerNumber = Math.floor( randomNumberGenerator() * attendees.length );
        while( attendees[randomWinnerNumber].length <= 0 ) {
            randomWinnerNumber = Math.floor( randomNumberGenerator() * attendees.length );
        }
        $('#winner').html(attendees[randomWinnerNumber]);
        $('#winner_dialog').modal('show');
    });

    $('input[name="attendee"]').live( 'keypress', function(e) {
        var inputButton = $(this).next().find('i.icon-plus');
        if( inputButton ) {
            if( e.charCode === 13 || e.keyCode === 13 ) {
                $(inputButton).click();
            }
        }
    });

    $('#winner_dialog').on("show", function() {
        $('#winner_dialog a.btn').on( "click", function(e) {
            $('#winner_dialog').modal('hide');
        });
    });

    $('#winner_dialog').modal({
        "backdrop" : "static",
        "keyboard" : true,
        "show"     : false
    })
});