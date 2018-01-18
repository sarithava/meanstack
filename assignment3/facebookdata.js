var response;
function ajaxcall(token){
    var retval;
    $.ajax({
            url:'https://graph.facebook.com/me?fields=id,name,birthday,hometown,gender,email,posts.limit(10),location&access_token=' +token, 
            success: function(response){
                    $("#sidebar li").click(function() {
                        $("#sidebar li").removeClass("current"); // Remove any active class
                        $(this).addClass("current"); // Add "current" class to selected page
                        $("div.content div").hide(); // Hide all content
                      // Find the href attribute value to identify the active page+content:
                        var activePage = $(this).find("a").attr("href"); 
                        if(activePage =="#page2"){
                           getProfile(response);           
                        }else if(activePage =="#page3"){
                            getFeed(response);
                        }else{

                            $('#text_value').show();
                            $("#text").show();
                            $("#text").val('');

                        }
                        $(activePage).fadeIn(); // Fade in the active page content
                    }); // end click method
                    $('#text_value').hide();
                    $("#text").hide();

                    alert("facebook data retrieved successfully");
    
            },
            error: function( req, status, err ) {
                            
                    console.log( 'something went wrong', status, err );
            }
        });
    return retval;
}

function getProfile(response){
    $("#id").val(response.id);
    $("#name").val(response.name);
    $("#email").val(response.email);
    $("#hmtown").val(response.hometown.name);
    $("#location").val(response.location.name);
    $("#gender").val(response.gender);
    $("#birthday").val(response.birthday);
}

function getFeed(response){
    var jData = response.posts.data;
    console.log(jData);
    var html = "";
    html += "<div class='container-fluid' id='fbFeed'>" + "<ul>";
    html +=  "<div class='row'>";
    html += '<div class="col-md-4">' + '<img src="https://graph.facebook.com/' + response.id + '/picture" class="avatar" />';
                           
    $.each(jData, function(index, value) {
        if (value.id != undefined) {
            html += '<li>' +'<p class="story">' + value.story + '<br>' +value.created_time+ '</p>'; 
            if (response.posts.data[index].message != undefined) {
                html += '<p class="message">' + value.message + '</p>';
                }  
        }
    });
    html += "</ul>" + "</div>";
    $("#page3").append(html);
}


$(document).ready(function() {  

    $("div.content div").hide(); // Hide all content
    $("nav li:first").addClass("current").show(); // Activate first page
    $("div.content div:first").show(); // Show first page content
    $('#text_value').click(function() {
        var token = $("#text").val();
        if(token=='') {
            alert("Enter Some Text In Input Field");
        }else{
            ajaxcall(token);
        }
    });
    $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });
});
