form.addEventListener('submit', (e) => {
	e.preventDefault();

	const phrase = document.getElementById('phrase').value;
	const value = document.querySelector('input[name="valueRadio"]:checked').value;
	const sort = document.querySelector('input[name="sortRadio"]:checked').value;

	let result = [];
	
	fetch(`http://www.reddit.com/search.json?q=${phrase},limit=${value},sort=${sort}`)
	.then(response => response.json()).then(data => {
		result = data.data.children.map(data => data.data);

		for(let i = 0; i < result.length; i++) {
			let postTitle = result[i].title; 
			let postImage = 'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2';
			let postUrl = "https://reddit.com" + result[i].permalink;

			if(result[i].preview) {
				postImage = result[i].preview.images[0].source['url'];
			}	
			createCard(postTitle, postImage, postUrl);
		}
		clearFields();
	}).catch(error => console.log(error));
});

const createCard = (title, image, url) => {
	const form = document.getElementById('form');
	const list = document.querySelector('.cards-list');
	const div = document.createElement('div');
	div.classList = 'card';
	div.innerHTML = `
		  <img class="card-img-top" src="${image}" alt="Card image cap">
		  <div class="card-body">
		    <h5 class="card-title">${title}</h5>
		    <a href="${url}" class="btn btn-primary">Go to article</a>
		  </div>	
	`;
	list.appendChild(div);
}

const clearFields = () => {
    	document.getElementById('phrase').value = null;
}
