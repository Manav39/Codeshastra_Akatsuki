const CAGRCalculator= () => {
    const calculateCAGR = (initialValue, finalValue, numberOfYears) => {
            const cagr = ((finalValue / initialValue)**( 1 / numberOfYears)) - 1;
            console.log("CAGR:", cagr);
    };
    // Assuming initial and final values are fetched from the user's portfolio
    const initialValue = 1000000; // Initial value from the portfolio
    const finalValue = 130000; // Final value from the portfolio
    let numberOfYears=0;
    numberOfYears=1; // Initial taken value, will be changed upon user input
    const finalcagr = calculateCAGR(initialValue, finalValue, numberOfYears);
    console.log(finalcagr);
}

export default CAGRCalculator;



//     const handleNumberOfYearsChange = (e) => {
//         setNumberOfYears(parseInt(e.target.value));
//     };


//     return (
//         <div>
//             <label>
//                 Number of Years:
//                 <select value={numberOfYears} onChange={handleNumberOfYearsChange}>
//                     <option value="1">1 year</option>
//                     <option value="2">2 years</option>
//                     <option value="5">5 years</option>
//                     <option value="10">10 years</option>
//                 </select>
//             </label>
//             <br />
//             <button onClick={() => calculateCAGR(initialValue, finalValue, numberOfYears)}>Calculate CAGR</button>
//         </div>
//     );
// }