// import axios from 'axios';
// import { formatDistanceStrict } from 'date-fns';
// import getPrice from 'src/backend/apicalls';
// const URL=https://api.polygon.io/v1/open-close/XHB/2024-03-28?adjusted=true&apiKey=Kb59TQJUH0p_fe8Cd6sYz9LnwvapYHSh;
import { getMovingAvg, getPrice } from "./apicalls";

// import { getPrice } from "./apicalls";

const strat1 = () => {
    const tickerData = {
        "XHB": {
            currentPrice: 111.59,
            prices: [102.26, 96.18, 77.09, 79.25, 66.12] 
        },
        "XLB": {
            currentPrice: 92.89,
            prices: [87.56, 85.54, 78.68, 81.08, 79.37]
        },
        "XLY": {
            currentPrice: 183.89,
            prices: [184.41, 178.81, 160.98, 167.68, 145.65]
        },
        "XLI": {
            currentPrice: 125.96,
            prices: [121.00, 114.13, 101.92, 106.41, 97.80]
        },
        "XLE": {
            currentPrice: 94.41,
            prices: [85.72, 84.03, 90.39, 80.65, 82.26]
        },
        "XLK": {
            currentPrice: 208.27,
            prices: [206.98, 193.07, 163.37, 170.84, 148.88]
        },
        "XLU": {
            currentPrice: 65.65,
            prices: [62.08, 63.33, 58.93, 64.72, 67.20]
        },
        "XLP": {
            currentPrice: 76.36,
            prices: [74.45, 71.88, 69.01, 73.60, 74.11]
        },
        "XLF": {
            currentPrice: 42.12,
            prices: [40.36, 37.60, 33.48, 32.85, 31.80]
        },
        "XLC": {
            currentPrice: 81.66,
            prices: [78.66, 73.10, 65.94, 64.78, 56.88]
        },
        "XLRE": {
            currentPrice: 39.53,
            prices: [38.80, 40.50, 33.95, 37.16, 36.58]
        }
    };

    const averageReturns = {};

    Object.keys(tickerData).forEach(tickerName => {
        const { currentPrice, prices } = tickerData[tickerName];
        let totalReturn = 0;

        prices.forEach(price => {
            const returnPercentage = (currentPrice - price) / price * 100;
            totalReturn += returnPercentage;
        });

        const averageReturn = totalReturn / prices.length;
        averageReturns[tickerName] = averageReturn;
    });

    const sortedTickerNames = Object.keys(averageReturns).sort((a, b) => averageReturns[b] - averageReturns[a]);
    console.log("Top 3 tickers with highest returns:", sortedTickerNames.slice(0, 3));
    return sortedTickerNames.slice(0,3);

    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const SPYCurrPrice=getPrice("SPY",getFormattedDate(new Date()));
    const SPYMovingAvg=getMovingAvg("SPY")
    
    //     // If SPY closes below its 10-month moving average, move the entire portfolio to cash
        if (SPYCurrPrice < SPYMovingAvg) {
            // movePortfolioToCash();
        }


};


export default strat1;






// // export default goLongTop3Sectors;




























































// const strat1 = () => {
//     // const tickerNames = ["XHB", "XLB", "XLE", "XLY", "XLK", "XLI", "XLU", "XLP", "XLF", "XLC", "XLRE"]
//     const tickerNames = ["XHB", "XLB", "XLE", "XLY", "XLK"]
    // function getFormattedDate(date) {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // }

//     function generateDates(monthsAgo) {
//         const today = new Date();
//         // const isoToday = today.toISOString();
//         const xMonthsAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000 * monthsAgo);
//         const formattedxMonthAgo = getFormattedDate(xMonthsAgo);
//         return formattedxMonthAgo;
//     }
//     const today = new Date();
//     // const dates = [generateDates(1), generateDates(3), generateDates(6), generateDates(9), generateDates(12)];
//     const dates=[generateDates(1)];
//     // console.log(dates);
//     const averageReturns = [];
//     tickerNames.forEach(tickerName => {
//         let totalReturn = 0;
//         const todayPrice = getPrice(tickerName, getFormattedDate(today));
//         dates.forEach(date => {
//             const apiCall=async() => {
//                 await getPrice(tickerName, date)
//                 .then(price => {
//                     const currentPrice = price;
//                     const returnPercentage = (currentPrice - todayPrice) / todayPrice;
//                     totalReturn += returnPercentage;
//                 })
//                 .catch(error => {
//                     console.log("Error fetching price for", tickerName, "and date", date, ":", error);
//                 });
//             }
//             apiCall();
//         });
//         const averageReturn = totalReturn / dates.length;
//         averageReturns[tickerName] = averageReturn;
//     });

//     const sortedTickerNames = tickerNames.sort((a, b) => averageReturns[a] - averageReturns[b]);
//     console.log("Sorted:",sortedTickerNames[0], sortedTickerNames[1], sortedTickerNames[2]);
// };
// export default strat1;