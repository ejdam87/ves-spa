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
	current_shape = "Filled Circle";
	TTL = 2;
}

function circle(e) {

	change_offset(1);
	current_shape = "Circle";
	TTL = 2;
}

function rectangle(e) {

	change_offset(2);
	TTL = 2;
}

function fill_rectangle(e) {

	change_offset(3);
	current_shape = "Filled rectangle";
	TTL = 2;
} 

function triangle(e) {

	change_offset(4);
	current_shape = "Triangle";
	TTL = 3;
}

function fill_triangle(e) {

	change_offset(5);
	current_shape = "Filled triangle";
	TTL = 3;
}

function line(e) {

	change_offset(6);
	current_shape = "Line";
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
			let color = prompt("zadaj farbu v hexa zapise");
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
			let width = prompt("zadaj hrubku ciary");
			let color = prompt("zadaj farbu v hexa zapise");
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

			let width = prompt("zadaj hrubku ciary");
			let color = prompt("zadaj farbu v hexa zapise");
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

			let color = prompt("zadaj farbu v hexa zapise");
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
			
			let width = prompt("zadaj hrubku ciary");
			let color = prompt("zadaj farbu v hexa zapise");
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

			let color = prompt("zadaj farbu v hexa zapise");
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

			let width = prompt("zadaj hrubku ciary");
			let color = prompt("zadaj farbu v hexa zapise");			
			const sprava = "LINE " + comm + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 2;
		}
	}

}

function scroll(element){
	var ele = document.getElementById(element);   
	window.scrollTo(ele.offsetLeft,ele.offsetTop); 
}

function clear(){
	let color = prompt("zadaj farbu v hexa zapise");
	document.querySelector("#ves").value = "ves v1.0" + "\n" + "CLEAR " + color;
	document.getElementById("vykresli").click();

}

let clicked = [0, 0, 0, 0, 0, 0, 0];	//offsets
let TTL = null;	//time-to-live
let comm = "";	//single-line
let points = [];	//an array of point-coords
let current_shape = null;


window.onload = document.getElementById("vykresli").click();	// init picture
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