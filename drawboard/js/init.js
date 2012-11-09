$(document).ready(function() {
	var drawboard = $("#drawBoard").sdrawboard({
		lineWidth: 5,
		tools:$("#tools"),
		toData: function (data) { console.log("getData" + data) }
	});
});
