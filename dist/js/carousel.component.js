// inject data [{}] into B4 carousel component
carouselBuild(carousel1, dataNovedades);
carouselBuild(carousel2, dataMixes);
carouselBuild(carousel3, dataRecomendado);
carouselBuild(carousel4, dataCritica);
carouselBuild(carousel5, dataLeido);

function carouselBuild(carousel, data) {
	// build te4mplate + inject
	carousel.innerHTML = `
    <ol class="carousel-indicators">
      ${indicatorsBuild(data, carousel)}
    </ol>

    <div class="carousel-inner" role="listbox">
      ${itemsBuild(data, carousel)}         
    </div>


    <a class="carousel-control-prev"
       href="#${carousel.id}"
       role="button"
       data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next"
       href="#${carousel.id}"
       role="button"
       data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    `;
}

// lib
function itemsBuild(data, carousel) {
	let template = ``;
	let active = "active";

	for (let i = 0; i < data.length; i++) {
		if (i > 0) active = ""; // active starts at item 0

		template += `
    <div class="carousel-item ${active}" onclick="goToDetailsPage(${data[i].ISBN})">
      <img class="${carousel.dataset.imgClass}"
            width="${carousel.dataset.imgWidth}"
            src="${data[i].path}"
            alt="${data[i].alt}">
      <div class="${carousel.dataset.captionClass}">
        <h2 class="title-small">${data[i].title}</h2>
        <p>${data[i].author}</p>
      </div>
    </div>`;
	}

	return template;
}

function indicatorsBuild(data, carousel) {
	// active <li>
	let template = `
    <li data-target="#${carousel.id}"
      data-slide-to="0"
      class="active">
    </li>`;

	// non-active <li>
	for (let i = 1; i < data.length; i++) {
		template += `
    <li data-target="#${carousel.id}"
        data-slide-to="${i}">
    </li>`;
	}

	return template;
}

function goToDetailsPage(ISBN) {
	let folderHTML = "dist/html";

	ISBN && Number.isInteger(ISBN)
		? (location.href = `${folderHTML}/details.html?ISBN=${ISBN}`)
		: (location.href = `${folderHTML}/mock.html`);
}
