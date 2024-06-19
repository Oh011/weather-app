




var city="";


async function get(){

    await get_location();
    await get_weather(city);
}


window.onload=get()


async function get_location(){

    var x= await fetch("https://ipapi.co/json/");


    var message= await x.json();


    city=message.city;
    city.toLowerCase()
    city.trim()


}



var arr=[]


function convertWindDirectionShortToFull(shortDirection) {
    const directionMap = {
        "N": "North",
        "NNE": "North-Northeast",
        "NE": "Northeast",
        "ENE": "East-Northeast",
        "E": "East",
        "ESE": "East-Southeast",
        "SE": "Southeast",
        "SSE": "South-Southeast",
        "S": "South",
        "SSW": "South-Southwest",
        "SW": "Southwest",
        "WSW": "West-Southwest",
        "W": "West",
        "WNW": "West-Northwest",
        "NW": "Northwest",
        "NNW": "North-Northwest"
    };

    return directionMap[shortDirection.toUpperCase()] || "Invalid direction";
}

async function get_weather(search){



    try{

        

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a6d787d08dd04d32840182653241106&q=${search}&days=3`)
    
        const message= await response.json();

        
        if(message.error==null){
            
            arr=message

            console.log(arr)
         
            diaplay(arr);
        }

    
    
    }

    catch(err){
        console.log(err)
    }


}


const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function diaplay(arr){



    for(var i=0 ; i<3 ; ++i){


        if(i==0){

            let date=new Date(arr.location.localtime)
                
              
                let day = weekday[date.getDay()];
                let this_month=month[date.getMonth()];
                let this_day=date.getDate();

                document.querySelector("#current .forecast-header .day").innerHTML=day
                document.querySelector("#current .forecast-header .date").innerHTML=this_day+" "+this_month
                document.querySelector("#current .forecast-content .location").innerHTML=arr.location.name
                document.querySelector("#current .forecast-content .degree .num").innerHTML=arr.current.temp_c+`<sup>o</sup>C`
                document.querySelector("#forecast-icon-current").src="https:"+arr.current.condition.icon
                document.querySelector("#current .custom").innerHTML=arr.current.condition.text
                document.querySelector(".wind_kph").innerHTML=arr.current.wind_kph
                document.querySelector(".wind_dir").innerHTML=convertWindDirectionShortToFull(arr.current.wind_dir)
                

        }


        else if(i==1){

            let date=new Date(arr.forecast.forecastday[1].date)
                
           
            let day = weekday[date.getDay()];
   
            document.querySelector("#second-day .day").innerHTML=day
            document.querySelector("#second-day .max_degree").innerHTML=arr.forecast.forecastday[1].day.maxtemp_c+`<sup>o</sup>C`
            document.querySelector('#second-day .min_degree').innerHTML=arr.forecast.forecastday[1].day.mintemp_c+`<sup>o</sup>C`
            document.querySelector("#forecast-icon-second").src="https:"+arr.forecast.forecastday[1].day.condition.icon
            document.querySelector("#second-day .custom").innerHTML=arr.forecast.forecastday[1].day.condition.text

        }

        else{


            
            let date=new Date(arr.forecast.forecastday[2].date)
                
           
            let day = weekday[date.getDay()];

            document.querySelector("#third-day .day").innerHTML=day
            document.querySelector("#third-day .max_degree").innerHTML=arr.forecast.forecastday[2].day.maxtemp_c+`<sup>o</sup>C`
            document.querySelector('#third-day .min_degree').innerHTML=arr.forecast.forecastday[2].day.mintemp_c+`<sup>o</sup>C`
            document.querySelector("#forecast-icon-third").src="https:"+arr.forecast.forecastday[2].day.condition.icon
            document.querySelector("#third-day .custom").innerHTML=arr.forecast.forecastday[2].day.condition.text


        }
    }




    


}


async function main(val){

   
    get_weather(val);
  
}




let search_input=document.getElementById("search")

search_input.oninput=function(){



    let val=this.value
    main(val)
    

}


