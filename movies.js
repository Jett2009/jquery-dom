let currentId = 0;

let moviesList = [];

$(function () {
	$("#movieform").on("submit", function (evt) {
		evt.preventDefault();
		let title = $("#title").val();
		let rating = $("#rating").val();

		let movieData = { title, rating, currentId };
		const HTMLtoAppend = createMovieDataHTML(movieData);

		currentId++;
		moviesList.push(movieData);

		$("#movie-table").append(HTMLtoAppend);
		$("#movieform").trigger("reset");
	});

	$("tbody").on("click", ".btn.btn-danger", function (evt) {
		let indexToRemoveAt = moviesList.findIndex(
			(movie) => movie.currentId === +$(evt.target).data("deleteId")
		);
		moviesList.splice(indexToRemoveAt, 1);
		$(evt.target).closest("tr").remove();
	});
	//used solution on lines 29-49
	// when an arrow is clicked,
	$(".fas").on("click", function (evt) {
		// figure out what direction we are sorting and the key to sort by
		let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
		let keyToSortBy = $(evt.target).attr("id");
		let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

		// empty the table
		$("#movie-table").empty();

		// loop over our object of sortedMovies and append a new row
		for (let movie of sortedMovies) {
			const HTMLtoAppend = createMovieDataHTML(movie);
			$("#movie-table").append(HTMLtoAppend);
		}

		// toggle the arrow
		$(evt.target).toggleClass("fa-sort-down");
		$(evt.target).toggleClass("fa-sort-up");
	});
});

function createMovieDataHTML(data) {
	return `
<tr>
  <td>${data.title}</td>
  <td>${data.rating}</td>
  <td>
	<button class="btn btn-danger" data-delete-id=${data.currentId}>
	  Delete
	</button>
  </td>
<tr>
`;
}
function sortBy(array, keyToSortBy, direction) {
	return array.sort(function (a, b) {
		if (keyToSortBy === "rating") {
			a[keyToSortBy] = +a[keyToSortBy];
			b[keyToSortBy] = +b[keyToSortBy];
		}
		if (a[keyToSortBy] > b[keyToSortBy]) {
			return direction === "up" ? 1 : -1;
		} else if (b[keyToSortBy] > a[keyToSortBy]) {
			return direction === "up" ? -1 : 1;
		}
		return 0;
	});
}
