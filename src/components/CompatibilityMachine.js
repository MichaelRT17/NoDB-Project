import React, { Component } from 'react';
import axios from 'axios';
import './Compatibility.css';
import DeleteAll from './DeleteAll';

export default class CompatibilityMachine extends Component {
    constructor() {
        super();

        this.state = {
            matches: [],
            fNameInput: '',
            sNameInput: '',
            newFName: '',
            newSName: ''
        }
        this.deleteAll = this.deleteAll.bind(this);
    }

    componentDidMount() {
        axios.get('/api/getMatches').then(res => {
            this.setState({ matches: res.data })
        })
    }

    createMatch(fName, sName) {
        axios.get(`/api/getPercentage/${fName}/${sName}`)
            .then(res => {
                let matchResult = res.data;
                axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_KEY}&tag=${matchResult.result}&rating=g`)
                    .then(res => {
                        axios.post('/api/createMatch', { fName: this.state.fNameInput, sName: this.state.sNameInput, percentage: matchResult.percentage, gif: res.data.data.image_original_url })
                            .then(res => {
                                this.setState({ matches: res.data })
                            })
                    })
            })
    }

    editMatches(id, fName, sName) {
        axios.get(`/api/getPercentage/${fName}/${sName}`)
            .then(res => {
                let matchResult = res.data;
                axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_KEY}&tag=${matchResult.result}&rating=g`)
                    .then(res => {
                        axios.put(`/api/editMatches/${id}`, { fName: this.state.newFName, sName: this.state.newSName, percentage: matchResult.percentage, gif: res.data.data.image_original_url })
                            .then(res => {
                                this.setState({ matches: res.data })
                            })
                    })
            })
    }

    deleteMatches(id) {
        axios.delete(`/api/deleteMatch/${id}`).then(res => {
            this.setState({ matches: res.data })
        })
    }

    deleteAll() {
        axios.delete('/api/deleteAll').then(res => {
            this.setState({ matches: res.data })
        })
    }

    render() {
        console.log(this.state)
        let mappedMatches = this.state.matches.map((match, i) => {
            return (
                <div key={i}>
                    <div>
                        <h1>{`${match.fName} has ${match.percentage}% compatibility with ${match.sName}!`}</h1>
                        <div className='updateDiv'>
                            <div className='updateDiv'>
                                <input className='nameUpdater' placeholder={match.fName} onChange={e => this.setState({ newFName: e.target.value })} />
                                <button className='updateButton' onClick={() => this.editMatches(match.id, this.state.newFName, match.sName)}>Update your name</button>
                            </div>
                            <img className='gifs' src={match.gif} alt='gif' />
                            <div className='updateDiv'>
                                <button className='updateButton' onClick={() => this.editMatches(match.id, match.fName, this.state.newSName)}>Update their name</button>
                                <input className='nameUpdater' placeholder={match.sName} onChange={e => this.setState({ newSName: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <button onClick={() => this.deleteMatches(match.id)}>
                        X</button>
                    <hr />
                </div>
            )
        })
        return (
            <div>
                <div id='headerInput' className='updateDiv'>
                    <input type='text' className='nameInput' placeholder='Your name here'
                        onChange={e => this.setState({ fNameInput: e.target.value })} />
                    <input type='text' className='nameInput' placeholder='Their name here'
                        onChange={e => this.setState({ sNameInput: e.target.value })} />
                    <button className='updateButton'
                        onClick={() => this.createMatch(this.state.fNameInput, this.state.sNameInput)}>
                        Click for results...
                    </button>
                    <DeleteAll deleteAll={this.deleteAll}/>
                </div>
                <div>
                    {mappedMatches}
                </div>
            </div>
        )
    }
}