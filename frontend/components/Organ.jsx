var React = require('react'),
    NoteKey = require('../components/NoteKey'),
    JukeBox = require('../components/JukeBox'),
    Recorder = require('../components/Recorder'),
    Controls = require('../components/Controls'),
    TONES = require("../constants/Tones"),
    KeyStore = require('../stores/KeyStore'),
    FilterStore = require('../stores/FilterStore');

var Organ = React.createClass({
  componentDidMount: function () {
    KeyStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return { notes: KeyStore.all()};
  },

  render: function () {
    var that = this;
    return (
      <div>
        <div className="keys group">
        {
          Object.keys(TONES).map(function (noteName) {
            return (<NoteKey noteName={noteName} key={noteName}/>);
          })
        }
        </div>
        <Controls />
        <Recorder />
        <JukeBox />
      </div>
   );
  },

  _onChange: function () {
    this.setState({notes: KeyStore.all()});
  }
});

module.exports = Organ;
