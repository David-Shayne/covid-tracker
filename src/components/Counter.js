import React, { Component } from "react";
import "../css/Counter.css";
import Axios from "axios";
import M from "materialize-css";

export class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recovered: 0,
            deaths: 0,
            infected: 0,
            countries: [],
            selected: "",
        };

        this.changeOption = this.changeOption.bind(this);
        this.calcPercent = this.calcPercent.bind(this);
    }

    calcPercent(value) {
        const total =
            this.state.infected + this.state.recovered + this.state.deaths;
        const percent = Math.floor((value / total) * 100);
        return `${percent}%`;
    }

    changeOption(e) {
        this.setState(
            { selected: e.target.value },
            console.log(this.state.selected)
        );

        Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
            .then((data) => data.data.confirmed.value)
            .then((value) => this.setState({ infected: value }));
        Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
            .then((data) => data.data.recovered.value)
            .then((value) => this.setState({ recovered: value }));
        Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
            .then((data) => data.data.deaths.value)
            .then((value) => this.setState({ deaths: value }));
    }
    formatValue = (value) => value.toFixed(0);
    componentDidMount() {
        Axios.get("https://covid19.mathdro.id/api")
            .then((res) => res.data.confirmed.value)
            .then((value) => this.setState({ infected: value }));
        Axios.get("https://covid19.mathdro.id/api")
            .then((res) => res.data.recovered.value)
            .then((value) => this.setState({ recovered: value }));
        Axios.get("https://covid19.mathdro.id/api")
            .then((res) => res.data.deaths.value)
            .then((value) => this.setState({ deaths: value }));
        Axios.get("https://covid19.mathdro.id/api/countries")
            .then((res) => this.setState({ countries: res.data.countries }))
            .then(M.FormSelect.init(document.querySelector(".select")));
    }
    render() {
        const devisible = this.state.infected / 222;
        const options = this.state.countries.map((country) => (
            <option value={country.name}>{country.name}</option>
        ));
        const recoveredStyle = {
            height: `${this.state.recovered / devisible}px`,
        };
        const infectedStyle = {
            height: `${this.state.infected / devisible}px`,
        };
        const deathsStyle = {
            height: `${this.state.deaths / devisible}px`,
        };

        return (
            <div className="">
                <div className="select-container">
                    <h6>Select your country</h6>
                    <select
                        className="select input-field browser-default"
                        onChange={(e) => this.changeOption(e)}
                        value={this.state.selected}
                    >
                        <option value="" className="disabled selected" disabled>
                            World
                        </option>
                        {options}
                    </select>
                </div>
                <div className="counter-container">
                    <div className="card hoverable">
                        <h4>
                            <b>Infected</b>
                            <p>{this.state.infected.toLocaleString()}</p>
                        </h4>
                        <div
                            className="bar blue lighten-2"
                            style={infectedStyle}
                        >
                            {this.calcPercent(this.state.infected)}
                        </div>
                    </div>
                    <div className="card hoverable">
                        <h4>
                            <b>Recovered</b>
                            <p>{this.state.recovered.toLocaleString()}</p>
                        </h4>
                        <div
                            className="bar green lighten-2"
                            style={recoveredStyle}
                        >
                            {this.calcPercent(this.state.recovered)}
                        </div>
                    </div>
                    <div className="card hoverable">
                        <h4>
                            <b>Deaths</b>
                            <p>{this.state.deaths.toLocaleString()}</p>
                        </h4>
                        <div className="bar red lighten-2" style={deathsStyle}>
                            {" "}
                            {this.calcPercent(this.state.deaths)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Counter;
