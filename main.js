
/* 
    1. fetched data and display it on the window 
    2. target referes to the class of the element where the data is going to be appended eg: '.trading-gallery'
    3. genre refers to the genre to be fetched or the trending section
*/
class Fetcher{
    constructor(target ,genre){
        this.gallery = document.querySelector(target);
        this.genre = genre;
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
            myDivision.classList.add('trending-item');
            const innerDivClass = "trending-item";
            const mostInnerDivClass = "trending-item-description";
            myDivision.innerHTML = `
                <div class=${innerDivClass} >
                    <a href="#" alt="">
                        <img src="${title.jawSummary.backgroundImage.url}" alt="">
                        <div class=${mostInnerDivClass} >
                            <span>${title.jawSummary.releaseYear} ${title.summary.type}</span>
                            <h4>${title.jawSummary.title}</h4>
                        </div>
                    </a>
                </div>
            `;
            this.gallery.appendChild(myDivision)
        });
    }
    async displayResults(){
        const url1 = 'https://netflix54.p.rapidapi.com/search/?query=';
        const url2= '&offset=0&limit_titles=8&limit_suggestions=20&lang=en';
        const genre = this.genre;
        const baseURL = `${url1}${genre}${url2}`;
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

const trendingGallery = new Fetcher('.trending-gallery', 'trending');

/*
'https://netflix54.p.rapidapi.com/search/?query=trending&offset=0&limit_titles=8&limit_suggestions=20&lang=en'
*/