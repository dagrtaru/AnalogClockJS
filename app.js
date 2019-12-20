var circle = document.getElementById("circle");
const sec = 90;													//length of sec hand
const min =	85;													//length of min hand
const hr = 60;													//length of hr hand
const twopi = 2 * Math.PI;
let hh = 0;
let mm = 0;
let ss = 0;

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

//At an interval of 1000ms = 1s, new time is generated and to be displayed
async function time(){
	let logger = document.getElementById("log");
	while(true){
		let cur = new Date();							//instantiate a date object

		hh = cur.getHours();							//current hour
		mm = cur.getMinutes();							//current min
		ss = cur.getSeconds();							//current sec
		logger.innerHTML = hh+":"+mm+":"+ss;
		await sleep(1000);								//sleeping for 1s
		logger.innerHTML = "";
	}
}

time();

//The clock is drawn here alongwith the circle, second's hand, minutes hand, hour's hand
async function drawClock(){
	while(true){
		//draw the circle of the clock
		var circle = document.getElementById("circle");
		var ctx = circle.getContext("2d");
		ctx.beginPath();
		ctx.arc(300, 150, 100, 0, 2*Math.PI);
		ctx.stroke();
		

		//calculating the angle of the three hands starting from 00:00:00
		var ang1 = (twopi / 60) * ss;							//angle of sec hand
		var ang2 = (twopi / 60) * (mm + ss/60);					//angle of min hand
		var ang3 = (twopi / 12) * (hh + mm/60);					//angle of hour hand
		
		//calculating the end points of the hands from their respective angles
		var end1 = {
			x : 300 + sec * Math.sin(ang1),
			y : 150 - sec * Math.cos(ang1)
		};
		
		var end2 = {
			x : 300 + min * Math.sin(ang2),
			y : 150 - min * Math.cos(ang2)
		};
		
		var end3 = {
			x : 300 + hr * Math.sin(ang3),
			y : 150 - hr * Math.cos(ang3)
		};
		
		//labelling the clock
		ctx.font = "12px Arial";
		ctx.strokeText("0", 295, 65);
		for(var i = 1; i < 12; i++){
			var ang = (twopi / 12) * i;
			ctx.strokeText(i, 295 + 90 * Math.sin(ang), 155 - 90 * Math.cos(ang));
		}
		
		//This is where drawing happens. First we draw the three hands: second's, minute's, hour's. 
		//At interval of 1 second we are refreshing the context. Only hands need to be refreshed.
		//This is achieved through the async/await construct.
		var context = circle.getContext("2d");
		context.strokeStyle = "red";
		context.beginPath();
		context.moveTo(300, 150);
		context.lineTo(end1.x, end1.y);
		context.stroke();
		context.strokeStyle = "black";
		context.beginPath();
		context.moveTo(300, 150);
		context.lineTo(end2.x, end2.y);
		context.stroke();
		context.beginPath();
		context.moveTo(300, 150);
		context.lineTo(end3.x, end3.y);
		context.stroke();
		await sleep(1000);
		context.clearRect(0, 0, 600, 600);
	}
}

drawClock();