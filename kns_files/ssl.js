if (location.protocol != "https:") {
	var reportError = function() {
		$.get("ssl_check", {fail: true});
	};
	
	$.get("https://catwar.su/ssl_check", function(answer) {
		if (answer == "success") {
			location.href = location.href.replace("http:", "https:");
		} else {
			reportError();
		}
	}).fail(reportError);
}