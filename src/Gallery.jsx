import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: '',
      playing: false
    }
  }
  

  playAudio(previewUrl) {
    /**
     * utworzenie nowego obiektu audio
     * za każdym razem jak się naciśnie na element galeri
     */ 
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState( {
        playing: true,
        playingUrl: previewUrl,
        /**
         * Setting audio object to the this audio on it
         * tego zadeklarowanego LET AUDIO wyżej
         * ES6 shorthand
         */
        audio
      } )
    } else {
      // if you click on the same object
      if ( this.state.playingUrl === previewUrl ) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
        // jeśli klikam na inny object
      } else {
        /**
         * Pause the current video, które aktualnie jest 
         * w podanym stanie i zacznij grać nowe.
         * Uaktualnij stany wraz z nowym obiektem audio
         */
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
  }


  render() {
    // console.log('gallery props', this.props)
    const {tracks} = this.props;
    return (
      <div>
        {tracks.map( (track, key) => {
           console.log('track', track)
          const trackImg = track.album.images[0].url;
          return (
            <div
              key={key}
              className="track"
              onClick={ () => this.playAudio( track.preview_url ) }
            >
              <img
                src={trackImg}
                className="track-img"
                alt="track"
              />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url
                      ? <span>| |</span> 
                      : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p
                className="track-text"
              >
                {track.name}
              </p>
            </div>  
          )

        } )}
      </div>
    )
  }
}

export default Gallery;