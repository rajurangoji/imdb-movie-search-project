document.getElementById('search').addEventListener('click',()=>{
	document.querySelector('.review').innerHTML=""
	document.querySelector('.cast').innerHTML=""
	document.querySelector('.review').style.display ="none"
	document.querySelector('.cast').style.display ="none"
	document.querySelector('.results').style.display ="flex"
	let value = document.getElementById('input').value ;
	document.getElementById('input').value="";
	document.querySelector('.results').innerHTML=""
	document.getElementById('head').innerText=""
	document.getElementById('head2').innerText=""




	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'c898fcfc57msh52a2124cd9b7b44p1ec4f3jsn6342746554e2',
			'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
		}
	};
	
	fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${value}`, options)
		.then(response => response.json())
		.then((data) => {
			let arr = data.d
			console.log(data.d)
			let res = JSON.stringify(data.d)
		
			localStorage.setItem('results', res)
		
			arr.forEach((item) => {
				if('i' in item){
					let img = document.createElement('img');
					let maindiv = document.createElement('div')
					maindiv.classList.add('card')
					maindiv.dataset.movieid = item.id
					img.classList.add('images')
					img.src = item.i.imageUrl;
		
					let movieName = document.createElement('p')
					movieName.classList.add('movieName');
					movieName.innerText= item.l;
		
		
					maindiv.append(img)
					maindiv.append(movieName)
					
					document.querySelector('.results').append(maindiv)
				}
				
			});
		})
		.then(()=>{
			let cd = document.querySelectorAll('.card')
		
			cd.forEach((item)=>{
				item.addEventListener('click', ()=>{
					document.querySelector('.cast').innerHTML =""
					let id = item.dataset.movieid;
					document.querySelector('.results').style.display ="none"
					document.querySelector('.cast').style.display="flex"
					document.querySelector('.cast').style.height="70vh"
					document.querySelector('.cast').style.width="80vw"
					
					const options = {
						method: 'GET',
						headers: {
							'X-RapidAPI-Key': 'c898fcfc57msh52a2124cd9b7b44p1ec4f3jsn6342746554e2',
							'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
						}
					};
					
					fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${id}`, options)
						.then(response => response.json())
						.then(data => {
							let arrData = data.d


							let close = document.createElement('h1');
								close.classList.add('close')
  	 							close.innerText="X";

	 							close.addEventListener('click',()=>{
	 								document.querySelector('.cast').style.display="none"
	 								document.querySelector('.results').style.display ="flex"
	
	 							})

								arrData.forEach((item) => {
									if('i' in item){
										let img = document.createElement('img');
										let maindiv = document.createElement('div')
										maindiv.classList.add('castcard')
										
										img.classList.add('castImages')
										img.src = item.i.imageUrl;
							
										let movieName = document.createElement('h1')
										movieName.classList.add('castmovieName');
										movieName.innerText= item.l;

										let movietype = document.createElement('h3')
										movietype.classList.add('movietype')
										movietype.innerText= `Movie-type:- ${item.q}`;

										let charaters = document.createElement('h3')
										charaters.classList.add('charaters');
										charaters.innerText= `Charaters:- ${item.s}`;

										let rank = document.createElement('h3')
										rank.classList.add('rank')
										rank.innerText= `Rank Of Movie:- ${item.rank}`;

										let year = document.createElement('h3')
										year.classList.add('year')
										year.innerText= `Release Year:- ${item.y}`;

										let btnReview = document.createElement('button')
										btnReview.classList.add('btnReview')
										btnReview.dataset.movieid = item.id
										btnReview.innerText= "View Reviews"


							
							
										maindiv.append(img)
										maindiv.append(movieName)
										maindiv.append(movietype)
										maindiv.append(charaters)
										maindiv.append(rank)
										maindiv.append(year)
										maindiv.append(btnReview)
										
										document.querySelector('.cast').append(maindiv)
									}
									
								});

	 							document.querySelector('.cast').append(close);

						})
						.then(()=>{
							let a = document.querySelectorAll('.btnReview');
						
						
							a.forEach((item)=>{
								
								item.addEventListener('click',()=>{
									document.querySelector('.review').innerHTML=""
									let id = item.dataset.movieid;
									console.log(id)
									document.querySelector('.cast').style.display ="none"
									document.querySelector('.review').style.display ="flex"
									document.querySelector('.review').style.height ="70vh"
									document.querySelector('.review').style.width ="80vw"
									
									
									
									
									const options = {
										method: 'GET',
										headers: {
											'X-RapidAPI-Key': 'c898fcfc57msh52a2124cd9b7b44p1ec4f3jsn6342746554e2',
											'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
										}
									};
									
									fetch(`https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=${id}`, options)
										.then(response => response.json())
										.then((data)=> {
					

											let close = document.createElement('h1');
													close.classList.add('close')
													close.innerText="X";
						
													close.addEventListener('click',()=>{
														document.querySelector('.review').style.display="none"
														document.querySelector('.results').style.display ="flex"
							
													})
						
													
						
													
											 data.reviews.forEach((item)=>{
										
												let text = document.createElement('p');
												text.classList.add('text');
												text.innerText= item.reviewText;


												document.querySelector('.review').append(close);
												document.querySelector('.review').append(text);
						
												
										
											 })
										
										})
										
								})
								
							})
							
						})
					
				})
			})
		})
		
	
		

})




