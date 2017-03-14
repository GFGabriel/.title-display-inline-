$( document ).ready(function() {
	var currentClasses = $('#currentStatus')[0].classList
	var level = 0

	var selectorArray = levels[level].cssSelectors
	var cssPairArray = levels[level].cssPairs
	var classArray = levels[level].classesNeeded
	createHTMLBox(levels[level].textLines, levels[level].htmlBuckets)
	createCSSBox(levels[level].cssBlocks, selectorArray, cssPairArray)
	createCurrentStatus(1)
	createTargetStatus(1, classArray)


    $('.drag').draggable({
			helper: "clone",
			revert: 'invalid',
			snap: true,
			snapMode: "inner",
			snapTolerance: 30
		});

		$('.htmlBucket').droppable({
			accept: ".html",
			drop: function (event, ui) {
				$(this).append(ui.draggable)
				var currentClasses = $('#currentStatus')[0].classList
				var targetClasses = $('#targetStatus')[0].classList
				if ($(this).hasClass("append")) {
					$('#currentStatus').addClass('boldText')
				}
				if ($(targetClasses).not(currentClasses).length === 0 && $(currentClasses).not(targetClasses).length === 0) {
					$( "#congrats" ).dialog( "open" );;
				}
			}
		})

		$(".cssBucket").droppable({
			accept: ".css",
			drop: function (event, ui) {
				$(this).append(ui.draggable)
				var currentClasses = $('#currentStatus')[0].classList
				var targetClasses = $('#targetStatus')[0].classList
				if ($(this).hasClass("value")) {
					$("#currentStatus").addClass("purpleText")
				}
				if ($(targetClasses).not(currentClasses).length === 0 && $(currentClasses).not(targetClasses).length === 0) {
					$( "#congrats" ).dialog( "open" );;
				}
			}
		})

		$('#htmlTags').droppable({
				drop: function (event, ui) {
					$(this).append(ui.draggable)
				}
		})

		$( "#congrats" ).dialog({
			width: 565,
      autoOpen: false,
      show: {
        effect: "bounce",
        duration: 1000
      },
      hide: {
        effect: "clip",
        duration: 50
      }
    });


});

var genericText = "<section> This is some text.</section>"
var prependBucket = "<div class=\"bucket htmlBucket prepend\"></div>"
var appendBucket = "<div class=\"bucket htmlBucket append\"></div>"

function createHTMLBox(x, y) {
	for (var i = 0; i < x; i++) {
		$(genericText).appendTo('.htmlCodeBox')
		$(".htmlCodeBox section").addClass("textLine" + i)
		createHTMLBuckets(y[i], i, i)
	}

}

function createHTMLBuckets (x, y) {
	createPrependBoxes (x, y)
	createAppendBoxes (x, y)
}

function createPrependBoxes (x, y) {
	for (var i = 0; i < x; i++) {
		$(prependBucket).prependTo('.textLine' + y)
	}
}

function createAppendBoxes (x, y) {
	for (var i = 0; i < x; i++) {
		console.log(appendBucket)
		$(appendBucket).appendTo('.textLine' + y)
	}
}

function createCSSBox(x, y, z) {
	console.log(y)
	console.log(z)
	for (var i = 0; i < x; i++) {
		var openingBraces = "<p>" + y[i] + " {</p>"
		$(openingBraces).appendTo('.cssCodeBox')
		console.log(z[i])
		var num = z[i]
		console.log(num)
		createCSSPairs(num)
		var closingBraces = "<p>}</p>"
		$(closingBraces).appendTo('.cssCodeBox')
	}
}

function createCSSPairs(x) {
	var cssPair = "<div class=\"cssPair\"><div class=\"bucket cssBucket keyword\"></div><!-- --><div class=\"bucket cssBucket value\"></div></div>"
	for (var i = 0; i < x; i++) {
		$(cssPair).appendTo('.cssCodeBox')
		console.log("Added CSS Pair")
	}
}

function createCurrentStatus(x) {
	for (var i = 0; i < x; i++) {
		$(genericText).appendTo('#currentStatus')
	}
}

function createTargetStatus(x, y) {
	for (var i = 0; i < x; i++) {
		$(genericText).appendTo('#targetStatus')
	}
	addTargetClasses(y)
}

function addTargetClasses(x) {
	for (var i = 0; i < x.length; i++) {
		$("#targetStatus").addClass(x[i])
	}
}
// tags = {
// 		'<a>' : { src: tagA, html: '<a href="index.html" target="_blank">' },
// 		'</a>' : { src: tagAClose, html: '</a>' },
// 		'<br/>' : { src: tagBr, html: '<br/>' },
// 		'<em>' : { src: tagEm, html: '<em>' },
// 		'</em>' : { src: tagEmClose, html: '</em>' },
// 		'<h1>' : { src: tagH1, html: '<h1>' },
// 		'</h1>' : { src: tagH1Close, html: '</h1>' },
// 		'<h2>' : { src: tagH2, html: '<h2>' },
// 		'</h2>' : { src: tagH2Close, html: '</h2>' },
// 		'<hr/>' : { src: tagHr, html: '<hr/>' },
// 		'<img/>' : { src: tagImg, html: '<img src="'+tagImgSrc.src+'" />' },
// 		'<li>' : { src: tagLi, html: '<li>' },
// 		'</li>' : { src: tagLiClose, html: '</li>' },
// 		'<ol>' : { src: tagOl, html: '<ol>' },
// 		'</ol>' : { src: tagOlClose, html: '</ol>' },
// 		'<p>' : { src: tagP, html: '<p>' },
// 		'</p>' : { src: tagPClose, html: '</p>' },
// 		'<strong>' : { src: tagStrong, html: '<strong>' },
// 		'</strong>' : { src: tagStrongClose, html: '</strong>' },
// 		'<ul>' : { src: tagUl, html: '<ul>' },
// 		'</ul>' : { src: tagUlClose, html: '</ul>' },
//     //will use ajax call on Senate.gov API to get the below. This is just a placeholder
// 		'text' : { src: tagText, html: 'Random Senators Name' },
// 	};
//
// dragula([document.getElementById(htmlTags), document.getElementsByClassName(htmlBucket)]);
