import React, {Component} from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/SwapiService";

export default class App extends Component {
    swapiService = new SwapiService();
    state = {
        hasError: false
    }


    componentDidCatch(error, errorInfo) {
        // console.log('componentDidCatch()')
        this.setState({hasError: true})
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        return (
            <div style={{padding: '0 5rem'}}>
                <Header/>
                <RandomPlanet/>
                <ErrorButton/>
                <PeoplePage/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            renderItem={(item)=> (<span>{item.name}<button> !</button></span>)}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarships}
                            renderItem={(item)=> item.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div>

            </div>
        )
    }
}
