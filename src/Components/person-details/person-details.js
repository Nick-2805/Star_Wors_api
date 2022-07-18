import React, {Component} from "react";
import './person-details.css';
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner/spinner";
import ErrorButton from "../error-button";

export default class PersonDetails extends Component {
    swapiService = new SwapiService()
    state = {
        person: null,
    }

    componentDidMount() {
        this.updatePerson()
        // console.log(this.state.person)//null
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
        // console.log(this.state.person)
        //~ {id: '1', name: 'Luke Skywalker', gender: 'male', birthYear: undefined, eyeColor: undefined}

    }

    updatePerson() {
        const {personId} = this.props// взяли из app.js  <PersonDetails personId={this.state.selectedPerson}/>
        if (!personId) {
            return
        }
        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({person})
            })
        // console.log(this.state.person)
        //~ {id: '1', name: 'Luke Skywalker', gender: 'male', birthYear: undefined, eyeColor: undefined}
    }

    render() {

        if (!this.state.person) {
            return <span>Select a person from a list</span>;
        }

        const {
            id,
            name,
            gender,
            birthYear,
            eyeColor
        } = this.state.person


        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

                <div className="card-body">
                    <h4>{name} {this.props.personId}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                    <ErrorButton/>
                </div>
            </div>
        )
    }
}