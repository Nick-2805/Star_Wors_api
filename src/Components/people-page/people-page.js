import React, {Component} from "react";
import './people-page.css'
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/SwapiService";

const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}

            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
}


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 5,
        hasError: false
    }

    onSelectedPerson = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    componentDidCatch(error, errorInfo) {
        // debugger;
        this.setState({
            hasError: true
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        const itemList = (
            <ItemList
                onItemSelected={this.onSelectedPerson}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => `${name} (${gender} ${birthYear})`}
            />
        )
        const personDetails = <PersonDetails personId={this.state.selectedPerson}/>
        return (
            <div>
                <Row left={itemList} right={personDetails}/>
                <Row left={'itemList'} right={'personDetails'}/>
            </div>
        )
    }

}