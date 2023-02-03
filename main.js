
/* 
    1. fetched data and display it on the window 
    2. target referes to the class of the element where the data is going to be appended eg: '.trading-gallery'
    3. genre refers to the genre to be fetched or the trending section
    4. titlesNum refers to the number of titles to fetch from the API
    5. classList refers to the class added to the created div in the forEach method inside the generateHTML() eg: 'trending-item'
    6. mostInnerDivClass refers to the div class inside  each classList item (5. see above) that has the span and h4 elements as childs eg: 'trending-item-description'
*/
class Fetcher{
    constructor(target ,genre, titlesNum, language, classList, mostInnerDivClass){
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
        document.addEventListener('DOMContentLoaded', () => {
            this.displayResults()
        })
    }
}

const trendingGallery = new Fetcher('.trending-gallery', 'trending', '8', 'en', 'trending-item', 'trending-item-description');

const recommendedGallery = new Fetcher('.recommended-gallery', 'recommended', '20', 'en', 'recommended-item', 'recommended-item-description');

/*
'https://netflix54.p.rapidapi.com/search/?query=trending&offset=0&limit_titles=8&limit_suggestions=20&lang=en'
*/