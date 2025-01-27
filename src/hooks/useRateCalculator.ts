export interface Rate {
    index: number;
    type: string;
    minimum: string;
    maximum: string;
    chargeType: string; // '%' or '$'
    feeType: string; // '%' or '$'
    charge: number;
    fee: number;
}

export interface RateCalculationResult {
    initialAmount: number;
    minimum: number;
    maximum: number;
    fee: number;
    charge: number;
    amount: number;
    chargeType: string;
    feeType: string;
    serviceCharge: number;
    netAmount: number;
    currencyRate: number;
    CombinedCharge: string;
}

// Define a global function calculateRate
export const calculateRate = (rates: Rate[], type: string, initialAmount: number, currencyRate: number = 1, formatDigit: number = 2): RateCalculationResult => {
    // Utility function for consistent rounding
    const round = (value: number) => Number(value.toFixed(formatDigit));

    // Round the initial amount
    const amount = round(initialAmount);
    // console.log("rates", rates);

    // Filter rates based on type and amount range
    const applicableRates = rates.filter((row) => row.type === type && amount >= Number(row.minimum) && amount <= Number(row.maximum));

    if (applicableRates.length === 0) {
        console.log(`Initial amount ${initialAmount} of type "${type}" is outside the acceptable range.`);
    }

    // Use the first applicable rate
    const rate = applicableRates[0];

    // Parse and validate rate properties
    const minimum = Number(rate?.minimum);
    const maximum = Number(rate?.maximum);
    const chargeType = rate?.chargeType || "$";
    const feeType = rate?.feeType || "$";

    const charge = chargeType === "$" ? round(rate.charge) : round((rate.charge / 100) * amount);

    const fee = feeType === "$" ? round(rate.fee) : round((rate.fee / 100) * amount);

    const serviceCharge = round(charge + fee);

    const CombinedCharge = (Number(applicableRates[0].charge) + Number(applicableRates[0].fee)).toFixed(formatDigit);

    // Calculate netAmount using the updated formula
    const netAmount = round(amount * Number(currencyRate) - Number(serviceCharge));

    return {
        initialAmount: amount,
        minimum,
        maximum,
        fee,
        amount,
        charge,
        chargeType,
        feeType,
        serviceCharge,
        netAmount,
        currencyRate,
        CombinedCharge: CombinedCharge.toString(),
    };
};
