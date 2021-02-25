$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "https://api.themoviedb.org/3/movie/550?api_key=dcdf61f3b7d7a5c9d5d4785aaeea0c19&page=1",
        data: {"key":"value"},
        dataType: "object",
        success: function (json) {
            console.log(json)
        }
    });

});