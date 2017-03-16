$( document ).ready(function() {
	var currentClasses = $('#currentStatus')[0].classList
	var level = 6
	var pairNum = 0
	var username

	console.log(score)

	getLeaderboard()
	initLevel(level, score)

	function scoreTimer(x) {
		var seconds = x;
		var currentClasses = $('#currentStatus')[0].classList
		var targetClasses = $('#targetStatus')[0].classList
		 function tick() {
				 var counter = document.getElementById("countdown");
				 seconds--;
				 counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
				 if ($(targetClasses).not(currentClasses).length === 0 && $(currentClasses).not(targetClasses).length === 0) {
					 score += seconds
					 console.log(score);
					 return;
				 } else if( seconds > 0 ) {
						 setTimeout(tick, 1000);
						 console.log(seconds)
				 } else {
						 gameOver();
				 }
		 }
		 console.log(seconds);
		 tick();
	}

	$("#tutorial").dialog({
		width: 565,
		dialogClass: "no-close",
		autoOpen: true,
		modal: true,
		show: {
			effect: "bounce",
			duration: 1000
		},
		hide: {
			effect: "clip",
			duration: 50
		},
		buttons: [
			{
				text: "Ok, I got it!",
				click: function() {
					$( this ).dialog( "close" );
					username = localStorage.getItem('name')
					console.log(username)
					if (username == null) {
						$("#nameRequest").dialog({
							width: 565,
							dialogClass: "no-close",
							autoOpen: true,
							modal: true,
							show: {
								effect: "bounce",
								duration: 1000
							},
							hide: {
								effect: "clip",
								duration: 50
							},
							buttons: [
								{
									text: "Let's get started!",
									click: function() {
										username = $('#username').val()
										if (username.length < 2) {
											username = "The Enigma"
										}
										localStorage.setItem('name', username)
										$('#showUsername').text(username);
										$( this ).dialog( "close" );
										scoreTimer(60, score)

									}
								}
							]
						})
					} else {
						welcomePlayerBack(username)
						$("#welcomeBack").dialog({
							width: 565,
							dialogClass: "no-close",
							autoOpen: true,
							modal: true,
							show: {
								effect: "bounce",
								duration: 1000
							},
							hide: {
								effect: "clip",
								duration: 50
							},
							buttons: [
								{
									text: "Let's get started!",
									click: function() {
										$('#showUsername').text(username);
										$( this ).dialog( "close" );
										scoreTimer(60, score)

									}
								}
							]
						})
					}
				}
			}
		]
	})

		$("#congrats").dialog({
			width: 565,
			dialogClass: "no-close",
      autoOpen: false,
      show: {
        effect: "bounce",
        duration: 1000
      },
      hide: {
        effect: "clip",
        duration: 50
      },
			buttons: [
				{
					text: "End Game?",
					click: function() {
        		$( this ).dialog( "close" );
      		}
				},
				{
					text: "Next Level?",
					click: function() {
						score += 100
						level += 1
						// console.log(level);
						initLevel(level, score)
						$(this).dialog( "close" )
						scoreTimer(60, score)
					}
				}
			]
    })
});

var genericText = "<section> This is some text.</section>"
var genericTextLast = "<section> This is some text.</section>"
var prependBucket = "<div class=\"bucket htmlBucket\" data-tag=\"opening\"></div>"
var appendBucket = "<div class=\"bucket htmlBucket\" data-tag=\"closing\"></div>"
var score = 0


function initLevel (level, score) {
	console.log(score);
	clearLevel()
	createHTMLBox(levels[level].textLines, levels[level].htmlBuckets)
	createCSSBox(levels[level].cssBlocks, levels[level].cssSelectors, levels[level].cssPairs)
	createCurrentStatus(levels[level].textLines)
	createTargetStatus(levels[level].textLines, levels[level].classesNeeded)
	createButtons (levels[level].buttonsNeeded)
	makeDraggable()
	makeHTMLDroppable()
	makeCSSDroppable()
	makeButtonBoxDroppable()
	updateScore (score)
	pairNum = 0;
}

function welcomePlayerBack(name) {
	var welcomeBackMessage = "<p>Hey " + name + ", welcome back! In your absence, you were missed. Now that you are back everything is alright.</p>"
	$(welcomeBackMessage).appendTo('#welcomeBack')
}

function makeDraggable() {
	$('.drag').draggable({
		 helper: "clone",
		 revert: 'invalid',
		//  snap: true,
		//  snapMode: "inner",
		//  snapTolerance: 20
	});
}

function makeHTMLDroppable() {
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
}

