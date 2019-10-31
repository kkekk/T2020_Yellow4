import {httpClient, httpClientServer} from './httpClient'


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

export async function getCustomerId(username){
    const response = await httpClient.get("/customers/" + username)
    return response
}

export async function getCustomerDetails(userId){
    const response = await httpClient.get("/customers/" + userId +"/details")
    return response
}

export async function getDashboardData(accountIds){
    var url = "/summary2?accountIds=" + accountIds[0]

    for (var i = 1; i < accountIds.length; i++){
        url = url + "&accountIds=" + accountIds[i]
    }

    const response = await httpClientServer.get(url)
    return response
}

