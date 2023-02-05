
/*
    1. searchbar searches by genre only
*/

class SearchBar{
    constructor(){
        this.input = document.querySelector('.searchInput');
        this.pageTitle = document.querySelector('.page-title');
        this.searchBtn = document.querySelector('.search-btn');
        this.trending = document.querySelector('.trending');
        this.recommeded = document.querySelector('.recommended');
        this.movies = document.querySelector('.movies');
        this.shows = document.querySelector('.shows');
        this.trendingTitle = document.querySelector('.trending-title');
        this.trendingGallery = document.querySelector('.trending-gallery');
        this.recommendedTitle = document.querySelector('.recommended-title');
        this.recommendedGallery = document.querySelector('.recommended-gallery');
        this.moviesTitle = document.querySelector('.movies-title');
        this.moviesGallery = document.querySelector('.movies-gallery');
        this.showsTitle = document.querySelector('.shows-title');
        this.showsGallery = document.querySelector('.shows-gallery');
        this.searchSection = document.querySelector('.search-gallery');
        console.log(this.searchSection);
        this.displayResults()
    }
    displayResults(){
            this.searchBtn.addEventListener('click', async () => {
            event.preventDefault();
            const url1 = 'https://netflix54.p.rapidapi.com/search/?query=';
            const genre = this.getInput().toLowerCase();
            const url2 = '&offset=0&limit_titles=10&limit_suggestions=20&lang=en';
            const baseURL = `${url1}${genre}${url2}`;
            const array = await this.fetch(baseURL);
            const titles = array.titles;
            this.generateHTML(titles)
        })
    }
    getInput(){
        const searchInput = this.input.value;
        return searchInput;
    }
    async fetch(value){
        try{
            const response = await fetch(value, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            });
            if (response.ok){
                const jsonResponse = await response.json();
                const result = jsonResponse;
                return result
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async generateHTML(titles){
        if (this.searchSection.childNodes.length > 0){
            this.searchSection.innerHTML = ''
        }
        this.trending.style.padding = '0';
        this.recommeded.style.padding = '0';
        this.movies.style.padding = '0';
      //  this.shows.style.padding = '0';
        this.trendingTitle.textContent = '';
        this.trendingTitle.style.padding = '0';
        this.trendingGallery.innerHTML = '';
        this.recommendedTitle.textContent = '';
        this.recommendedTitle.style.padding = '0';
        this.recommendedGallery.innerHTML = '';
        this.moviesTitle.textContent = '';
        this.moviesTitle.style.padding = '0';
        this.moviesGallery.innerHTML = '';
        this.showsTitle.style.padding = '0';
        this.showsTitle.textContent = '';
        this.showsGallery.innerHTML = ''

        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0';
        titles.forEach(title => {
            const searchDiv = document.createElement('div');
            searchDiv.classList.add('recommended-item')
            searchDiv.innerHTML = `
        
                <a href="#">
                    <img src="${title.jawSummary.backgroundImage.url}"alt="">
                    <div class="recommended-item-description">
                        <span>${title.jawSummary.releaseYear} ${title.summary.type}</span>
                        <h4>${title.jawSummary.title}</h4>
                    </div>
                </a>

            `;
            this.searchSection.appendChild(searchDiv)
        })
    }
}


/* 
    1. fetched data and display it on the window 
    2. target referes to the class of the element where the data is going to be appended eg: '.trading-gallery'
    3. genre refers to the genre to be fetched or the trending section
    4. titlesNum refers to the number of titles to fetch from the API
    5. classList refers to the class added to the created div in the forEach method inside the generateHTML() eg: 'trending-item'
    6. mostInnerDivClass refers to the div class inside  each classList item (5. see above) that has the span and h4 elements as childs eg: 'trending-item-description'
    7. button refers to the nav buttons that display home, movies and shows results eg: '.fa-house'
    */
class Trending{
    constructor(classList, mostInnerDivClass){
        this.trending = document.querySelector('.trending');
        this.homeBtn = document.querySelector('.fa-house');
        this.pageTitle = document.querySelector('.page-title');
        this.classList = classList;
        this.mostInnerDivClass = mostInnerDivClass;
        this.gallery = document.querySelector('.trending-gallery');
        this.title = document.querySelector('.trending-title');
        this.moviesTitle = document.querySelector('.movies-title');
        this.movies = document.querySelector('.movies-gallery');
        this.showsTitle = document.querySelector('.shows-title');
        this.shows = document.querySelector('.shows-gallery');
        this.searchGallery = document.querySelector('.search-gallery');
        this.input = document.querySelector('.searchInput');
        this.handleEvent()
    }
    async fetch(baseURL){
        try{
            const response = await fetch(baseURL,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            });
            if (response.ok){
                const jsonResponse = await response.json();
                const results = jsonResponse;
                return results
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async generateHTML(titles){
        if (this.gallery.childNodes.length > 0){
            this.gallery.innerHTML = ''
        }
        this.input.value = '';
        this.title.style.padding = '1rem 0'
        this.trending.style.paddingLeft = '1rem';
        this.searchGallery.innerHTML = '';
        this.moviesTitle.textContent = '';
        this.movies.innerHTML = '';
        this.showsTitle.textContent = '';
        this.shows.innerHTML = '';
        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0'
        this.title.textContent = 'Trending';
        titles.forEach(title => {
            const myDivision = document.createElement('div');
            myDivision.classList.add(this.classList);
            const mostInnerDivClass = this.mostInnerDivClass;
            myDivision.innerHTML = `
        
                    <a href="#" alt="">
                        <img src="${title.jawSummary.backgroundImage.url}" alt="">
                        <div class=${mostInnerDivClass} >
                            <span>${title.jawSummary.releaseYear} ${title.summary.type}</span>
                            <h4>${title.jawSummary.title}</h4>
                        </div>
                    </a>
                
            `;
            this.gallery.appendChild(myDivision)
        });
    }
    async displayResults(){
        const baseURL = 'https://netflix54.p.rapidapi.com/search/?query=trending&offset=0&limit_titles=8&limit_suggestions=20&lang=en';
        console.log(baseURL);
        const array = await this.fetch(baseURL);
        const titles = array.titles;
        this.generateHTML(titles);
        console.log(titles)
    }
    handleEvent(){
        this.homeBtn.addEventListener('click', async () => {
            this.displayResults()
        })
    }
}

class Recommended{
    constructor(classList, mostInnerDivClass){
        this.recommeded = document.querySelector('.recommended');
        this.homeBtn = document.querySelector('.fa-house');
        this.pageTitle = document.querySelector('.page-title');
        this.classList = classList;
        this.mostInnerDivClass = mostInnerDivClass;
        this.gallery = document.querySelector('.recommended-gallery');
        this.title = document.querySelector('.recommended-title');
        this.searchGallery = document.querySelector('.search-gallery');
        this.handleEvent()
    }
    async fetch(baseURL){
        try{
            const response = await fetch(baseURL,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            });
            if (response.ok){
                const jsonResponse = await response.json();
                const results = jsonResponse;
                return results
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async generateHTML(titles){
        if (this.gallery.childNodes.length > 0){
            this.gallery.innerHTML = ''
        }
        this.title.style.padding = '0 0 1rem 0'
        this.recommeded.style.padding = '0 1rem 1rem 1rem'
        this.searchGallery.innerHTML = ''; 
        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0'
        this.title.textContent = 'Recommended for you';
        titles.forEach(title => {
            const myDivision = document.createElement('div');
            myDivision.classList.add(this.classList);
            const mostInnerDivClass = this.mostInnerDivClass;
            myDivision.innerHTML = `
        
                    <a href="#" alt="">
                        <img src="${title.jawSummary.backgroundImage.url}" alt="">
                        <div class=${mostInnerDivClass} >
                            <span>${title.jawSummary.releaseYear} ${title.summary.type}</span>
                            <h4>${title.jawSummary.title}</h4>
                        </div>
                    </a>
                
            `;
            this.gallery.appendChild(myDivision)
        });
    }
    async displayResults(){
        const baseURL = 'https://netflix54.p.rapidapi.com/search/?query=recommended&offset=0&limit_titles=8&limit_suggestions=20&lang=en';
        console.log(baseURL);
        const array = await this.fetch(baseURL);
        const titles = array.titles;
        this.generateHTML(titles);
        console.log(titles)
    }
    handleEvent(){
        this.homeBtn.addEventListener('click', async () => {
            this.displayResults()
        })
    }
}

class Movies{
    constructor(classList, mostInnerDivClass){
        this.movies = document.querySelector('.movies');
        this.moviesTitle = document.querySelector('.movies-title');
        this.homeBtn = document.querySelector('.fa-film');
        this.pageTitle = document.querySelector('.page-title');
        this.classList = classList;
        this.mostInnerDivClass = mostInnerDivClass;
        this.gallery = document.querySelector('.movies-gallery');
        this.title = document.querySelector('.movies-title');
        this.trendingTitle = document.querySelector('.trending-title');
        this.trendingGallery = document.querySelector('.trending-gallery');
        this.recommendedTitle = document.querySelector('.recommended-title');
        this.recommendedGallery = document.querySelector('.recommended-gallery');
        this.showsTitle = document.querySelector('.shows-title');
        this.showsGallery = document.querySelector('.shows-gallery');
        this.input = document.querySelector('.searchInput');
        this.searchGallery = document.querySelector('.search-gallery');
        this.handleEvent()
    }
    async fetch(baseURL){
        try{
            const response = await fetch(baseURL,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            });
            if (response.ok){
                const jsonResponse = await response.json();
                const results = jsonResponse;
                return results
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async generateHTML(titles){
        if (this.gallery.childNodes.length > 0){
            this.gallery.innerHTML = ''
        }
        this.searchGallery.innerHTML = '';
        this.input.value = ''; 
        this.movies.style.padding = '0 1rem 1rem 1rem'
        this.moviesTitle.style.padding = '1rem 0';
        this.trendingTitle.textContent = '';
        this.trendingTitle.style.padding = '0';
        this.trendingGallery.innerHTML = '';
        this.recommendedTitle.textContent = '';
        this.recommendedTitle.style.padding = '0';
        this.recommendedGallery.innerHTML = '';
        this.showsTitle.textContent = '';
        this.showsGallery.innerHTML = '';
        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0'
        this.title.textContent = 'Movies';
        titles.forEach(title => {
            const myDivision = document.createElement('div');
            myDivision.classList.add(this.classList);
            const mostInnerDivClass = this.mostInnerDivClass;
            myDivision.innerHTML = `
        
                    <a href="#" alt="">
                        <img src="${title.jawSummary.backgroundImage.url}" alt="">
                        <div class=${mostInnerDivClass} >
                            <span>${title.jawSummary.releaseYear} ${title.summary.type}</span>
                            <h4>${title.jawSummary.title}</h4>
                        </div>
                    </a>
                
            `;
            this.gallery.appendChild(myDivision)
        });
    }
    async displayResults(){
        const baseURL = 'https://netflix54.p.rapidapi.com/search/?query=movie&offset=0&limit_titles=10&limit_suggestions=20&lang=en';
        console.log(baseURL);
        const array = await this.fetch(baseURL);
        const titles = array.titles;
        this.generateHTML(titles);
        console.log(titles)
    }
    handleEvent(){
        this.homeBtn.addEventListener('click', async () => {
            this.displayResults()
        })
    }
}

class Shows{
    constructor(classList, mostInnerDivClass){
        this.shows = document.querySelector('.shows');
        this.homeBtn = document.querySelector('.fa-tv');
        this.pageTitle = document.querySelector('.page-title');
        this.classList = classList;
        this.mostInnerDivClass = mostInnerDivClass;
        this.gallery = document.querySelector('.shows-gallery');
        this.title = document.querySelector('.shows-title');       
        this.trendingTitle = document.querySelector('.trending-title');       
        this.trendingGallery = document.querySelector('.trending-gallery');
        this.recommendedTitle = document.querySelector('.recommended-title');
        this.recommendedGallery = document.querySelector('.recommended-gallery');
        this.movies = document.querySelector('.movies');
        this.moviesTitle = document.querySelector('.movies-title');
        this.moviesGallery = document.querySelector('.movies-gallery');
        this.searchGallery = document.querySelector('.search-gallery');
        this.input = document.querySelector('.searchInput');
        this.handleEvent()
    }
    async fetch(baseURL){
        try{
            const response = await fetch(baseURL,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            });
            if (response.ok){
                const jsonResponse = await response.json();
                const results = jsonResponse;
                return results
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async generateHTML(titles){
        if (this.gallery.childNodes.length > 0){
            this.gallery.innerHTML = ''
        }
        this.searchGallery.innerHTML = '';
        this.input.value = '';
        this.movies.style.padding = '0 1rem 1rem 1rem';
        this.title.style.padding = '1rem 0';
        this.searchGallery.innerHTML = '';
        this.trendingTitle.textContent = '';
        this.trendingTitle.style.padding = '0';
        this.trendingGallery.innerHTML = '';
        this.recommendedTitle.textContent = '';
        this.recommendedTitle.style.padding = '0';
        this.recommendedGallery.innerHTML = '';
        this.movies.style.padding = '0';
        this.moviesTitle.textContent = '';
        this.moviesTitle.style.padding = '0';
        this.moviesGallery.innerHTML = ''; 
        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0'
        this.title.textContent = 'Shows';
        titles.forEach(title => {
            const myDivision = document.createElement('div');
            myDivision.classList.add(this.classList);
            const mostInnerDivClass = this.mostInnerDivClass;
            myDivision.innerHTML = `
        
                    <a href="#" alt="">
                        <img src="${title.jawSummary.backgroundImage.url}" alt="">
                        <div class=${mostInnerDivClass} >
                            <span>${title.jawSummary.releaseYear} ${title.summary.type}</span>
                            <h4>${title.jawSummary.title}</h4>
                        </div>
                    </a>
                
            `;
            this.gallery.appendChild(myDivision)
        });
    }
    async displayResults(){
        const baseURL = 'https://netflix54.p.rapidapi.com/search/?query=show&offset=0&limit_titles=10&limit_suggestions=20&lang=en';
        console.log(baseURL);
        const array = await this.fetch(baseURL);
        const titles = array.titles;
        this.generateHTML(titles);
        console.log(titles)
    }
    handleEvent(){
        this.homeBtn.addEventListener('click', async () => {
            this.displayResults()
        })
    }
}

const trendingGallery = new Trending('trending-item', 'trending-item-description');
const recommendedGallery = new Recommended('recommended-item', 'recommended-item-description');
const moviesGallery = new Movies( 'recommended-item', 'recommended-item-description');
const showsGallery = new Shows('recommended-item', 'recommended-item-description');
const searchBar = new SearchBar()
/*
'https://netflix54.p.rapidapi.com/search/?query=trending&offset=0&limit_titles=8&limit_suggestions=20&lang=en'
*/

/* searchbar if statement backup

   if (this.trendingGallery.childNodes.length > 0 || this.recommendedGallery.childNodes.length > 0 || this.moviesGallery.childNodes.length > 0 || this.showsdGallery.childNodes.length > 0){
            this.trendingGallery.innerHTML = '';
            this.recommendedGallery.innerHTML = '';
            this.moviesGallery.innerHTML = '';
            this.showsdGallery.innerHTML = ''
        }

*/