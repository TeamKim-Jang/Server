import axios from "axios";

class StockRepository {
  constructor() {
    this.apiURL = "https://openapi.koreainvestment.com:9443";
    this.accessToken = null;
  }

  async fetchAccessToken(appKey, appSecret) {
    const response = await axios.post(
      `${this.apiURL}/oauth2/tokenP`,
      {
        grant_type: "client_credentials",
        appkey: appKey,
        appsecret: appSecret,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data && response.data.access_token) {
      this.accessToken = response.data.access_token;
    } else {
      throw new Error("Failed to fetch access token");
    }
  }

  async getStockPrices(stockCode, startDate, endDate, periodType) {
    const params = {
      fid_cond_mrkt_div_code: "J", // 코스닥
      fid_input_iscd: stockCode,
      fid_input_date_1: startDate,
      fid_input_date_2: endDate,
      fid_period_div_code: periodType, // D: 일봉, W: 주봉, M: 월봉
      fid_org_adj_prc: "0",
    };
  
    console.log("Requesting stock data with params:", params);
  
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      appkey: process.env.APP_KEY,
      appsecret: process.env.APP_SECRET,
      tr_id: "FHKST01010400",
    };
  
    const response = await axios.get(
      `${this.apiURL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`,
      { headers, params }
    );
  
    return response.data.output.map((item) => ({
      date: item.stck_bsop_date,
      open: parseFloat(item.stck_oprc),
      high: parseFloat(item.stck_hgpr),
      low: parseFloat(item.stck_lwpr),
      close: parseFloat(item.stck_clpr),
    }));
  }  
}

export default new StockRepository();