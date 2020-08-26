let ISBN = +getParameterByName("ISBN"); // int
let details = todos.find(ebook => ebook.ISBN === ISBN);

// DOM inject details
detailed.innerHTML = `
      <li class="pt-3 pb-5">
        <img width="200rem"
             src="../../${details.path}"
             alt="${details.alt}">      
      </li>
      <li>
        <h1 class="display-4">${details.title}</h1>
      </li>
      <li class="pb-4">
        <h2>${details.author}</h2>
      </li>
      <li class="pb-4">
        ${details.description}
      </li>
      <li><b>editorial</b> - ${details.publisher}</li>
      <li><b>año</b> - ${details.year}</li>
      <li><b>páginas</b> - ${details.paginas}</li>
      <li><b>ISBN</b> - ${details.ISBN}</li>
      <li><b>idioma</b> - ${details.lang}</li>
      <li><b>categoría</b> - ${details.category}</li>
      <li><b>etiqueta</b> - ${details.tag}</li>
      <li><b>readlist</b> - ${details.sectionTag}</li>
      `;

// -> get ISBN from query in URL
function getParameterByName(query) {
	let url = window.location.href;
	let params = url.split(`?${query}=`);
	return params[1];
}
