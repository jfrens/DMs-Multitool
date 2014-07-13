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

/*		<script>
		function on_load(iframe){
			console.log("something god");
			try {
				// Displays the first 50 chars in the innerHTML of the
				// body of the page that the iframe is showing.
				// EDIT 2012-04-17: for wider support, fallback to contentWindow.document
				var doc = iframe.contentDocument || iframe.contentWindow.document;
				doc.getElementById("sites-chrome-sidebar-left").hide();
				//alert(doc.body.innerHTML.substring(0, 50));
			} catch (e) {
				// This can happen if the src of the iframe is
				// on another domain
				alert('exception: ' + e);
			}
		}
		</script>*/
