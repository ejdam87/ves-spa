// handleSubmit je funkcia, ktorá sa spustí keď sa bude mať odoslať náš formulár
function handleSubmit(e) {
	e.preventDefault(); // zabrániť vstavenému odosielaniu v prehliadači

	// this reprezentuje ten formular, ktory odosielame
	const ves = this.querySelector("textarea").value; // Načítame text z textarea
	const width = document.querySelector("img").offsetWidth;

	const formular = new URLSearchParams(); // Vytvoríme štruktúru, ktorá bude reprezentovať formulár
	formular.append('ves', ves); // Pridáme tam naše hodnoty
	formular.append('width', width);

	const url = this.action; // Nacitame povodnu URL zadanu vo formulari
	const method = this.method; // NAcitame povodnu metodu zadanu vo formulari
	fetch(url, {method: method, body: formular}) // Urobíme HTTP požiadavku na náš server POST /render a formularom v tele požiadavky 
		.then((res) => res.blob()) // Dostali sme binárne dáta (blob)
		.then((image) => {
			document.querySelector("#output").src = URL.createObjectURL(image); // Nastavíme src našeho <img> na načítaný obrázok
		})
	/*setTimeout(function(){
		scroll("output")
	}, 3000);*/
}

function change_offset(shape_index){

	for (let i = 0; i < clicked.length; i++) {
		if (i == shape_index) {
			clicked[i] = 1
		}
		else {
			clicked[i] = 0
		}
	}
}

function fillCircle(e) {

	change_offset(0);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Filled Circle</b>";
	remove_hidden()
	TTL = 2;
}

function circle(e) {

	change_offset(1);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Filled Circle</b>";
	show_hidden()
	TTL = 2;
}

function rectangle(e) {

	change_offset(2);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Rectangle</b>";
	show_hidden()
	TTL = 2;
}

function fill_rectangle(e) {

	change_offset(3);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Filled Rectangle</b>";
	remove_hidden()
	TTL = 2;
} 

function triangle(e) {

	change_offset(4);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Triangle</b>";
	show_hidden()
	TTL = 3;
}

function fill_triangle(e) {

	change_offset(5);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Filled triangle</b>";
	remove_hidden()
	TTL = 3;
}

function line(e) {

	change_offset(6);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Line</b>";

	show_hidden()
	TTL = 2;
}


function calculate_radius(points) {
	A = points[0];
	B = points[1];

	x = Math.abs(A[0] - B[0])
	y = Math.abs(A[1] - B[1])

	r = (x**2 + y**2)**(1/2)

	return Math.round(r)
}

