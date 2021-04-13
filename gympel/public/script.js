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

	points = [];
	change_offset(0);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Filled Circle</b>";
	remove_hidden()
	TTL = 2;
}

function circle(e) {

	points = [];
	change_offset(1);
	document.getElementById("hint").innerHTML = "<em>Currently using:</em> <b>Circle</b>";
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
	const default_size = get_defaults();
	const def_width = default_size[0];
	const def_height = default_size[1];
	const div_width = document.querySelector("#image").offsetWidth;
	const div_height = document.querySelector("#image").offsetHeight;


	let im = document.querySelector("img")
	let sizes = getImgSizeInfo(im);
	let real_width = Math.round(sizes["width"]);
	let real_height = Math.round(sizes["height"]);

	const diff_y = Math.round(Math.abs(div_height - real_height) / 2);
	const diff_x = Math.round(Math.abs(div_width - real_width) / 2);

    let x = event.pageX - this.offsetLeft - diff_x;
    let y = event.pageY - this.offsetTop - diff_y;
    points.push([x,y]);
    let text = document.querySelector("#ves").value;
    console.log(x,y);


	if (clicked[0] == 1) {	//Filled circle

		if (TTL == 2) {
			comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";

		}

		TTL = TTL - 1;

		if (TTL == 0) {
		
			let r = calculate_radius(points);
			r = Math.round(convert_distance(r, def_width, real_width));
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
			comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";

		}

		TTL = TTL - 1;

		if (TTL == 0) {

			let r = calculate_radius(points);
			r = Math.round(convert_distance(r, def_width, real_width));
			let width = document.querySelector("#range").value;
			width = Math.round(convert_distance(width, def_width, real_width));
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

		comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";
		TTL = TTL - 1;

		if (TTL == 0) {

			let width = document.querySelector("#range").value;
			width = Math.round(convert_distance(width, def_width, real_width));
			let color = document.querySelector("#colorpicker").value;	
			const sprava = "RECT " + comm + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 2;
		}
	}

	if (clicked[3] == 1) {	// Filled Rectangle

		comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";
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


		comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";
		TTL = TTL - 1;

		if (TTL == 0) {
			
			let width = document.querySelector("#range").value;
			width = Math.round(convert_distance(width, def_width, real_width));
			let color = document.querySelector("#colorpicker").value;	
			const sprava = "TRIANGLE " + comm + width + " " + color;
			document.querySelector("#ves").value = text  + "\n" + sprava;
			document.getElementById("vykresli").click();
			comm = "";
			TTL = 3;
		}
	}

	if (clicked[5] == 1) {	// Filled Triangle

		comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";
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


		comm = comm + Math.round(convert_to_default(x, def_width, real_width)) + " " + Math.round(convert_to_default(y, def_height, real_height)) + " ";
		TTL = TTL - 1;

		if (TTL == 0) {

			let width = document.querySelector("#range").value;
			width = Math.round(convert_distance(width, def_width, real_width));
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

function generate_random_pic(e) {
	e.preventDefault();
	const url = this.action;
	const method = this.method;
	fetch(url, {method: method})
		.then((res) => res.blob())
		.then((example) => {
			prom = example.text()

			prom.then(
				function(result){
					document.querySelector("#ves").value = result;
					document.getElementById("vykresli").click();
			})
		})
}

function get_defaults() {
	cont = document.querySelector("#ves").value.split("\n");
	parts = cont[0].split(" ");
	width = parts[2];
	height = parts[3];
	return [width, height];
}

function convert_to_default(click_cord, default_size, real_size) {
	return (default_size * click_cord) / real_size;
}

function convert_distance(distance, default_size, real_size) {
	return (default_size * distance) / real_size;
}


function getRenderedSize(contains, cWidth, cHeight, width, height, pos){
  var oRatio = width / height,
      cRatio = cWidth / cHeight;
  return function() {
    if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
      this.width = cWidth;
      this.height = cWidth / oRatio;
    } else {
      this.width = cHeight * oRatio;
      this.height = cHeight;
    }      
    this.left = (cWidth - this.width)*(pos/100);
    this.right = this.width + this.left;
    return this;
  }.call({});
}


function getImgSizeInfo(img) {
  var pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');
  return getRenderedSize(true,
                         img.width,
                         img.height,
                         img.naturalWidth,
                         img.naturalHeight,
                         parseInt(pos[0]));
}


let clicked = [0, 0, 0, 0, 0, 0, 0];	//offsets
let TTL = null;	//time-to-live
let comm = "";	//single-line
let points = [];	//an array of point-coords
let current_shape = null;

const default_size = get_defaults();
const def_width = default_size[0];
const def_height = default_size[1];
const real_width = document.querySelector("img").offsetWidth;
const real_height = (def_height / def_width) * real_width;


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
document.querySelector("#undo").addEventListener("click", undo);
document.querySelector("#GenerateForm").addEventListener("submit", generate_random_pic);

window.onload = document.getElementById("vykresli").click();	// init picture
window.onload = remove_hidden() // hide range on default