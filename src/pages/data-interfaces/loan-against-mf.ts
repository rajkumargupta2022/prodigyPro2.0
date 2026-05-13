export interface GeoCoordinates {
    latitude: number;
    longitude: number;
}

export interface EligibilityResponse {
    success: boolean;
    data: {
        url: string;
    };
    msg: string;
    
}