function operate(e) {
	console.log(clicked)
    let x = event.pageX - this.offsetLeft;
    let y = event.pageY - this.offsetTop;
    points.push([x,y]);
    let text = document.querySelector("#ves").value;


	if (clicked[0] == 1) {	//Filled circle

		if (TTL == 2) {
			comm = comm + x + " " + y + " ";

		}

		TTL = TTL - 1;

		if (TTL == 0) {
			
			let r = calculate_radius(points);
			let color = document.querySelector("#colorpicker").value;
			const sprava = "FILL_CIRCLE " + comm + r + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			points = [];
			TTL = 2;
			

		}
	}

	if (clicked[1] == 1) {	// Circle

		if (TTL == 2) {
			comm = comm + x + " " + y + " ";

		}

		TTL = TTL - 1;

		if (TTL == 0) {

			let r = calculate_radius(points);
			let width = document.querySelector("#range").value;
			let color = document.querySelector("#colorpicker").value;	
			const sprava = "CIRCLE " + comm + r + " " + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			points = [];
			TTL = 2;
			
		}
	}

	if (clicked[2] == 1) {	// Rectangle

		comm = comm + x + " " + y + " ";
		TTL = TTL - 1;

		if (TTL == 0) {

			let width = document.querySelector("#range").value;
			let color = document.querySelector("#colorpicker").value;	
			const sprava = "RECT " + comm + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 2;
		}
	}

	if (clicked[3] == 1) {	// Filled Rectangle

		comm = comm + x + " " + y + " ";
		TTL = TTL - 1;

		if (TTL == 0) {

			let color = document.querySelector("#colorpicker").value;
			const sprava = "FILL_RECT " + comm + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 2;
		}
	}

	if (clicked[4] == 1) {	// Triangle


		comm = comm + x + " " + y + " ";
		TTL = TTL - 1;

		if (TTL == 0) {
			
			let width = document.querySelector("#range").value;
			let color = document.querySelector("#colorpicker").value;	
			const sprava = "TRIANGLE " + comm + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 3;
		}
	}

	if (clicked[5] == 1) {	// Filled Triangle

		comm = comm + x + " " + y + " ";
		TTL = TTL - 1;

		if (TTL == 0) {

			let color = document.querySelector("#colorpicker").value;
			const sprava = "FILL_TRIANGLE " + comm + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 3;
		}
	}

	if (clicked[6] == 1) {	// Line


		comm = comm + x + " " + y + " ";
		TTL = TTL - 1;

		if (TTL == 0) {

			let width = document.querySelector("#range").value;
			let color = document.querySelector("#colorpicker").value;			
			const sprava = "LINE " + comm + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 2;
			;
		
		}
	}

}

function scroll(element){
	var ele = document.getElementById(element);   
	window.scrollTo(ele.offsetLeft,ele.offsetTop); 
}

function clear() {
	let color = document.querySelector("#colorpicker").value;
	document.querySelector("#ves").value = "VES v1.0 600 400" + "\n" + "CLEAR " + color;
	document.getElementById("vykresli").click();

}

function grayscale() {
	let text = document.querySelector("#ves").value;
	const sprava = "GRAYSCALE";
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();
}

function negative() {
	let text = document.querySelector("#ves").value;
	const sprava = "NEGATIVE";
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();
}

function undo(){
	let text = document.querySelector("#ves").value
	let commands = text.split("\n")
	let len = commands.length-2
	console.log(len)

	let result = ""
	let i = 0


	while (commands[len+1] == ("")){
		commands.pop()
		len = commands.length-2
	}

	while (i < len){
		console.log(commands)
		result += commands[i] + '\n'
		i++
	}
	result += commands[i]
	console.log(commands)
	document.querySelector("#ves").value =  result
	console.log(result)
	document.getElementById("vykresli").click();
}

	
function remove_hidden(){
	document.getElementById("hidden").style.opacity = "0.6"
}

function show_hidden(){
	document.getElementById("hidden").style.opacity = "1"
}


function download_image(linkElement){
	let source = document.getElementById("output").src;
	linkElement.href = source
}

let clicked = [0, 0, 0, 0, 0, 0, 0];	//offsets
let TTL = null;	//time-to-live
let comm = "";	//single-line
let points = [];	//an array of point-coords
let current_shape = null;



document.querySelector("#VESform").addEventListener("submit", handleSubmit);
document.querySelector("#fill_circle").addEventListener("click", fillCircle);
document.querySelector("#circle").addEventListener("click", circle);
document.querySelector("#rectangle").addEventListener("click", rectangle);
document.querySelector("#fill_rectangle").addEventListener("click", fill_rectangle);
document.querySelector("#triangle").addEventListener("click", triangle);
document.querySelector("#fill_triangle").addEventListener("click", fill_triangle);
document.querySelector("#line").addEventListener("click", line);
document.querySelector("#output").addEventListener("click", operate);
document.querySelector("#clear").addEventListener("click", clear);
document.querySelector("#bw_filter").addEventListener("click", grayscale);
document.querySelector("#neg_filter").addEventListener("click", negative);
document.getElementById("undo").addEventListener("click", undo);

window.onload = document.getElementById("vykresli").click();	// init picture
window.onload = remove_hidden() // hide range on default