var React = require('react'),
    FilterActions = require('../actions/filterActions.js'),
    FilterStore = require('../stores/FilterStore'),
    ReactSlider = require('react-slider');

    var Controls = React.createClass({

      getInitialState: function () {
        var currentVolume = FilterStore.volume();
        var currentWaveform = FilterStore.waveform();
        return { volume: currentVolume, waveform: currentWaveform };
      },

      handleVolumeChange: function (event) {
        this.setState({volume: parseFloat(event.target.value)});
        FilterActions.updateVolume(event.target.value);;
      },

      handleWaveformChange: function (event) {
        FilterActions.updateWaveform(event.target.value)
        this.setState({waveform: event.target.value});
      },

      render: function () {
        return (
          <div className="controls">
            <div className="volume">
            <h3>VOLUME</h3>
            <input type="range" min="0" max="5" step=".3" value={this.state.volume} onChange={this.handleVolumeChange} />
            <span id="range">{this.state.volume}</span>
            </div>
            <div className="waveform">
            <h3>WAVEFORM TYPE</h3>
            <select value={this.state.waveform} onChange={this.handleWaveformChange}>
              <option value={'sine'}>SINE</option>
              <option value={'square'}>SQUARE</option>
              <option value={'sawtooth'}>SAWTOOTH</option>
              <option value={'triangle'}>TRIANGLE</option>
            </select>
            </div>
          </div>
        );
      }

    });

    module.exports = Controls;
