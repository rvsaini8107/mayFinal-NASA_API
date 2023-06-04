var url = `https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=`;
getCurrentImageOfTheDay();
//  fetch the data for the current date
function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().split("T")[0];
    
    var playWithData = fetchData(url,currentDate)//play with waiting  
    playWithData.then(responseData=>responseData.json())
    .then(data=>{
        
        displayMethod(data,"NASA Picture Of The Day")
        addSearchToHistory(getDataLocalStorage);
        document.getElementById("input-date").setAttribute("max",currentDate)
    })
    .catch(error=>console.log("data not Found Error"));
    
}



// display method
function displayMethod(data,heading){
    // console.log(data,"this data run")
    const cardDiv = document.getElementById("card-image-data")
    const div = `
    <div class="content">
        <h3>${heading} </h3> 
        <img src="${data.url}" alt="" class="image" id="image">
        <h3>${data.title} </h3> 
        <p>${data.explanation}</p>
    </div>`
    cardDiv.innerHTML=div;

}


// fetching method 
async function fetchData(url,date){
    url=url+date;
    var run = await fetch(url)
    
    return run;
}


// fetch the data for the selected date

function getImageOfTheDay(event){
    event.preventDefault(); //page not refresh 

    const inputDate = document.getElementById("input-date").value;
    var playWithData = fetchData(url,inputDate)//play with waiting  
    playWithData.then(responseData=>responseData.json())
    .then(data=>{
        
        displayMethod(data,`Picture On ${data.date}`)
        // save date in localStorage
        let dateThis = {
            "date":data.date
        }
         saveSearch(dateThis);
         
    })
    .catch(error=>console.log("This date No Data Found"));

}
function saveSearch(setDateVal){
    //  save in localStorage
     var arr = [];
    if(!localStorage.getItem("searches")){
        
        arr.push(setDateVal)
        
        setDataLocalStorage(arr)
    }else{
       
        arr.push(...JSON.parse(localStorage.getItem("searches")));
        arr.push(setDateVal)
        
        setDataLocalStorage(arr);
    }
    addSearchToHistory(getDataLocalStorage);
}

function setDataLocalStorage(arr){
    localStorage.setItem("searches",JSON.stringify(arr)); 
}
function getDataLocalStorage(){
    return JSON.parse(localStorage.getItem("searches")) 
}

function addSearchToHistory(localStorageData){
    console.log(localStorageData())
    let val = localStorageData();
    const showLinkDiv = document.getElementById("showLink");
    showLinkDiv.innerHTML="";
    console.log(val[0])
    val.forEach(element => {
        const div = `<li onclick="showThatDate('${element.date}')">${element.date}</li>`
        showLinkDiv.innerHTML +=div;

    });
    
}
function showThatDate(date){
    var playWithData = fetchData(url,date)//play with waiting  
    playWithData.then(responseData=>responseData.json())
    .then(data=>{
        
        displayMethod(data,`Picture On ${data.date}`)
        // save date in localStorage
        let dateThis = {
            "date":data.date
        }
        
         
    })
    .catch(error=>console.log("This date No Data Found Now"));
}

