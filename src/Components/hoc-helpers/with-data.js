import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";

//компонент-обертка, который вызывает ItemList и передает ему все свойства
import React, {Component} from "react";

const withData = (View, getData) => {
    return class extends Component {
        // componentDidMount() {
        //   console.log(this.props)// Свойства getData onItemSelectedиз из App.js  нормально передаются!
        // }

        //переносим всю логику из  в к-обертку
        state = {
            data: null
        };

        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        }

        //===================================

        render() {
            //переносим всю логику из  в к-обертку
            const {data} = this.state;

            if (!data) {
                return <Spinner/>
            }
            //===================================

            return (
                <View {...this.props} data={data}/>//передаем эти свойства в ItemList
            )
        }
    }
}
export default withData;