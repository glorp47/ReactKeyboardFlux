var React = require('react'),
    KeyStore = require('../stores/KeyStore'),
    FilterStore = require('../stores/FilterStore'),
    Note = require('../util/Note'),
    TrackActions = require('../actions/TrackActions.js'),
    TONES = require('../constants/Tones');

var NoteKey = React.createClass({
  componentDidMount: function () {
    this.note = new Note(TONES[this.props.noteName]);
    KeyStore.addListener(this._onKeyChange);
    FilterStore.addListener(this._onFilterChange);
  },

  getInitialState: function () {
    return { pressed: this.thisKeyPressed() };
  },

  render: function () {
    var className = "note-key";
    if(this.props.noteName.indexOf("#") !== -1)
    {
      className += " key-black";
    } else {
      className += " key-white";
    }
    if(this.state.pressed){
      className += " pressed";
    }
    return <div className={className}>{this.props.noteName}</div>;
  },

  thisKeyPressed: function () {
    var keys = KeyStore.all();
    return keys.indexOf(this.props.noteName) !== -1;
  },

  _onFilterChange: function () {
    this.note.stop()
    this.setState({ pressed: false })
    this.note = new Note(TONES[this.props.noteName], this.props.waveform);
  },

  _onKeyChange: function () {
    var pressed = this.thisKeyPressed();
    if (pressed) {
      this.note.start();
    } else {
      this.note.stop();
    }
    this.setState({ pressed: pressed });
  }
});

module.exports = NoteKey;
