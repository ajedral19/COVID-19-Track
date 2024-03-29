import axios from 'axios'; // to make api request

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country){
        changeableUrl =`${url}/countries/${country}`
    }


    try{
        // const response = await axios.get(url);
        // const { data } = await axios.get(url);

        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate,
        // }
        // return modifiedData;


        //destructuring data------------

        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

        // const modifiedData = { confirmed, recovered, deaths, lastUpdate, }

        return { confirmed, recovered, deaths, lastUpdate, };
    }catch(error){
        console.log(error);
        
    }
}

export const fetchDailyData = async () => {
    try{
        const { data } = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;        
    }catch(error){

    }
}

export const fetchCountries = async () => {
    try{
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map(country => country.name)
        
    }catch(error){
        console.log(error);
        
    }
}