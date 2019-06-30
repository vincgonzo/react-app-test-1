import { GET_COUNTRIES } from '../actions'
import { supportedCurrencyCode } from '../supportedCurrencies';

const initialState = {
    countries: []
}
export default function(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: getCountriesData(action.payload)
            }
        default:
            break;
    }
    return state;
}

function getCountriesData(data){
    return data.map((c => {
        return {
            name: c.name,
            currencyCode: c.currencies[0].code,
            flag: c.flag,
            code: c.alpha3Code
        }
    })).filter(c => {
        return supportedCurrencyCode.indexOf(c.currencyCode) > -1;
    })
}