# noticejs
noticejs runs a highlighter through a div to remind a user to check the URL before entering secure information

----- HOW TO, steps 1-3:

--- (1)

Somewhere on the page should be the div for the user to notice. It should read almost exactly as:

&lt;div id="notice"&gt;STOP! Make sure the url at the top of this page begins with exactly &lt;strong&gt;https&#58;<i></i>//yourwebsite.com&lt;strong&gt;. Then proceed.&lt;/div&gt;

If there are other elements inside the notice div, then noticejs will fail. So use the above.

--- (2) 

Copy the noticejs.js file to your directory and include it in your page. &lt;script src="noticejs.js"&gt;&lt;/script&gt;

--- (3)

Somewhere on your page call the function remindWithNotice("notice");

// e.g. when the page loads...

document.addEventListener("DOMContentLoaded", function(event) { 
	remindWithNotice("notice");
});

----- END HOW TO
