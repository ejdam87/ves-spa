// handleSubmit je funkcia, ktorá sa spustí keď sa bude mať odoslať náš formulár
function handleSubmit(e) {
	e.preventDefault(); // zabrániť vstavenému odosielaniu v prehliadači

	// this reprezentuje ten formular, ktory odosielame
	const ves = this.querySelector("textarea").value; // Načítame text z textarea
	const width = document.querySelector("section:nth-child(3)").clientWidth; // Načítame aktuálnu šírku výstupného okna

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
	setTimeout(function(){
		scroll("output")
	}, 3000);
}

function fillCircle(e) {

	let text = document.querySelector("#ves").value;
	let r = prompt("zadaj polomer");
	let x = prompt("zadaj x ovu surandnicu stredu");
	let y = prompt("zadaj y silonovu surandnicu stredu");
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "FILL_CIRCLE " + x + " " + y + " " + r + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();

}

function circle(e) {
	let text = document.querySelector("#ves").value;
	let r = prompt("zadaj polomer");
	let x = prompt("zadaj x ovu surandnicu stredu");
	let y = prompt("zadaj y silonovu surandnicu stredu");
	let width = prompt("zadaj hrubku ciary")
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "CIRCLE " + x + " " + y + " " + r + " " + width + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();

}

function rectangle(e) {
	let text = document.querySelector("#ves").value;
	let height = prompt("zadaj vysku");
	let width = prompt("zadaj sirku");
	let x = prompt("zadaj x ovu surandnicu");
	let y = prompt("zadaj y silonovu surandnicu");
	let hrubka = prompt("zadaj hrubku")
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "RECTANGLE " + x + " " + y + " " + height + " " + width +" " + hrubka + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();

}

function fill_rectangle(e) {
	let text = document.querySelector("#ves").value;
	let height = prompt("zadaj vysku")
	let width = prompt("zadaj sirku");
	let x = prompt("zadaj x ovu surandnicu");
	let y = prompt("zadaj y silonovu surandnicu");
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "FILL_RECTANGLE " + x + " " + y + " " + height + " " + width + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();

} 

function triangle(e) {
	let text = document.querySelector("#ves").value;
	console.log("triangle");
	let x1 = prompt("zadaj x1");
	let y1 = prompt("zadaj y1");
	let x2 = prompt("zadaj x2");
	let y2 = prompt("zadaj y2");
	let x3 = prompt("zadaj x3");
	let y3 = prompt("zadaj y3");
	let width = prompt("zadaj hrubku")
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "TRIANGLE " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x3 + " " + x3  + " " + width + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();

}

function fill_triangle(e) {
	let text = document.querySelector("#ves").value;
	let x1 = prompt("zadaj x1");
	let y1 = prompt("zadaj y1");
	let x2 = prompt("zadaj x2");
	let y2 = prompt("zadaj y2");
	let x3 = prompt("zadaj x3");
	let y3 = prompt("zadaj y3");
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "FILL_TRIANGLE " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x3 + " " + y3  + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();


}

function line(e) {
	let text = document.querySelector("#ves").value;
	let width = prompt("zadaj hrubku");
	let x1 = prompt("zadaj prvu x ovu surandnicu");
	let y1 = prompt("zadaj prvu y silonovu surandnicu");
	let x2 = prompt("zadaj druhu x ovu surandnicu");
	let y2 = prompt("zadaj druhu y silonovu surandnicu");
	let color = prompt("zadaj farbu v hexa zapise");
	const sprava = "LINE " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + width + " " + color;
	document.querySelector("#ves").value = text  + "\n" + sprava;
	document.getElementById("vykresli").click();

}

function scroll(element){   
	var ele = document.getElementById(element);   
	window.scrollTo(ele.offsetLeft,ele.offsetTop); }


document.querySelector("#VESform").addEventListener("submit", handleSubmit);
document.querySelector("#fill_circle").addEventListener("click", fillCircle);
document.querySelector("#circle").addEventListener("click", circle);
document.querySelector("#rectangle").addEventListener("click", rectangle);
document.querySelector("#fill_rectangle").addEventListener("click", fill_rectangle);
document.querySelector("#triangle").addEventListener("click", triangle);
document.querySelector("#fill_triangle").addEventListener("click", fill_triangle);
document.querySelector("#line").addEventListener("click", line);