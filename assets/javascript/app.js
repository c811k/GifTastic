var topics = ["kobe bryant", "magic johnson", "jason kidd", "steve nash", "lebron james", "kyrie irving", "james harden", "russell westbrook", "paul george", "carmelo anthony", "anthony davis", "stephen curry", "kevin durant"];



function display() {
    $("#gifs-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=paxdD7hmScVK29Im2sygMwYl627Dclvd&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for(var i = 0; i < 10; i++) {
            var image = $("<img>").attr("src", response.data[i].images.fixed_height.url);
            $("#gifs-view").append(image);
            var rating = $("<p>").text("Rating: " + response.data[i].rating);
            $("#gifs-view").append(rating);
        }
    });
}

function renderButtons() {
    $("#topics-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("btn btn-info");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#topics-view").append(btn);
    }
}

$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var input = $("#topic-input").val();
    topics.push(input);
    renderButtons();
});

$(document).on("click", ".btn", display);
renderButtons();
