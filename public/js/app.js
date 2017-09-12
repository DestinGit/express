$(document).ready(function () {
    $message = $('#message');
    $message.hide();

   $('#form').submit(function (ev) {
       ev.preventDefault();

        let data = $(this).serialize();
        $.post('/process-form', data)
            .done(function (response) {
                $message.html(response.message);
                $message.show();

                $('#form').find('input').val('');
            // console.log(response);
        });
   });
});