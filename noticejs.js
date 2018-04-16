/**
 * noticejs
 *
 * a series of functions that remind the user to check the URL
 * this is important especially before entering sensitive information
 * (i.e. usernames / passwords / springtime longings)
 *
 * mit license
 *
 * me@paaronmitchell.com
 *
 */
 

/** ALL THE FUNCTIONS ARE CHAINED TOGETHER */
/** -------------------------------------- */



/** if the user has visited before, prepare the highlight that they know; otherwise, a new highlight */
/** ---------------------------------------------------------------------------------------------------*/

function remindWithNotice(notice) {
	var noticePossibilities = ["red-Walk", "red-Moonwalk", "blue-Walk", "blue-Moonwalk",
					"green-Walk", "green-Moonwalk", "yellow-Walk", "yellow-Moonwalk"];
	var length = noticePossibilities.length;
	var reminderCookie = readNoticeCookie("reminderNotice");
	for(var i = 0; i < length; i++) {
		if(noticePossibilities[i] == reminderCookie) { 
			i = length+10;
		}
	}
	if (i <= length+10) {
		reminderCookie = noticePossibilities[Math.floor(Math.random() * noticePossibilities.length)];
	}
	setNoticeCookie("reminderNotice",reminderCookie)
	showNotice(notice, reminderCookie);
}



/** split up the div (if necessary) that the user should notice ("notice"); */
/** run the highlight through */
/** ----------------------------------------------------------------------- */

function showNotice(notice, reminderCookie) {
	var colorAndWalk = reminderCookie.split('-');
	var reNotice = document.getElementById("noticeHighlight0");
	if (reNotice != null) {
		var length = reNotice.parentElement.childElementCount;
	} else {
		var textDiv = document.getElementById(notice);
		var site = textDiv.getElementsByTagName("strong")[0].innerHTML;
		var text = textDiv.innerHTML;
		text = text.replace("<strong>", "");
		text = text.replace("</strong>", "");
		var siteBeginsAt = text.indexOf(site);
		var siteEndsAt = siteBeginsAt + site.length;
		var string = text.split("");
		var i = 0, length = string.length;
		textDiv.innerHTML = "";
		for (i; i < length; i++) {
		    textDiv.innerHTML += "<span id='noticeHighlight"+i+"'>" + string[i] + "</span>";
		}
		var i = siteBeginsAt;
		for (i; i < siteEndsAt; i++) {
			document.getElementById("noticeHighlight"+i).style.fontWeight = 900;
		}
		var length = string.length;
	}
	var i = 0;
	if (colorAndWalk[1] == "Walk") {
		noticeWalk(i, length, "noticeHighlight"+(i), colorAndWalk[0]);
	} else {
		noticeMoonwalk(i, length, "noticeHighlight"+(length-i-1), colorAndWalk[0]);
	}
}

/** ----------------------------------------------------------------------- */







/** ================================================================ */
/** the next two functions work together; the first calls the second */



/** runs highlight left to right with the color specified */
/** ----------------------------------------------------- */

function noticeWalk(i, length, elementId, color) {
	element = document.getElementById(elementId);
	var originalColor = element.style.color;
	var transparency = 0;
	var timer = setInterval(function () {
		if (color == "yellow") {
			var rgbaVal = "253,233,43,";
			element.style.color = "red";
		}
		if (color == "blue") {
			var rgbaVal = "29,79,156,";
			element.style.color = "white";
		}
		if (color == "red") {
			var rgbaVal = "238,62,52,";
			element.style.color = "white";
		}
		if (color == "green") {
			var rgbaVal = "84,185,72,";
			element.style.color = "black";
		}
		if(transparency <= 1){
			element.style.backgroundColor = 'rgba('+rgbaVal+''+ (transparency += 0.5) + ')';
	        } else {
	        	clearInterval(timer);
			if (i < length-1) {
				i++;
				noticeWalk(i, length, "noticeHighlight"+(i), color);
			} else if (i == length-1) {
				i = 0;
				undoNoticeWalk(i, length, "noticeHighlight"+(i), originalColor);
			}
        	}
	}, 5);
}



/** undoes highlight from left to right */
/** ----------------------------------- */

function undoNoticeWalk(i, length, elementId, fontColor) {
	element = document.getElementById(elementId);
	element.style.color = fontColor;
	var transparency = 1;
	var timer = setInterval(function () {
		if(transparency >= 0){
		        element.style.backgroundColor = 'rgba(255,255,0,' + (transparency -= 0.5) + ')';
		} else {
			clearInterval(timer);
			if (i < length-1) {
				i++;
				undoNoticeWalk(i, length, "noticeHighlight"+(i), fontColor);
			}
		}
	}, 5);
}

/** =============================================================== */







/** ================================================================ */
/** the next two functions work together; the first calls the second */



/** runs highlight right to left with the color specified */
/** ----------------------------------------------------- */

function noticeMoonwalk(i, length, elementId, color) {
	element = document.getElementById(elementId);
	var originalColor = element.style.color;
	var transparency = 0;
	var timer = setInterval(function () {
		if (color == "yellow") {
			var rgbaVal = "253,233,43,";
			element.style.color = "red";
		}
		if (color == "blue") {
			var rgbaVal = "29,79,156,";
			element.style.color = "white";
		}
		if (color == "red") {
			var rgbaVal = "238,62,52,";
			element.style.color = "white";
		}
		if (color == "green") {
			var rgbaVal = "84,185,72,";
			element.style.color = "black";
		}
		if(transparency <= 1){
			element.style.backgroundColor = 'rgba('+rgbaVal+''+ (transparency += 0.5) + ')';
	        	} else {
				clearInterval(timer);
				if (i < length-1) {
					i++;
					noticeMoonwalk(i, length, "noticeHighlight"+(length-i-1), color);
				} else if (i == length-1) {
					i = 0;
					undoNoticeMoonwalk(i, length, "noticeHighlight"+(length-i-1), originalColor);
				}
	        }
	}, 5);
}



/** undoes highlight from right to left */
/** ----------------------------------- */

function undoNoticeMoonwalk(i, length, elementId, fontColor) {
	element = document.getElementById(elementId);
	element.style.color = fontColor;
	var transparency = 1;
	var timer = setInterval(function () {
		if(transparency >= 0){
			element.style.backgroundColor = 'rgba(255,255,0,' + (transparency -= 0.5) + ')';
		} else {
			clearInterval(timer);
			if (i < length-1) {
				i++;
				undoNoticeMoonwalk(i, length, "noticeHighlight"+(length-i-1), fontColor);
			}
	        }
	}, 5);
}

/** =============================================================== */







/** =========================================== */
/** the next two functions set and read cookies */



function readNoticeCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function setNoticeCookie(cookieName,cookieValue) {
	var today = new Date();
	var expire = new Date();
	expire.setTime(today.getTime() + 3600*1000*24*30);
	document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
}

/** =========================================== */



/**
 * end of dimepagesjs
 */
