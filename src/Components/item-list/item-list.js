import React, {Component} from "react";
import './item-list.css';
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner/spinner";

export default class ItemList extends Component {

    SwapiService = new SwapiService();

    state = {
        personList: null
    }

    componentDidMount() {
        this.SwapiService.getAllPeople().then((personList) => {
            this.setState({personList} )
        })
        console.log('personList', this.state.personList)
    }


    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item"
                key={id}
                onclick={() => this.props.onItemSelected(id)} >
                    {name}
                </li>
            )
        })
    }

    render() {
        const {personList} =this.state
        if(!personList) {
           return  <Spinner/>
        }
        const items = this.renderItems(personList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}