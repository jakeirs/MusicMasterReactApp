import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

import Profile from './Profile'
import Gallery from './Gallery'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // whatever the user types with an input field
      query: '',
      // initial state of artist
      artist: null,
      tracks: []
    }
  }

  search() {
    // console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const accessToken = 'BQAEXiOm0Qm0kFhLYUdL1uAzZQS7p-YcOi9G7Evcfqkou965ybboWu9d2iRO6GxMxOsuZtJOdCscOcr0N79I_-dtpp_FYaUKFxkh1qyDy8oxhFMfEvEmBMqUGPnoRcC_UIG50HmxrbbbFKxH_GobOs1mUE23CNcVAbm5&refresh_token=AQBERrb95FmttRdsdnluY490WGOTvaSxHbSc54fWs0MHRPsJTlEgsWrL10OiFz0Fd0vIicDD2ZHsR9lmuUvT5OBKhWfMUlMnprUNgBSIjZp3V2FIfTRWSw6uqKtEBMBOYtY';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
    
    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    })
    /**
     * używamy metody .json(), żeby dostać json,
     * który zwraca promise
     * następnie rozwiązujemy promise    
     */
    .then( response => response.json()  )
    .then( json => {
      // bierzemy pierwszego artystę z brzegu
      const artist = json.artists.items[0];
        
      // console.log('artist', artist);
      /* uaktualnia stan artist */
      this.setState( { artist } );

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=PL&`
      fetch( FETCH_URL,{
        method: 'GET',
        headers: {
         'Authorization': 'Bearer ' + accessToken
        },
        mode: 'cors',
        cache: 'default'
      } ).then( response => response.json() )
      .then( json => {
        
        /**
         * Różnica między const tracks = json, a {tracks} = json:
         * 1. tracks=json -> przypisanie całego obiektu do $track
         * 2. {tracks}=json -> wybranie z obiektu tylko własności tracks
         *    i przypisanie do zmiennej
         * Natomiast: to jest równe: 
         * tracks = json.tracks === { tracks } = json
         * 
         */
        const  tracks   = json.tracks
        this.setState( { tracks } );
        // console.log('artists top tracks', tracks)

      } )
    });    
  }



  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl               
              type="text"
              placeholder="Search for an Artist"
              value = { this.state.query }
              onChange={ (event) => this.setState( { query: event.target.value } ) }
              onKeyPress={ event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              } }
            />
            <InputGroup.Addon
              onClick={ () => this.search() }              
            >
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>

          </InputGroup>

            
        </FormGroup>
        {
          /**
           * Don't show before State artist is not known 
           * We need to wrap 2 divs within each other or within another
           * not 2 in the same time
           */

           this.state.artist !== null
           ? <div>
             
              <Profile 
                artist={this.state.artist}
                tracks={this.state.tracks}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div> 

           : <div></div>  
        }

      </div>
    )
  }
}

export default App;