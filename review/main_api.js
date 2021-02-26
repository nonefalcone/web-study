let target_movie=0; //해당 영화의 id 값을 받기 위한 전역변수
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?api_key=dcdf61f3b7d7a5c9d5d4785aaeea0c19&language=ko",
        data: {"key":"value"},
        success: function (json) {
            console.log(json)
            $("#movieList").html(''); //#movieList초기화
            let movie_list=json.results;
            for(let i=0; i<movie_list.length; i++){
                //불러온 영화 리스트 수만큼 카드 아이템 구현을 반복
                let card=`<div class="col mb-4">
                            <div class="card h-100"> 
                                <img src="${'https://image.tmdb.org/t/p/w500/'+movie_list[i].poster_path}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${movie_list[i].title}</h5>
                                     <button type="button" class="btn btn-success" onclick="review(${movie_list[i].id})">후기 쓰기</button>
                                 </div>
                            </div>
                            </div>`
              // "'"가 아니라 "`"
              //img src에서 w500=width: 500px
              //review()의 매개변수=각 영화의 id값
              $("#movieList").append(card);
            };
        }
    });

}); //영화 정보 불러오고, 각 영화 창 구현하기

function review(id){ //각 영화의 id값
    target_movie=id;
    $.ajax({
        type:"GET",
        url:`http://universeapi.net/review/list?movie_id=${id}`,
        data:{}, //url에서 이미 data를 받기로 선언함
        success: function(json){
            console.log(json);
            let reviews = json.data;
            $(".modal-body").html(''); //.modal-body의 화면 전체를 리셋   
            for(let i=0; i<reviews.length; i++){
                $(".modal-body").append(`<p>${reviews[i].review}</p>`)
            }
        }
    })

    $('#reviewModal').modal('show');
};//후기 보기 기능 구현

function addReview(){
    let review=$("#review").val(); //input에 입력된 후기 값 받기
    let review_tag=`<p>${review}</p>` //입력된 후기를 p 태그로 변환
    $.ajax({
        type:"POST",
        url:"http://universeapi.net/review/add",
        data:{
            movie_id:target_movie,
            review:review
        },
        success:function(json){
            console.log(json);
            $(".modal-body").append(review_tag);
            $("#review").val('');
        }
    })

}; //후기 입력 구현
