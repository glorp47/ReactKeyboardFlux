var React = require('react'),
    TrackStore = require('../stores/TrackStore'),
    TrackActions = require('../actions/TrackActions'),
    TrackApiUtil = require('../util/TrackApiUtil'),
    TrackPlayer = require('../components/TrackPlayer');

var JukeBox = React.createClass({
  componentDidMount: function () {
    TrackStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return { tracks: TrackStore.all() };
  },

    _readCookie: function (name) {
    	var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
    	for(var i=0;i < ca.length;i++) {
    		var c = ca[i];
    		while (c.charAt(0)==' ') c = c.substring(1,c.length);
    		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    	}
    	return null;
    },

  render: function () {
    return (
      <div className="jukebox">
        <h3>JUKEBOX</h3>
        {
          this.state.tracks.map(function (track) {
            return <TrackPlayer key={track.get('id')} track={track}/>
          })
        }
      </div>
    );
  },

  _onChange: function () {
    this.setState({ tracks: TrackStore.all() });
  }
});

module.exports = JukeBox;
