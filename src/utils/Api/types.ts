import { OrderType } from "../../components/Order/types"

export type GetTokenResponse = {
    AccessToken: string,
    Error: null | number,
    Expires: number,
    RefreshToken: string | null,
    RequestToken: null | string,
    RequireSsl: boolean,
    Scope: null | string,
    Success: boolean,
}

export type GetOrdersResponse = {
    ApiVersion: string
    ResponseCode: number
    Result: OrderType[]
}

export enum LocalStorageKeys {
    RefreshToken = 'refreshToken',
    ExpirationTime = 'expirationTime',
    AccessToken = 'AccessToken',
}