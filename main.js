$( document ).ready(function() {
	var currentClasses = $('#currentStatus')[0].classList
	var level = 0
	var pairNum = 0

	initLevel(level)


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
				//set variables for checking the two windows to see if they are the same
				var currentClasses = $('#currentStatus')[0].classList
				var targetClasses = $('#targetStatus')[0].classList
				//get current pair number
				var currentPair = $(this).attr('data-pair')
				//get the buckets that match the current pair and separate them
				var pairBuckets = $('[data-pair="' + currentPair + '"]')
				var firstOfBuckets = pairBuckets[0]
				var secondOfBuckets = pairBuckets[1]
				//get the buttons inside of those buckets and separate them
				var pairButtons = $('[data-pair="' + currentPair + '"]').find("div")
				var firstOfButtons = pairButtons[0]
				var secondOfButtons = pairButtons[1]
				//check if both buckets have buttons
				if (pairButtons[0] != undefined && pairButtons[1] != undefined) {
					//check if the opening tag is first and closing tag is second
					if ($(firstOfBuckets).data("tag") == $(firstOfButtons).data("tag") && $(secondOfBuckets).data("tag") == $(secondOfButtons).data("tag")) {
						//check if the data-types match of the two buttons
						if ($(firstOfButtons).data("type") == $(secondOfButtons).data("type")) {
							//create new class to add to current status window
	    				var newStatus = $(secondOfButtons).data("type") + 'Text'
							//add the created class
							$('#currentStatus').addClass(newStatus)
						}
					}
				}
				//check to see if the two windows are the same and show win condition window
				if ($(targetClasses).not(currentClasses).length === 0 && $(currentClasses).not(targetClasses).length === 0) {
					$( "#congrats" ).dialog( "open" )
				}
			}
		})

		$(".cssBucket").droppable({
			accept: ".css",
			drop: function (event, ui) {
				$(this).append(ui.draggable)

				//set variables for checking the two windows to see if they are the same
				var currentClasses = $('#currentStatus')[0].classList
				var targetClasses = $('#targetStatus')[0].classList
				//get current pair number
				var currentPair = $(this).attr('data-pair')
				//get the buckets that match the current pair and separate them
				var pairBuckets = $('[data-pair="' + currentPair + '"]')
				var firstOfBuckets = pairBuckets[0]
				var secondOfBuckets = pairBuckets[1]
				//get the buttons inside of those buckets and separate them
				var pairButtons = $('[data-pair="' + currentPair + '"]').find("div")
				var firstOfButtons = pairButtons[0]
				var secondOfButtons = pairButtons[1]
				//check if both buckets have buttons
				if (pairButtons[0] != undefined && pairButtons[1] != undefined) {
					//check if the opening tag is first and closing tag is second
					if ($(firstOfBuckets).data("tag") == $(firstOfButtons).data("tag") && $(secondOfBuckets).data("tag") == $(secondOfButtons).data("tag")) {
						//check if the data-types match of the two buttons
						if ($(firstOfButtons).data("type") == $(secondOfButtons).data("type")) {
							//create new class to add to current status window
							var newStatus = $(secondOfButtons).data("type") + 'Text'
							//add the created class
							$('#currentStatus').addClass(newStatus)
						}
					}
				}
				//check to see if the two windows are the same and show win condition window
				if ($(targetClasses).not(currentClasses).length === 0 && $(currentClasses).not(targetClasses).length === 0) {
					$( "#congrats" ).dialog( "open" )
				}
			}
		})

		$('#htmlTags').droppable({
				drop: function (event, ui) {
					$(this).append(ui.draggable)
				}
		})

		$("#congrats").dialog({
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
var prependBucket = "<div class=\"bucket htmlBucket\" data-tag=\"opening\"></div>"
var appendBucket = "<div class=\"bucket htmlBucket\" data-tag=\"closing\"></div>"

function initLevel (level) {
	createHTMLBox(levels[level].textLines, levels[level].htmlBuckets)
	createCSSBox(levels[level].cssBlocks, levels[level].cssSelectors, levels[level].cssPairs)
	createCurrentStatus(levels[level].textLines)
	createTargetStatus(levels[level].textLines, levels[level].classesNeeded)
	pairNum = 0;
}
function createHTMLBox(x, y) {
	for (var i = 0; i < x; i++) {
		$(genericText).appendTo('.htmlCodeBox')
		$(".htmlCodeBox section").addClass("textLine" + i)
		createHTMLBuckets(y[i], i)
	}

}

function createHTMLBuckets (x, y) {
	createPrependBoxes (x, y)
	createAppendBoxes (x, y)
}

function createPrependBoxes (x, y) {
	for (var i = 0; i < x; i++) {
		$(prependBucket).prependTo('.textLine' + y).attr("data-pair", i)
		pairNum = i + 1
	}
}

function createAppendBoxes (x, y) {
	for (var i = 0; i < x; i++) {
		// console.log(appendBucket)
		$(appendBucket).appendTo('.textLine' + y).attr("data-pair", i)
	}
}

function createCSSBox(x, y, z) {
	// console.log(y)
	// console.log(z)
	for (var i = 0; i < x; i++) {
		var openingBraces = "<p>" + y[i] + " {</p>"
		$(openingBraces).appendTo('.cssCodeBox')
		// console.log(z[i])
		var num = z[i]
		// console.log(num)
		createCSSPairs(num)
		var closingBraces = "<p>}</p>"
		$(closingBraces).appendTo('.cssCodeBox')
	}
}

function createCSSPairs(x) {
	var n = pairNum
	console.log(n)
	for (var i = n; i < x + n; i++) {
		var cssPair = "<div class=\"cssPair\"><div class=\"bucket cssBucket\" data-tag=\"keyword\" data-pair=" + i + "></div><!-- --><div class=\"bucket cssBucket\" data-tag=\"value\" data-pair=" + i + "></div></div>"
		$(cssPair).appendTo('.cssCodeBox')
		pairNum = i + 1
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

function checkHTMLMatch() {

}
//
// var firstBucketClassList =
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
