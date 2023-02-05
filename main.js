
/*
    1. searchbar searches by genre only
*/

class SearchBar{
    constructor(){
        this.input = document.querySelector('.searchInput');
        this.pageTitle = document.querySelector('.page-title');
        this.searchBtn = document.querySelector('.search-btn');
        this.trendingGallery = document.querySelector('.trending');
        this.recommendedGallery = document.querySelector('.recommended');
        this.searchSection = document.querySelector('.search-gallery');
        console.log(this.searchSection);
        this.displayResults()
    }
    displayResults(){
            this.searchBtn.addEventListener('click', async () => {
            event.preventDefault();
            const url1 = 'https://netflix54.p.rapidapi.com/search/?query=';
            const genre = this.getInput().toLowerCase();
            const url2 = '&offset=0&limit_titles=20&limit_suggestions=20&lang=en';
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
        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0';
        this.trendingGallery.style.height = '0';
        this.recommendedGallery.style.height = '0';
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

const searchBar = new SearchBar()
/* 
    1. fetched data and display it on the window 
    2. target referes to the class of the element where the data is going to be appended eg: '.trading-gallery'
    3. genre refers to the genre to be fetched or the trending section
    4. titlesNum refers to the number of titles to fetch from the API
    5. classList refers to the class added to the created div in the forEach method inside the generateHTML() eg: 'trending-item'
    6. mostInnerDivClass refers to the div class inside  each classList item (5. see above) that has the span and h4 elements as childs eg: 'trending-item-description'
    7. button refers to the nav buttons that display home, movies and shows results eg: '.fa-house'
    */
class Fetcher{
    constructor(target ,genre, titlesNum, language, classList, mostInnerDivClass, button, titleOne, titleTwo){
        this.title1 = titleOne;
        this.title2 = titleTwo;
        this.searchGallery = document.querySelector('.search-gallery');
        this.button = document.querySelector(button);
        this.pageTitle = document.querySelector('.page-title');
        this.trendingTitle = document.querySelector('.trending-title');
        this.recommendedTitle = document.querySelector('.recommended-title');
        this.gallery = document.querySelector(target);
        this.genre = genre;
        this.titlesNum = titlesNum;
        this.language = language;
        this.classList = classList;
        this.mostInnerDivClass = mostInnerDivClass;
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
  
        this.pageTitle.innerHTML = '';
        this.pageTitle.style.height = '0'
        this.trendingTitle.textContent = this.title1;
        this.recommendedTitle.textContent = this.title2;
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
        const url1 = 'https://netflix54.p.rapidapi.com/search/?query=';
        const genre = this.genre;
        const url2= '&offset=0&limit_titles=';
        const titlesNumber = this.titlesNum;
        const url3 = '&limit_suggestions=20&lang=';
        const lang = this.language;
        const baseURL = `${url1}${genre}${url2}${titlesNumber}${url3}${lang}`;
        console.log(baseURL);
        const array = await this.fetch(baseURL);
        const titles = array.titles;
        this.generateHTML(titles);
        console.log(titles)
    }
    handleEvent(){
        this.button.addEventListener('click', async () => {
            this.displayResults()
        })
    }
}


/*home button*/
const trendingGallery = new Fetcher('.trending-gallery', 'trending', '8', 'en', 'trending-item', 'trending-item-description', '.fa-house', 'Trending', 'Recommended for you');
const recommendedGallery = new Fetcher('.recommended-gallery', 'recommended', '20', 'en', 'recommended-item', 'recommended-item-description', '.fa-house', 'Trending', 'Recommended for you');
/*movies button*/
const moviesGallery = new Fetcher('.recommended-gallery', 'movie', '20', 'en', 'recommended-item', 'recommended-item-description', '.fa-film', 'Movies');
/*shows button*/
const showsGallery = new Fetcher('.recommended-gallery', 'show', '20', 'en', 'recommended-item', 'recommended-item-description', '.fa-tv', 'Shows');

/*
'https://netflix54.p.rapidapi.com/search/?query=trending&offset=0&limit_titles=8&limit_suggestions=20&lang=en'
*/

/* fetcher backup

class Fetcher{
    constructor(target ,genre, titlesNum, language, classList, mostInnerDivClass){
        this.searchGallery = document.querySelector('.search-gallery');
        this.homeBtn = document.querySelector('.fa-house');
        this.pageTitle = document.querySelector('.page-title');
        this.trendingTitle = document.querySelector('.trending-title');
        this.recommendedTitle = document.querySelector('.recommended-title');
        this.gallery = document.querySelector(target);
        this.genre = genre;
        this.titlesNum = titlesNum;
        this.language = language;
        this.classList = classList;
        this.mostInnerDivClass = mostInnerDivClass;
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
  
        this.pageTitle.innerHTML = '';
        this.trendingTitle.textContent = 'Trending';
        this.recommendedTitle.textContent = 'Recommended for you';
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
        const url1 = 'https://netflix54.p.rapidapi.com/search/?query=';
        const genre = this.genre;
        const url2= '&offset=0&limit_titles=';
        const titlesNumber = this.titlesNum;
        const url3 = '&limit_suggestions=20&lang=';
        const lang = this.language;
        const baseURL = `${url1}${genre}${url2}${titlesNumber}${url3}${lang}`;
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

*/