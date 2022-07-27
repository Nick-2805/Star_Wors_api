import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';

import Row from "../row/row";

import ItemDetails, { Record } from "../item-details/item-details";
import SwapiService from "../../services/SwapiService";

import './app.css';

export default class App extends Component {

    swapiService = new SwapiService();

    render() {

        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage
        } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}>

                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>

            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Credit"/>


            </ItemDetails>

        );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>

                    <Row
                        left={personDetails}
                        right={starshipDetails}/>
                </div>
            </ErrorBoundry>
        );
    }
}