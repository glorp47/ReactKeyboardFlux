var React = require("react");


var TrackPlayer = React.createClass({

  getInitialState: function () {
    return {looping: false};
  },

  isLooping: function () {
    return this.state.looping;
  },

  playClick: function () {
    this.props.track.play();
  },

  destroyClick: function () {
    this.props.track.destroy();
  },

  loopMessage: function () {
    if (this.isLooping()) {
      return "Stop Loop";
    } else {
      return "Start Loop";
    }
  },

  loopClick: function (e) {
    if (this.state.looping) {
      this.setState({ looping: false });
    } else {

      this.loop();
      this.setState({ looping: true });
    }
  },

  loop: function () {
    if (this.interval) { return; }

    var currentNote = 0,
        playBackStartTime = Date.now(),
        roll = this.props.track.attributes.roll,
        delta;

    this.interval = setInterval(function () {
      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        if (delta >= roll[currentNote].time) {
          var notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
        if(this.state.looping)
        {this.loop()};
      }
    }.bind(this), 1);
  },

  render: function () {

    return (
      <div className="track">
        <p className="track-name">{this.props.track.get('name')}</p>
        <button onClick={this.playClick}>Play</button>
        <button onClick={this.loopClick}>{this.loopMessage()}</button>
        <button onClick={this.destroyClick}>Delete</button>
      </div>
    );
  }

});


module.exports = TrackPlayer;
