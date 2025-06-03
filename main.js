const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const btnSearch = document.querySelector("#btnSearch");

let container = document.querySelector("#mon-conteneur");
if (!container) {
	container = document.createElement("div");
	container.id = "mon-conteneur";
	document.body.appendChild(container);
}

btnSearch.addEventListener("click", async (e) => {
	e.preventDefault();
	try {
		const res = await fetch(`http://10.69.0.17:3002/v1/flowers?date=${startDate.value}`);
		const data = await res.json();
		container.innerHTML = "";
		
		data.forEach(flower => {
			const card = createCard(flower);
			container.appendChild(card);
		});
	} catch (err) {
		console.error(err);
	}
});

function createCard(flower) {
	const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

	const article = document.createElement("article");

	const imgMain = document.createElement("img");
	imgMain.className = "img";
	imgMain.src = flower.image;
	imgMain.alt = "";
	article.appendChild(imgMain);

	const divArt = document.createElement("div");
	divArt.className = "divArt";
	article.appendChild(divArt);

	const divEtoile = document.createElement("div");
	divEtoile.className = "divEtoile";
	for (let i = 1; i <= flower.melliferous; i++) {
		const star = document.createElement("img");
		star.src = "assets/star.svg";
		star.alt = "star";
		divEtoile.appendChild(star);
		if (i == 3) {
			divEtoile.style.backgroundColor = "#3F774A";
		}
	}
	divArt.appendChild(divEtoile);

	const h3 = document.createElement("h3");
	h3.id = "h3Art";
	h3.textContent = flower.name || "Nom inconnu";
	divArt.appendChild(h3);

	const divFlo = document.createElement("div");
	divFlo.className = "divFlo";

	const divFloImg = document.createElement("div");
	divFloImg.className = "divFloImg";

	const imgBee = document.createElement("img");
	imgBee.src = "assets/abeille.svg";
	imgBee.alt = "";
	divFloImg.appendChild(imgBee);

	const pFlo = document.createElement("p");
	pFlo.className = "pFlo";
	pFlo.textContent = "Floraison";
	divFloImg.appendChild(pFlo);

	divFlo.appendChild(divFloImg);

	const dateArt = document.createElement("p");
	dateArt.className = "dateArt";
	const startMonth = months[(flower.startBloom || 0) - 1] || "?";
	const endMonth = months[(flower.endBloom || 0) - 1] || "?";
	dateArt.textContent = `${startMonth} - ${endMonth}`;
	divFlo.appendChild(dateArt);

	divArt.appendChild(divFlo);

	const pDesc = document.createElement("p");
	pDesc.className = "pDesc";
	pDesc.textContent = flower.description || "";
	divArt.appendChild(pDesc);

	const divPropriete = document.createElement("div");
	divPropriete.className = "propriete";

	const prop1 = document.createElement("div");
	prop1.className = "prop";
	const pProp1 = document.createElement("p");
	pProp1.className = "pProp";
	pProp1.textContent = "Propolis";
	const img1 = document.createElement("img");
	img1.src = flower.propolis != 0 ? "assets/valider.svg" : "assets/croix.svg";
	img1.alt = "croix";
	prop1.appendChild(pProp1);
	prop1.appendChild(img1);
	divPropriete.appendChild(prop1);

	const prop2 = document.createElement("div");
	prop2.className = "propValue";
	const pProp2 = document.createElement("p");
	pProp2.className = "pProp";
	pProp2.textContent = "Nectar";
	const spanN = document.createElement("span");
	spanN.className = "pProp";
	spanN.textContent = flower.nectar || "0";
	const progressNectar = document.createElement("progress");
	progressNectar.setAttribute("max", "100");
	const imgN = document.createElement("img");
	if (flower.nectar == 1) {
		progressNectar.setAttribute("value", "33");
	} else if (flower.nectar == 2) {
		progressNectar.setAttribute("value", "66");
	} else if (flower.nectar == 3) {
		progressNectar.setAttribute("value", "100");
	} else if (flower.nectar == 0) {
		imgN.src = "assets/croix.svg";
		spanN.textContent = "";
	}
	prop2.appendChild(pProp2);
	prop2.appendChild(spanN);
	prop2.appendChild(progressNectar);
	prop2.appendChild(imgN);
	divPropriete.appendChild(prop2);

	const propValue = document.createElement("div");
	propValue.className = "propValue";
	const pProp3 = document.createElement("p");
	pProp3.className = "pProp";
	pProp3.textContent = "Pollen";
	const span = document.createElement("span");
	span.className = "pProp";
	span.textContent = flower.pollen || "0";
	const progressP = document.createElement("progress");
	progressP.setAttribute("max", "100");
	const imgP = document.createElement("img");
	if (flower.pollen == 1) {
		progressP.setAttribute("value", "33");
	} else if (flower.pollen == 2) {
		progressP.setAttribute("value", "66");
	} else if (flower.pollen == 3) {
		progressP.setAttribute("value", "100");
	} else if (flower.pollen == 0) {
		imgP.src = "assets/croix.svg";
		span.textContent = "";
	}
	propValue.appendChild(pProp3);
	propValue.appendChild(span);
	propValue.appendChild(progressP);
	propValue.appendChild(imgP);
	divPropriete.appendChild(propValue);

	divArt.appendChild(divPropriete);

	return article;
}
	