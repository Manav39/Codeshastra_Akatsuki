import axios from "axios";
import { values } from "lodash";

const getPrice = (tickerName, date)=>{
    const apiURL=`https://api.polygon.io/v1/open-close/${tickerName}/${date}?adjusted=true&apiKey=Kb59TQJUH0p_fe8Cd6sYz9LnwvapYHSh`
    let closePrice;
    axios.get(apiURL)
    .then(response =>{
        closePrice=response.data.close;
        console.log("Response", response.data);
    })
    .catch(error => {
        console.log("Error", error);
    });
    return closePrice;
}
// export default getPrice;

const getMovingAvg = async (assetName) => {
    const apiURL = `https://api.polygon.io/v1/indicators/sma/${assetName}?timespan=month&adjusted=true&window=10&series_type=close&order=desc&apiKey=Kb59TQJUH0p_fe8Cd6sYz9LnwvapYHSh`;
    try {
        const response = await axios.get(apiURL);
        const movingAvg= response.data.results.values[0].value;
        // console.log("API Call for Moving Average of index: ", assetName);
        return movingAvg;
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
};
const getDailyReturns = async (tickerName) => {
    const apiURL= `https://api.polygon.io/v2/aggs/ticker/${tickerName}/range/1/day/2023-03-28/2024-03-28?adjusted=true&sort=asc&limit=365&apiKey=Kb59TQJUH0p_fe8Cd6sYz9LnwvapYHSh`
    try{
        const response = await axios.get(apiURL);
        const resultsArr= response.data.results;
        return resultsArr;
    }
    catch(error){
        console.log("Error", error);
        throw error;
    }
};

const getStockMovingAvg = () => {
    const apiURL=``;
}


export {getPrice,getMovingAvg,getDailyReturns};



// const getMovingAvg = async (assetName) => {
//     const apiURL = `https://api.polygon.io/v1/indicators/sma/${assetName}?timespan=month&adjusted=true&window=10&series_type=close&order=desc&apiKey=Kb59TQJUH0p_fe8Cd6sYz9LnwvapYHSh`;
//     try {
//         const response = await axios.get(apiURL);
//         const movingAvgArr = response.data.results.values;
//         // console.log("API Call for Moving Average of index: ", assetName);
//         let sum = 0;
//         movingAvgArr.forEach(item => {
//             sum += item.value;
//         });
//         sum /= movingAvgArr.length;
//         return sum;
//     } catch (error) {
//         console.log("Error", error);
//         throw error;
//     }
// };