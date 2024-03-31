import { getMovingAvg } from "./apicalls";

const strat2 = async() => {
const assetAllocations = {
    "SPY": {
        slice: 0.05,
        currPrice: 523.07
    },
    "MTUM": {
        slice: 0.10,
        currPrice: 187.35
    },
    "IWN": {
        slice: 0.05,
        currPrice: 158.81
    },
    "EFA": {
        slice: 0.10,
        currPrice: 79.86
    },
    "EEM": {
        slice: 0.10,
        currPrice: 41.08
    },
    "IEF": {
        slice: 0.05,
        currPrice: 94.66
    },
    "BWX": {
        slice: 0.05,
        currPrice: 22.24
    },
    "LQD": {
        slice: 0.05,
        currPrice: 108.92
    },
    "TLT": {
        slice: 0.05,
        currPrice: 94.62
    },
    "DBC": {
        slice: 0.10,
        currPrice: 22.97
    },
    "GLD": {
        slice: 0.10,
        currPrice: 205.72
    },
    "VNQ": {
        slice: 0.20,
        currPrice: 86.48
    }
};

const assetNames = Object.keys(assetAllocations);
    for (let i = 0; i < assetNames.length; i+=1) {
        const assetName = assetNames[i];
        try {
            // eslint-disable-next-line no-await-in-loop
            const movingAvg = await getMovingAvg(assetName);
            console.log("Moving average for", assetName, "is", movingAvg);
            // if(movingAvg > assetName.currPrice){
            //     movePortfolioToCash();
            // }
        } catch (error) {
            console.log("Error", error);
        }
        // eslint-disable-next-line no-await-in-loop
        await delay(30000); // Delay of 30 seconds (30000 milliseconds)
    }
};


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default strat2;
