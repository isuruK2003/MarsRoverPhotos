const modalId = "modal";
const modalImageId = "modal-image";
const modalImageName = "modal-image-name";
const modalTable = "modal-table";
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}`;


function closeModal() {
	document.getElementById(modalId).style.display = "none";
}

function openModal(photo_data) {
	document.getElementById(modalId).style.display = "flex";
	document.getElementById(modalImageId).src = photo_data.img_src;
	document.getElementById(modalImageName).innerText = photo_data.id;

	let table = document.getElementById(modalTable);
	table.innerHTML = "";

	addToTable(table, "Image ID", photo_data.id);
	addToTable(table, "Martian Solar Day (sol)", photo_data.sol);
	addToTable(table, "Camera", photo_data.camera.full_name);
	addToTable(table, "Earth Date", photo_data.earth_date);
	addToTable(table, "Rover", photo_data.rover.name);

	console.log(photo_data);
}

function addToTable(table, td1, td2) {

	let tr = document.createElement("tr");
	let td_key = document.createElement("td");
	let td_val = document.createElement("td");

	td_key.textContent = td1;
	td_val.textContent = td2;

	tr.appendChild(td_key);
	tr.appendChild(td_val);

	table.appendChild(tr);
}

function makeImage(photo_data) {
	let gallery = document.getElementsByClassName("gallery")[0];
	let image = document.createElement("div");
	let img = document.createElement("img");

	image.className = "image";
	img.id = photo_data.id;
	img.alt = photo_data.id;
	img.src = photo_data.img_src;

	img.addEventListener("click", function() {
		openModal(photo_data)
	});

	image.appendChild(img);
	gallery.appendChild(image);
}

fetch(apiUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		const latest_photos = data.latest_photos;
		latest_photos.forEach(photo => {
			makeImage(photo);
		});
	})
	.catch(error => {
		console.error('Error:', error);
	});
