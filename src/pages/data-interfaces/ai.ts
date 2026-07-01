export interface aiChatResponse {
    intent: string,
    params: investKeys,
    message: string
}

export interface investKeys {
    scheme_name?: string,
    amount?: number,
    transaction_type?: string,
    sip_date?: number,
    folio?: string,
    mandate?: string
}
export interface AiInsightResponse {
    insight: string,
}
