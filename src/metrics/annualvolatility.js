import { getDailyReturns } from "src/backend/apicalls";
import { usePort } from "src/context";

const portfolio=["AAPL","AMZN",",MSFT","NVDA","GOOG"];
// let volatile=[];
const annualVolatility = () => {
    // const {setVolatile} = usePort()
    let closings;
    portfolio.forEach(tickerName =>{
        closings= getDailyReturns(tickerName)

        function calculateAnnualizedVolatility(closingPrices) {
            // Calculate daily returns
            const dailyReturns = [];
            for (let i = 1; i < closingPrices.length; i+=1) {
                const todayPrice = closingPrices[i];
                const yesterdayPrice = closingPrices[i - 1];
                const dailyReturn = (todayPrice - yesterdayPrice) / yesterdayPrice;
                dailyReturns.push(dailyReturn);
            }
        
            // Calculate standard deviation of daily returns
            const averageReturn = dailyReturns.reduce((acc, val) => acc + val, 0) / dailyReturns.length;
            const squaredDifferences = dailyReturns.map((returnVal) => (returnVal - averageReturn)**2);
            const sumSquaredDifferences = squaredDifferences.reduce((acc, val) => acc + val, 0);
            const variance = sumSquaredDifferences / dailyReturns.length;
            const standardDeviation = Math.sqrt(variance);
        
            // Annualize the standard deviation
            const tradingDaysPerYear = closingPrices.length;
            const annualizedVolatility = standardDeviation * Math.sqrt(tradingDaysPerYear);
        
            return annualizedVolatility;
        }
        const annualizedVolatility = calculateAnnualizedVolatility(closings);
        console.log("Annualized Volatility:", annualizedVolatility);
        // volatile.push(annualizedVolatility);
    });
};
export default annualVolatility;