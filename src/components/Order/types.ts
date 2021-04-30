import {FC} from 'react';

type DeliveryAddress = {
    AddressLine1: string,
    AddressLine2: string,
    Description: string,
    City: string,
    Country: string,
    FullName: string,
    Phone: string,
    State: string,
    ZipCode: string
}

export type OrderType = {
    AssignedToId: null | string
    CommentsCount: number
    ContractorOrderNumber: null | number
    ContractorOrderTotalPrice: number
    CustomId: string
    DateCreated: string
    DateModified: string
    DatePaid: null
    DateReady: null
    DeliveryAddress: DeliveryAddress
    DeliveryPrice: number
    DiscountPrice: string
    DiscountTitle: string
    DownloadLink: string
    GoogleClientId: string
    Id: string
    LastDownloadedPaymentDocument: string | null
    ManagerId: null | number
    PaidPrice: number
    PaymentStatus: string
    PaymentSystemUniqueId: null | string
    PhotolabId: number
    PreviewImageUrl: string
    Price: number
    RenderStatus: string
    Shipping: {Id: number, Title: string, Phone: string, Email: string, Type: string}
    SourceOrderId: number
    Status: string
    Title: string
    TotalPrice: number
    TrackingNumber: null | number
    TrackingUrl: string | null
    UserCompanyAccountId: number | null
    UserId: number
}

type OwnProps = {
    dateCreated: string,
    address: string,
    phone: string,
    price: number,
    discount: string,
    title: string,
};

export type Props = FC<OwnProps>;