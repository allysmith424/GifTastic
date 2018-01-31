var danceMoves = ["Techtonik", "Hammertime", "Moonwalk", "Running Man", "Macarena"];

var queryURL =  "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=";

function loadGifs() {

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response){

    	console.log(response);

    	for (var i = 0; i < response.data.length; i++) {

    		if (response.data[i].rating === "g" || "pg") {

	    		var danceMoveDiv = $("<div>");
	    		var p = $("<p>");
	    		p.append(response.data[i].rating);
	    		danceMoveImage = $("<img>");
	    		danceMoveImage.attr("src", response.data[i].images.fixed_height.url).attr("alt", response.data[i].title);
	    		danceMoveDiv.append(p, danceMoveImage).addClass("danceMoveBtn");
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

		console.log("dance move button");

		searchTerm = $(this).attr("data-name");
		$("#gifs").empty();
		loadGifs();

	});

	$("#searchBtn").on("click", function(event) {

		if ($("#searchInput").val() !== "" && danceMoves.indexOf($("#searchInput").val()) === -1) {

			console.log("search button");

			event.preventDefault();
			danceMoves.push($("#searchInput").val());
			renderButtons();

		}

	});

	renderButtons();

});
	

// 