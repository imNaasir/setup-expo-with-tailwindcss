import { RequestBodyType } from "@/helpers/constants/type";
import axios from "@/helpers/lib/axios";
import { create } from "zustand";
// import useAuthStore from "./useAuthUserStore";
import { authorizationHeader } from "@/helpers/utils/requestHeader";
import useAuthStore from "./auth/useAuthStore";
// import useAuthStore from "../useAuthStore";

export interface CurrencyProps {
  id: number;
  img: string;
  name: string;
  abbreviation: string;
  type: string;
  rates: Rate[];
  decimalPoints: string;
  methods: Method[];
  balance: string;
  frozen: string;
  screwed: string;
  commissions: Commission[];
  tax: Tax[];
  exchangeRate: number;
}

export interface Rate {
  checkbox: boolean;
  index: number;
  type: string;
  minimum: string;
  maximum: string;
  chargeType: string; // '%' or '$'
  feeType: string; // '%' or '$'
  charge: number;
  fee: number;
}

export interface Method {
  icon: string;
  name: string;
  id: number;
  prefix: string;
  abbreviation: string;
  guardType: string;
  guard: string;
  support: string;
  provider: string;
  tokenId: string;
}

export interface Commission {
  rate: string;
  type: string;
  index: number;
  maximum: string;
  minimum: string;
  currency: string;
  rateType: string;
}

export interface Tax {
  type: string;
  index: number;
  charge: string;
  method: string;
  feeType: string;
  maximum: string;
  minimum: string;
  currency: string;
  ChargeType: string;
}

export type CurrencyPriceProps = {
  abbreviation?: string;
  name?: string;
  image?: string;
  current_price?: string;
  price_change_24h?: string;
  price_change_percentage_24h?: string;
  change_percentage?: string;
};

export interface HistoricalData {
  time: string; // ISO Date string or timestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PriceInfo {
  symbol: string;
  price: number;
  priceChangePercentage24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}
interface Metadata {
  name: string;
  description: string;
  logo: string;
  category: string;
  tags: string[];
  urls: {
    website: string[];
    twitter: string[];
    explorer: string[];
  };
}

type CurrenciesState = {
  currencies: CurrencyProps[];
  currenciesPrice: CurrencyPriceProps[];
  historicalData: HistoricalData[]; // Updated type here
  priceInfo: PriceInfo | null; // Updated type here (can be null if not loaded yet)
  metadata: Metadata | null;
  fiatCurrencies: CurrencyProps[];
  currencyRate: { amount: number; rate: number };
  isCurrencyLoaded: boolean;
  setCurrencies: (data: CurrencyProps[]) => void;
  getCryptoCurrencies: () => CurrencyProps[];
  getFiatCurrencies: () => CurrencyProps[];
  loadCurrencies: (
    request: RequestBodyType<any>,
    token: string
  ) => Promise<void>;
  loadCurrenciesRate: (value: RequestBodyType<any>) => void;
  loadCurrenciesPrice: (value: RequestBodyType<any>) => void;
  chartInfo: (
    param: { id?: string; slug?: string; symbol?: string },
    request: RequestBodyType<any>
  ) => void; // Corrected signature
  loadCurrencyById: (value: RequestBodyType<any>) => void;
  getCurrencyRate: (value: RequestBodyType<any>) => void;
  setFiatCurrencies: (data: CurrencyProps[]) => void;
  getCurrencyByFiat: (value: RequestBodyType<any>) => void;
  getCharges: (value: RequestBodyType<any>) => void;
};

