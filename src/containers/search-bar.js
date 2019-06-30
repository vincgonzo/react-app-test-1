import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCountries, fetchRateExchange } from '../actions/index' 
const lodash = require("lodash");

export class SearchBar extends Component {
    componentWillMount(){
        this.props.fetchCountries();
    }
    renderSelectCountries(){
        return (
            <select
            onChange={e => this.onChangeCountry(e)}
            className="form-control search_bar"
            >
            { 
            this.props.countries.map((c => {
                return (
                    <option key={c.code} value={c.code}>
                        {c.name}
                    </option>
                );
            }
            )) 
            }
            </select>
        )
    }
    onChangeCountry = e => {
        const countryCode = e.target.value;
        const country = lodash.find(this.props.countries, { code: countryCode });
        this.props.fetchRateExchange(country);
      };
    render() {
        return (
            <form>
                { this.renderSelectCountries() }
            </form>
        )
    }
}

const mapsStateToProps = (store) => {
    return {
        countries: store.countryReducer.countries
    }
}
const mapDispatchToProps = {
    fetchCountries,
    fetchRateExchange
}
export default connect(mapsStateToProps, mapDispatchToProps)(SearchBar)