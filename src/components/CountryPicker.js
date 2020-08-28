import React, { Component } from "react";
import M from "materialize-css";
import Axios from "axios";

export class CountryPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { countries: [] };
    }

    componentDidMount() {
        Axios.get("https://covid19.mathdro.id/api/countries")
            .then((data) => this.setState({ countries: data.data.countries }))
            .then(M.FormSelect.init(document.querySelector(".select")));
    }
    render() {
        const options = this.state.countries.map((country) => (
            <option value={country.iso3}>{country.name}</option>
        ));
        return (
            <div className="select-container">
                <h6>Select your country</h6>
                <select className="select input-field browser-default">
                    {options}
                </select>
            </div>
        );
    }
}

export default CountryPicker;
