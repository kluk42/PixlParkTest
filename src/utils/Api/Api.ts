import { GetOrdersResponse, GetTokenResponse, LocalStorageKeys } from "./types";

class Api {
    private readonly requestToken: string;
    private refreshToken: string;
    private accesstoken: string;
    private readonly baseUrl: string;
    private readonly password: string;
    private readonly publicKey: string;

    constructor() {
        this.requestToken = 'f56252cf7eb248fcb8c98d8e3d472499';
        this.baseUrl = '';
        this.refreshToken = '';
        this.accesstoken = '';
        this.password = '7831CD5B9DEEE208EC4AF51E11B074B19B0C4CCD';
        this.publicKey = '38cd79b5f2b2486d86f562e3c43034f8';
    }

    private async getAccessToken() {
        try {
            const url = `${this.baseUrl}/oauth/accesstoken?oauth_token=${this.requestToken}&grant_type=api&username=${this.publicKey}&password=${this.password}`
            const response = await fetch(url);
            const responseParsed: GetTokenResponse = await response.json();
            if (responseParsed.RefreshToken && responseParsed.AccessToken) {
                this.refreshToken = responseParsed.RefreshToken;
                this.accesstoken = responseParsed.AccessToken;
            } else {
                throw new Error('Что-то не так с токенами');
            }
            const expirationDate = Date.now() + responseParsed.Expires*1000;
            localStorage.setItem(LocalStorageKeys.RefreshToken, this.refreshToken);
            localStorage.setItem(LocalStorageKeys.ExpirationTime, JSON.stringify(expirationDate));
            localStorage.setItem(LocalStorageKeys.AccessToken, this.accesstoken);
        }
        catch (err) {
            console.log(err);
        }
    }
    private async refreshAccessToken() {
        try {
            const url = `${this.baseUrl}/oauth/refreshtoken?refreshToken=${this.refreshToken}`;
            const response = await fetch(url);
            const responseParsed: GetTokenResponse = await response.json();
            if (responseParsed.RefreshToken) {
                this.refreshToken = responseParsed.RefreshToken;
            } else {
                this.getAccessToken();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    private async checkTokenValidity() {
        const refreshToken = localStorage.getItem(LocalStorageKeys.RefreshToken);
        const accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);
        if (refreshToken) {
            this.refreshToken = refreshToken;
        }
        if (!accessToken || !refreshToken) {
            this.getAccessToken();
        }
        const expirationTime = localStorage.getItem(LocalStorageKeys.ExpirationTime);
        if (!expirationTime || parseInt(expirationTime) - Date.now() < 2) {
            this.refreshAccessToken();
        }
    }
    public async init() {
        await this.getAccessToken();
    }
    public async getOrders(amount: number) {
        try {
            await this.checkTokenValidity();
            const url = `${this.baseUrl}/orders?oauth_token=${this.accesstoken}&take=${amount}`;
            const response = await fetch(url);
            const orders: GetOrdersResponse = await response.json();
            return orders.Result;
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default Api;