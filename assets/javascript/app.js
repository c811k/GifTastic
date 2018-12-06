var topics = ["kobe bryant", "magic johnson", "jason kidd", "steve nash", "lebron james", "kyrie irving", "james harden", "russell westbrook", "paul george", "carmelo anthony", "anthony davis", "stephen curry", "kevin durant", "giannis Antetokounmpo", "joel embiid", "john wall", "chris paul", "blake griffin", "jimmy butler", "damian lillard", "kawhi leonard", "kemba walker"];

function display() {
    $("#gifs-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=paxdD7hmScVK29Im2sygMwYl627Dclvd&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;

        for(var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var image = $("<img>")
                .addClass("gif position-static")
                .attr("src", results[i].images.fixed_width_still.url)
                .attr("data-state", "still")
                .attr("data-animate", results[i].images.fixed_width.url)
                .attr("data-still", results[i].images.fixed_width_still.url);
            topicDiv.append(p, image);
            $("#gifs-view").append(topicDiv);
        }

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);
            
            if(state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else if(state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        
        });
    });
}

function renderButtons() {
    $("#topics-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button id='click-me'>");
        btn.addClass("btn btn-info btn-sm");
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

$(document).on("click", ".btn.btn-info", display);
renderButtons();
