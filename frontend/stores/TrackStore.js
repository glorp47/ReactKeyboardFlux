var _tracks = [];
    Store = require ("flux/utils").Store,
    OrganConstants = require("../constants/OrganConstants"),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    TrackStore = new Store(AppDispatcher);


TrackStore.all = function () {
  return _tracks.slice(0);
};

TrackStore.__onDispatch = function (payload) {
  switch(payload.actionType){
  case OrganConstants.ADD_TRACK:
    TrackStore._addTrack(payload.track);
    break;
  case OrganConstants.RESET_TRACKS:
    TrackStore._resetTracks(payload.tracks);
    break;
    case OrganConstants.DESTROY_TRACK:
    TrackStore._destroyTrack(payload.track);
    break;
    case OrganConstants.READ_TRACKS:
    TrackStore._readTracks(payload.tracks);
    break;
  default:
  }
};

TrackStore._createCookie = function (name,value) {

		var date = new Date();
		date.setTime(date.getTime()+(24*60*60*1000));
		var expires = "; expires="+date.toGMTString();

	document.cookie = name+"="+value+expires+"; path=/";
};

TrackStore._readCookie = function (name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

TrackStore._addTrack = function (track) {
  var idx = _tracks.indexOf(track);
  if (idx == -1) {
    _tracks.push(track);
    this.__emitChange();
  }
};

TrackStore._destroyTrack = function (track) {
  var idx = _tracks.indexOf(track);
      if (idx == -1) {
    _tracks.splice(idx, 1);
      this.__emitChange();
    }
};

TrackStore._resetTracks = function (tracks) {
  _tracks = tracks.slice();
  this.__emitChange();
};

module.exports = TrackStore;
