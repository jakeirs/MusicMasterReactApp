import React, {Component} from 'react';
import './App.css';

class Profile extends Component {


  render() {
    // sprawdź jakie props są zawarte
    // console.log("props", this.props)
    // należy zadeklarować obiekt ARTIST tak samo jak w API
    let artist = { 
      name: '',
      followers: {
        total: ''
      },
      images: [{url: ''}],
      genres: []
    }
    if (this.props.artist !== null) {
      /**
       * Przypisz do $ARTIST (zadeklarowanej prze let)
       * obiekt z API,
       * pamiętaj, żeby struktura była zachowana
       */ 
      artist = this.props.artist;
      
    }
    // console.log('profile artist', artist.images[0].url)
    return (
      <div className="profile">
        <img
          alt="Profile"
          className="profile-img"
          src={artist.images[0].url}
        />
      <div className="profile-info">
        <div className="profile-name">{artist.name}</div>
        <div className="profile-followers">
          {artist.followers.total} followers
        </div>
        <div className="profile-genres">
          {
            artist.genres.map( (genre, key, genres) => {
              /**
               * Przecinki i nie dla ostatniego
               */
               genre = genre !== genres[genres.length - 1] 
                             ? `${genre},` 
                             : ` & ${genre}`;
              /**
               * Each child should have uniq key of array
               * so we add prop called key which is gonna be index
               */
              return (
                <span key={key}>{genre}</span>
              )              
            } )
          }
        </div>
      </div>
      </div>
    )
  }
}

export default Profile;