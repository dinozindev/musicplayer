 function getMinutes(SongTime){
    var min = parseInt(parseInt(SongTime) / 60);
    var sec = parseInt(SongTime % 60);
    if (sec < 10) {
      sec = "0" + sec
    }
    if (min < 10) {
      min = "0" + min
    }
    return min + ":" + sec
  }

  export default getMinutes
  