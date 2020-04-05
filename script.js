const cnv = document.querySelector("#canv");
const ctx = cnv.getContext("2d");




ctx.strokeStyle = "black";
ctx.beginPath();
ctx.arc(100,100,90,0,Math.PI*2,true);
ctx.moveTo(160,100);
ctx.arc(100,100,60,0,Math.PI,false);
ctx.moveTo(140, 80);
ctx.arc(130,80,10,0,Math.PI*2,true);
ctx.moveTo(80,80);
ctx.arc(70,80,10,0,Math.PI*2,true);
ctx.stroke();


ctx.fillStyle = "red";
ctx.strokeStyle = "red";
ctx.beginPath();
ctx.moveTo(75,440);
ctx.bezierCurveTo(75,437,70,425,50,425);
ctx.bezierCurveTo(20,425,20,462.5,20,462.5);
ctx.bezierCurveTo(20,480,40,502,75,520);
ctx.bezierCurveTo(110,502,130,480,130,462.5);
ctx.bezierCurveTo(130,462.5,130,425,100,425);
ctx.bezierCurveTo(85,425,75,437,75,440);
ctx.fill();




ctx.strokeStyle = "black";
ctx.beginPath();
ctx.moveTo(75,650);
ctx.lineTo(100,675);
ctx.lineTo(100,625);
ctx.lineTo(75,650);
ctx.stroke();


// ctx.strokeStyle = "#000";
// ctx.beginPath();
// ctx.arc(100,100,90,0,Math.PI,true);
// ctx.quadraticCurveTo(100,130,130,115);
// ctx.moveTo(200,200);

// ctx.lineTo(150,150);

// ctx.closePath();
// ctx.stroke();


function draw(){
	for(i = 0; i < 4; i++){
		for(j = 0; j < 3; j++){
			let y = i * 120 + 1500;
			let x = j * 200 + 50;
			let startAngle = 0;
			let endAngle = Math.PI + j * Math.PI / 2;
			let radius = 50;
			let watch;
			i % 2 == 0 ? watch = false : watch =  true;

			ctx.beginPath();
			ctx.arc(x,y,radius,startAngle,endAngle,watch);
			if(i < 2){
				ctx.stroke();
			}  else {
				ctx.fill();
			}
		}
	}
}
draw();