// handleSubmit je funkcia, ktorá sa spustí keď sa bude mať odoslať náš formulár
function handleSubmit(e) {
	e.preventDefault(); // zabrániť vstavenému odosielaniu v prehliadači

	// this reprezentuje ten formular, ktory odosielame
	const ves = this.querySelector("textarea").value; // Načítame text z textarea
	const width = document.querySelector("section:nth-child(2)").clientWidth; // Načítame aktuálnu šírku výstupného okna

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
}

function fillCircle(e) {
	console.log("fillCircle");
}

function circle(e) {
	console.log("circle");
}

function rectangle(e) {
	console.log("rectangle");
}

function fill_rectangle(e) {
	console.log("fill_rectangle");
}

function triangle(e) {
	console.log("triangle");
}

function fill_triangle(e) {
	console.log("fill_triangle");
}

function line(e) {
	console.log("line");
}


document.querySelector("form").addEventListener("submit", handleSubmit); // Nastavíme formulár, aby pri submit udalosti spustil našu handleSubmit funkciu
document.querySelector("#fill_circle").addEventListener("click", fillCircle);
document.querySelector("#circle").addEventListener("click", circle);
document.querySelector("#rectangle").addEventListener("click", rectangle);
document.querySelector("#fill_rectangle").addEventListener("click", fill_rectangle);
document.querySelector("#triangle").addEventListener("click", triangle);
document.querySelector("#fill_triangle").addEventListener("click", fill_triangle);
document.querySelector("#line").addEventListener("click", line);