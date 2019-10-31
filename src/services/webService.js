import {httpClient} from './httpClient'


export async function testGet() {
    const response = await httpClient.get("/test")
    return response
}

export async function getDepositAccounts(customerId){
    const response = await httpClient.get("accounts/deposit/" + customerId)
    return response
}

export async function getCreditAccounts(customerId){
    const response = await httpClient.get("accounts/credit/" + customerId)
    return response
}

export async function getDepositAccountBalance(accountId){
    const response = await httpClient.get("/accounts/deposit/" + accountId + "/balance" )
    return response
}

export async function getCreditAccountBalance(accountId){
    const response = await httpClient.get("/accounts/credit/" + accountId + "/balance" )
    return response
}

export async function getTransactions(accountId, startDate, endDate){
    const response = await httpClient.get("/transactions/" + accountId + "?from=" + startDate + "&to="+ endDate )
    return response
}

