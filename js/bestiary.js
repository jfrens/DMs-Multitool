$( document ).on( "pageinit", function() {
	
});

$("a").on("click", function () {
	$('body').css('overflow','hidden');
	$.ajax({
		url: "http://" + window.location.host + $(this).attr("src"),
		dataType: "html",
		crossDomain: "true",
		success: function (data) {
			var dom = $(data);
			$("iframe", dom).remove();
			$(".sites-embed-type-adsense", dom).remove();
			var goodstuff = $("#sites-canvas-wrapper", dom).html();
			$("#popupFrame").attr("srcdoc", goodstuff);
			$("#popupFrame").attr("width", $(window).width() - 100);
			$("#popupFrame").attr("height", $(window).height() - 100);
			$("#popupWindow").popup("open");
		}
	});
});

$("#popupClose").on("click", function () {
	$("#popupWindow").popup("close");
	$('body').css('overflow','auto');
});