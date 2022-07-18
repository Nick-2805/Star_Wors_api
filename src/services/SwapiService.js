import React from 'react';
import ReactDOM from 'react-dom/client';

//=================================================================================================
//{count: 82, next: 'https://swapi.dev/api/people/?page=2', previous: null, results: Array(10)}
// count: 82
// next: "https://swapi.dev/api/people/?page=2"
// previous: null
// results: Array(10)
// 0: {name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', …}
// 1: {name: 'C-3PO', height: '167', mass: '75', hair_color: 'n/a', skin_color: 'gold', …}
// 2: {name: 'R2-D2', height: '96', mass: '32', hair_color: 'n/a', skin_color: 'white, blue', …}
// 3: {name: 'Darth Vader', height: '202', mass: '136', hair_color: 'none', skin_color: 'white', …}
// 4: {name: 'Leia Organa', height: '150', mass: '49', hair_color: 'brown', skin_color: 'light', …}
// 5: {name: 'Owen Lars', height: '178', mass: '120', hair_color: 'brown, grey', skin_color: 'light', …}
// 6: {name: 'Beru Whitesun lars', height: '165', mass: '75', hair_color: 'brown', skin_color: 'light', …}
// 7: {name: 'R5-D4', height: '97', mass: '32', hair_color: 'n/a', skin_color: 'white, red', …}
// 8: {name: 'Biggs Darklighter', height: '183', mass: '84', hair_color: 'black', skin_color: 'light', …}
// 9: {name: 'Obi-Wan Kenobi', height: '182', mass: '77', hair_color: 'auburn, white', skin_color: 'fair', …}
// length: 10
// [[Prototype]]: Array(0)
// [[Prototype]]: Object
//=================================================================================================

export default class SwapiService {
    _apiBase = 'https://swapi.dev/api/'

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        // const res = await fetch(`${this._apiBase}${url}`); ===
        //Response {type: 'cors', url: 'https://swapi.dev/api/', redirected: false, status: 200, ok: true, …}
        // body: (...)
        // bodyUsed: false
        // headers: Headers {}
        // ok: true   <===
        // redirected: false
        // status: 200  <===
        // statusText: ""
        // type: "cors"
        // url: "https://swapi.dev/api/"
        // [[Prototype]]: Response
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `received ${res.status}`)
        }
        return await res.json()
        //res.json() === {
        //     "films": "https://swapi.dev/api/films/",
        //     "people": "https://swapi.dev/api/people/",
        //     "planets": "https://swapi.dev/api/planets/",
        //     "species": "https://swapi.dev/api/species/",
        //     "starships": "https://swapi.dev/api/starships/",
        //     "vehicles": "https://swapi.dev/api/vehicles/"
        // }

    }

    async getAllPeople() {//персонажи
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson)
    }

    async getPerson(id) {//персонаж
        const person = await this.getResource(`/people/${id}`)
        return this._transformPerson(person)
    }

    async getAllPlanets() {//планеты
        const res = await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet)
    }


    async getPlanet(id) {//планета
        const planet = await this.getResource(`/planets/${id}`);
        return this._createPlanet(planet)
    }

    async getStarships() {//корабли
        const res = await this.getResource('starships')
        return res.result.map(this._transformStarship)
    }

    async getStarship(id) {//корабль
        const starship = await this.getResource(`/starships/${id}`)
        return this._transformStarship(starship)
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _createPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }


}

// const swapi = new SwapiService()
// swapi.getAllPeople().then((body) => {
//
//     console.log('swapi', body)
// })

//===========================================================================================
// //Получаемданные с сервера делая 2 запроса
// const getResource = async (url) => {
//     const res = await fetch(url);
//     if(!res.ok) {
//         //Отлавливаем ошибку если запрос не соответствует данным на сервере
//         throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
//         //index.js:18 Ошибка Error: Could not fetch https://swapi.dev/api//people/s1/, received 404
//         //     at getResource (index.js:7:1)
//
//         // ${res.status} === 404 выдает сервер при ошибке
//     }
//     const body = await res.json();
//     return body;
// }
// getResource('https://swapi.dev/api//people/1/')
//     .then((body) => {
//         console.log(body)
//         //{name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', …}
//     })
//     .catch((err) => {// Отлавливаем ошибку
//         console.error('Ошибка', err)
//     })
//
// // fetch('https://swapi.dev/api//people/1/')
// //     .then((res) => {
// //         console.log('res', res)
// //         //Response {type: 'cors', url: 'https://swapi.dev/api//people/1/', redirected: false, status: 200, ok: true, …}
// //         return res.json()
// //     })
// //     .then((bodyRes) => {
// //         console.log('bodyRes', bodyRes)
// //         //bodyRes {name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', …}
// //     })