function makeCSSDroppable() {
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
}

function makeButtonBoxDroppable() {
	$('#htmlTags').droppable({
			drop: function (event, ui) {
				$(this).append(ui.draggable)
			}
	})
}

function clearLevel() {
	$('.htmlCodeBox').empty()
	$('.cssCodeBox').empty()
	$('#currentStatus').empty()
	$('#currentStatus')[0].classList = ""
	$('#targetStatus').empty()
	$('#targetStatus')[0].classList = ""
}

function createHTMLBox(x, y) {
	var n = x - 1
	console.log(y)
	for (var i = 0; i < x; i++) {
		if (i == n) {
			$(genericTextLast).addClass("textLine" + i).appendTo('.htmlCodeBox')
		} else {
			$(genericText).addClass("textLine" + i).appendTo('.htmlCodeBox')
		}
		// $(".htmlCodeBox section").addClass("textLine" + i)
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
	// console.log(n)
	for (var i = n; i < x + n; i++) {
		var cssPair = "<div class=\"cssPair\"><div class=\"bucket cssBucket\" data-tag=\"keyword\" data-pair=" + i + "></div><!-- --><div class=\"bucket cssBucket\" data-tag=\"value\" data-pair=" + i + "></div></div>"
		$(cssPair).appendTo('.cssCodeBox')
		pairNum = i + 1
	}
}

function createCurrentStatus(x) {
	for (var i = 0; i < x; i++) {
		$(genericText).addClass("textLine" + i).appendTo('#currentStatus')
	}
}

function createTargetStatus(x, y) {
	for (var i = 0; i < x; i++) {
		$(genericText).addClass("cssTextLine" + i).appendTo('#targetStatus')
		addTargetClasses(y[i], i)
	}
}

function addTargetClasses(x, y) {
	for (var i = 0; i < x.length; i++) {
		$(".cssTextLine" + y).addClass(x[i])
	}
}

function createButtons (x) {
	for (var i = 0; i < x.length; i++) {
		searchButtons(x[i])
	}
}

function searchButtons (name) {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].name == name) {
			var buttonClasses = createClasses(buttons[i].classes)

			var strongButton = "<div class=\"" + buttonClasses + "\"  data-tag=\"" + buttons[i].tag + "\" data-type=\"" + buttons[i].type + "\">" + buttons[i].innerText + "</div>"
			$(strongButton).appendTo('#htmlTags')
		}
	}
}

function createClasses (buttonClasses) {
	var classString = ""
	for (var i = 0; i < buttonClasses.length; i++) {
		if (i == buttonClasses.length - 1) {
			classString += buttonClasses[i]
		} else {
			classString += buttonClasses[i] + " "
		}
	}
	return classString
}

function checkHTMLMatch() {

}

function getLeaderboard() {
	$.get("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/Space").then (function(data) {
		// console.log(data)
		var leaderboard = "<p>" + data[0].player_name + ": " + data[0].score + "</p> <p>" + data[1].player_name + ": " + data[1].score + "</p> <p>" + data[2].player_name + ": " + data[2].score + "</p>"
		$(leaderboard).appendTo(".leaderboard")

		// div class=\"" + buttonClasses + "\"  data-tag=\"" + buttons[i].tag + "\" data-type=\"" + buttons[i].type + "\">" + buttons[i].innerText + "</div>"
	})
}

// function scoreTimer(x, score) {
// 	var seconds = x;
// 	var currentClasses = $('#currentStatus')[0].classList
// 	var targetClasses = $('#targetStatus')[0].classList
// 	 function tick() {
// 			 var counter = document.getElementById("countdown");
// 			 seconds--;
// 			 counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
// 			 if ($(targetClasses).not(currentClasses).length === 0 && $(currentClasses).not(targetClasses).length === 0) {
// 				 score += seconds
// 				 return;
// 			 } else if( seconds > 0 ) {
// 					 setTimeout(tick, 1000);
// 			 } else {
// 					 gameOver();
// 			 }
// 	 }
// 	 tick();
// }

function updateScore (score) {
		$('#scoreBox').text("Score: " + score);
}

function gameOver() {
	$("#gameOver").dialog({
		width: 755,
		dialogClass: "no-close",
		autoOpen: false,
		modal: true,
		show: {
			effect: "bounce",
			duration: 1000
		},
		hide: {
			effect: "clip",
			duration: 50
		},
		buttons: [
			{
				text: "End Game?",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Restart?",
				click: function() {
					location.reload(false);
				}
			}
		]
	})
	$( "#gameOver" ).dialog( "open" )
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