const useCurrenciesStore = create<CurrenciesState>((set, get) => ({
  currencies: [],
  currenciesPrice: [],
  priceInfo: null,
  metadata: null,
  historicalData: [],
  fiatCurrencies: [],
  isCurrencyLoaded: false,
  currencyRate: { amount: 0, rate: 0 },
  setCurrencies: (value) => set({ currencies: value }),
  setFiatCurrencies: (value) => set({ fiatCurrencies: value }),
  getCryptoCurrencies: () =>
    get().currencies.filter((currency) => currency.type === "crypto"),
  getFiatCurrencies: () =>
    get().currencies.filter((currency) => currency.type === "fiat"),
  getMethods: (type?: "crypto" | "fiat") =>
    get()
      .currencies.filter((currency) => !type || currency.type === type)
      .flatMap((currency) => currency.methods || []),

  chartInfo: async (
    param: { id?: string; slug?: string; symbol?: string },
    request: RequestBodyType<any>
  ) => {
    const token = useAuthStore.getState().token;
    set({ isCurrencyLoaded: false }); // Set loading state to true before fetching

    // Construct query parameters based on available parameter (id, slug, or symbol)
    const queryParams: any = {};
    if (param.id) queryParams.id = param.id;
    if (param.slug) queryParams.slug = param.slug;
    if (param.symbol) queryParams.symbol = param.symbol;

    try {
      const res = await axios.get("price-info", {
        params: queryParams,
        headers: { ...authorizationHeader(token as string) },
      });

      const { historicalData, priceInfo, metadata } = res?.data;

      // Optional: Process or format data here
      const formattedHistoricalData = historicalData.map((data: any) => ({
        ...data,
        time: new Date(data.time).toLocaleString(), // Format the timestamp
      }));

      set({
        historicalData: formattedHistoricalData,
        priceInfo: priceInfo,
        metadata: metadata, // Store metadata in the state
        isCurrencyLoaded: true, // Set loading state to false once done
      });

      request.success?.(res.data);
    } catch (err: any) {
      set({ isCurrencyLoaded: true }); // Set loading state to false on error
      request.error?.(err.response.data);
      console.log(err.response.data);
    }
  },

  // loadCurrencies: async (request: RequestBodyType<any>) => {
  //     set({ isCurrencyLoaded: false }); // Indicate loading
  //     console.log("loading currencies from ");
  //     try {
  //         const { token } = useAuthStore((state) => state);
  //         const response = await axios.get(`wallet/currency/list`, {
  //             headers: { ...authorizationHeader(token as string) },
  //         });
  //         set({ currencies: response.data, isCurrencyLoaded: true });
  //         request.success?.(response.data);
  //     } catch (error: any) {
  //         set({ isCurrencyLoaded: true }); // End loading on error as well
  //         request.error?.(error.response?.data || error.message);
  //     }
  // },

  loadCurrencies: async (request: RequestBodyType<any>, token: string) => {
    set({ isCurrencyLoaded: false }); // Indicate loading
    console.log("loading currencies...");
    try {
      const response = await axios.get(`wallet/currency/list`, {
        headers: { ...authorizationHeader(token) },
      });
      set({ currencies: response.data, isCurrencyLoaded: true });
      request.success?.(response.data);
    } catch (error: any) {
      set({ isCurrencyLoaded: true }); // End loading on error as well
      request.error?.(error.response?.data || error.message);
    }
  },

  loadCurrenciesRate: async (
    request: RequestBodyType<{ type: string; from: string; to: string }>
  ) => {
    if (!request?.data) throw new Error("Missing required data.");
    const { type, from, to } = request.data;
    console.log(`sending coin rate request from ${from} to ${to} `);
    try {
      const response = await axios.get(`currencies/currency/currency-rates`, {
        params: { type, from, to },
        timeout: 10000, // 10 seconds timeout
      });
      request.success?.(response.data);
    } catch (error: any) {
      let errorMessage = "An error occurred";

      if (error.code === "ECONNABORTED") errorMessage = "Request timed out.";
      else if (error.response)
        errorMessage =
          error.response.data || `Server error: ${error.response.status}`;
      else if (error.request) errorMessage = "No response from the server.";
      else errorMessage = error.message;

      // console.error("Error: currency rates", errorMessage);
      request.error?.(errorMessage);
    }
  },

  loadCurrenciesPrice: async (request: RequestBodyType<any>) => {
    const token = useAuthStore.getState().token;
    axios
      .get(`currencies/currency/coin-list`, {
        headers: { ...authorizationHeader(token as string) },
      })
      .then((res) => {
        // console.log("=============coin-list=======================");
        // console.log(res.data);
        // console.log("====================================");
        set({ currenciesPrice: res.data });
        request.success?.(res.data);
      })
      .catch((err) => {
        request.error?.(err.response.data);
        console.log(err.response.data);
      });
  },

  loadCurrencyById: async (request: RequestBodyType<any>) => {
    const token = useAuthStore.getState().token;
    const { currencies } = get();
    axios
      .get(`wallet/currency/${request.param}`, {
        headers: { ...authorizationHeader(token as string) },
      })
      .then((res) => {
        set({
          currencies: currencies.map((currency) =>
            currency.id === request.param ? res.data : currency
          ),
        });
        request.success?.(res);
      })
      .catch((err) => "");
  },

  getCurrencyRate: async (request: RequestBodyType<any>) => {
    const token = useAuthStore.getState().token;
    axios
      .post(`wallet/currencies/currency-rate`, request.data, {
        headers: { ...authorizationHeader(token as string) },
      })
      .then((res) => {
        set({ currencyRate: res.data });
        request.success?.(res.data);
      })
      .catch((err) => {
        request.error?.(err.response.data);
      });
  },

  getCurrencyByFiat: async (request: RequestBodyType<any>) => {
    const token = useAuthStore.getState().token;
    axios
      .get(`wallet/currency/list-currency-fiat`, {
        headers: { ...authorizationHeader(token as string) },
      })
      .then((res) => {
        // set({ allFiatCurrencies: res.data });

        request.success?.(res.data);
      })
      .catch((err) => {
        request.error?.(err.response.data);
      });
  },

  getCharges: async (request: RequestBodyType<any>) => {
    const token = useAuthStore.getState().token;

    axios
      .post(`wallet/transactions/charges`, request?.data, {
        headers: { ...authorizationHeader(token as string) },
      })
      .then((res) => {
        request.success?.(res?.data);
      })
      .catch((err) => {
        request.error?.(err.response.data);
      });
  },
}));

export default useCurrenciesStore;
