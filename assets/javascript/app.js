var danceMoves = ["the twist", "the worm", "the robot", "hammertime", "moonwalk", "running man", "macarena"];

var queryURL =  "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=";

function loadGifs() {

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=20";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response){

    	for (var i = 0; i < response.data.length; i++) {

    		if (response.data[i].rating !== "pg-13" && "r") {

	    		var danceMoveDiv = $("<div>");
	    		var p = $("<p>");
	    		p.append((response.data[i].rating).toUpperCase());
	    		danceMoveImage = $("<img>");
	    		danceMoveImage.addClass("gif").attr("src", response.data[i].images.fixed_height_small.url).attr("alt", response.data[i].title).attr("data-state", "animate").attr("data-animate", response.data[i].images.fixed_height_small.url).attr("data-still", response.data[i].images.fixed_height_small_still.url);
	    		danceMoveDiv.append(p, danceMoveImage);
	    		$("#gifs").append(danceMoveDiv);

    		}

    	}

    });

};

function renderButtons() {

	$("#buttons").empty();	

	for (var i = (danceMoves.length - 1); i > -1; i--) {
		var danceMoveBtn = $("<button>");
		danceMoveBtn.attr("data-name", danceMoves[i]).addClass("danceMoveBtn").text(danceMoves[i]);
		$("#buttons").append(danceMoveBtn);
	};

};


$(document).ready(function() {

	$(document).on("click", ".danceMoveBtn", function() {

		searchTerm = $(this).attr("data-name");
		$("#gifs").empty();
		loadGifs();

	});

	$("#addBtn").on("click", function(event) {

		if ($("#searchInput").val().trim() !== "" && danceMoves.indexOf(($("#searchInput").val()).toLowerCase()) === -1 && $("#suggestedMoves option:selected").val(1)) {

			event.preventDefault();
			danceMoves.push(($("#searchInput").val()).toLowerCase());
			renderButtons();

		}

		else if ($("#suggestedMoves option:selected").val() !== "1" && danceMoves.indexOf(($("#suggestedMoves option:selected").val()).toLowerCase()) === -1) {
			event.preventDefault();
			danceMoves.push(($("#suggestedMoves option:selected").text()).toLowerCase());
			renderButtons();
		}

	});

	$(document).on("click", ".gif", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
        	console.log(state);
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    });


	renderButtons();

});


// 