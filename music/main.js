// Select all the elements in the HTML page 
// and assign them to a variable 
let now_playing = document.querySelector(".now-playing"); 
let track_art = document.querySelector(".track-art"); 
let track_name = document.querySelector(".track-name"); 
let track_artist = document.querySelector(".track-artist"); 
  
let playpause_btn = document.querySelector(".playpause-track"); 
let next_btn = document.querySelector(".next-track"); 
let prev_btn = document.querySelector(".prev-track"); 
  
let seek_slider = document.querySelector(".seek_slider"); 
let volume_slider = document.querySelector(".volume_slider"); 
let curr_time = document.querySelector(".current-time"); 
let total_duration = document.querySelector(".total-duration"); 
let site_name = document.querySelector(".title");
  
// Specify globally used values 
let track_index = 0; 
let isPlaying = false; 
let updateTimer; 
  
// Create the audio element for the player 
let curr_track = document.createElement('audio'); 
  
// Define the list of tracks that have to be played 
let baseUrl = 'https://mordechaishapiro.com/musicfiles/kolhaderech/';
let baseUrl2 = "https://mordechaishapiro.com/wp-content/uploads/2019/06/";
var last_played = [];
let track_list = [ 
  { 
    name: "Kol Haderech", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "01-Kol-Haderech.mp3"
  }, 
  { 
    name: "Schar Mitzvah", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "02-Schar-Mitzvah.mp3"
  }, 
  { 
    name: "Ki Malachov", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "03-Ki-Malachov.mp3", 
  }, 
  { 
    name: "Chizku", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "04-Chizku.mp3", 
  }, 
  { 
    name: "Shir Hamaalos", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "05-Shir-Hamaalos.mp3", 
  }, 
  { 
    name: "ivdu", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "06-Ivdu.mp3", 
  }, 
  { 
    name: "Hayom", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "07-Hayom.mp3", 
  }, 
  { 
    name: "Mi KaHashem", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "08-Mi-KaHashem.mp3", 
  }, 
  { 
    name: "Lo Alecha", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "09-Lo-Alecha.mp3", 
  }, 
  { 
    name: "Umeloch", 
    artist: "Mordechai Shapiro", 
    image: "Kol-Haderech.png", 
    path: baseUrl + "10-Umeloch.mp3", 
  }, 
  { 
    name: "Hakol Mishamayim", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "01-Mordechai-Shapiro-Hakol-Mishamayim.mp3", 
  },
  { 
    name: "One In A Million", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "02-Mordechai-Shapiro-One-In-a-Million.mp3", 
  },
  { 
    name: "Vsiten", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "03-Mordechai-Shapiro-Vsiten.mp3", 
  },
  { 
    name: "Hachalom", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "04-Mordechai-Shapiro-Hachalom.mp3", 
  },
  { 
    name: "Tefillah", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "05-Mordechai-Shapiro-Tefillah.mp3", 
  },
  { 
    name: "Boker Tov", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "06-Mordechai-Shapiro-Boker-Tov.mp3", 
  },
  { 
    name: "Up All Night", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "07-Mordechai-Shapiro-Up-All-Night-feat.-Danny-Palgon.mp3", 
  },
  { 
    name: "Tov Hashem", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "08-Mordechai-Shapiro-Tov-Hashem.mp3", 
  },
  { 
    name: "Ein Anachnu", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "09-Mordechai-Shapiro-Ein-Anachnu.mp3", 
  },
  { 
    name: "Modeh", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "10-Mordechai-Shapiro-Modeh.mp3", 
  },
  { 
    name: "Avinu", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "11-Mordechai-Shapiro-Avinu.mp3", 
  },
  { 
    name: "Barcheinu", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "12-Mordechai-Shapiro-Barcheinu.mp3", 
  },
  { 
    name: "Friends", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "13-Mordechai-Shapiro-Friends.mp3", 
  },
  { 
    name: "Kdei Lehodos", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "14-Mordechai-Shapiro-Kdei-Lehodos.mp3", 
  },
  { 
    name: "Byachad", 
    artist: "Mordechai Shapiro", 
    image: "Hakol-Mishamayim.png", 
    path: baseUrl2 + "15-Mordechai-Shapiro-Byachad.mp3", 
  },
]; 


function loadTrack(track_index) { 
    // Clear the previous seek timer 
    clearInterval(updateTimer); 
    resetValues(); 
    
    // Load a new track 
    curr_track.src = track_list[track_index].path; 
    curr_track.load(); 
    
    // Update details of the track 
    track_art.style.backgroundImage =  
       "url(" + track_list[track_index].image + ")"; 
    track_name.textContent = track_list[track_index].name; 
    track_artist.textContent = track_list[track_index].artist; 
    now_playing.textContent =  
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
       site_name.textContent = "Music Player: Now Playing: " + track_list[track_index].name;
    
    // Set an interval of 1000 milliseconds 
    // for updating the seek slider 
    updateTimer = setInterval(seekUpdate, 1000); 
    
    // Move to the next track if the current finishes playing 
    // using the 'ended' event 
    curr_track.addEventListener("ended", nextTrack); 
    
    // Apply a random background color 
    random_bg_color(); 
  } 
    
  function random_bg_color() { 
    // Get a random number between 64 to 256 
    // (for getting lighter colors) 
    let red = Math.floor(Math.random() * 256) + 64; 
    let green = Math.floor(Math.random() * 256) + 64; 
    let blue = Math.floor(Math.random() * 256) + 64; 
    
    // Construct a color withe the given values 
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")"; 
    
    // Set the background to the new color 
    document.body.style.background = bgColor; 
  } 
    
  // Functiom to reset all values to their default 
  function resetValues() { 
    curr_time.textContent = "00:00"; 
    total_duration.textContent = "00:00"; 
    seek_slider.value = 0; 
  } 



  function playpauseTrack() { 
    // Switch between playing and pausing 
    // depending on the current state 
    if (!isPlaying) playTrack(); 
    else pauseTrack(); 
  } 
    
  function playTrack() { 
    // Play the loaded track 
    curr_track.play(); 
    isPlaying = true; 
    
    // Replace icon with the pause icon 
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; 
  } 
    
  function pauseTrack() { 
    // Pause the loaded track 
    curr_track.pause(); 
    isPlaying = false; 
    
    // Replace icon with the play icon 
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';; 
  } 
  var curr_track1=document.getElementById('playpause-track');

   document.body.onkeypress = function(e){
   if(e.which == 32){  
 // stops default behaviour of space bar. Stop page scrolling down
 if (!isPlaying) playTrack(); 
 else pauseTrack(); 
  }
} 
    
  function nextTrack() { 
    // Go back to the first track if the 
    // current one is the last in the track list 
    if (track_index < track_list.length - 1) 
      track_index += 1; 
    else track_index = 0; 
    
    // Load and play the new track 
    track_index = randomTrackGenerator();
    loadTrack(track_index); 
    playTrack(); 
  } 
    
  function prevTrack() { 
    // Go back to the last track if the 
    // current one is the first in the track list 
    if (track_index > 0) 
      track_index -= 1; 
    else track_index = track_list.length; 
    if (last_played.length > 0 )
    {
      track_index = last_played.pop();
    }  
    // Load and play the new track 
   // track_index = randomTrackGenerator();
    loadTrack(track_index); 
    playTrack(); 
  } 




  function seekTo() { 
    // Calculate the seek position by the 
    // percentage of the seek slider  
    // and get the relative duration to the track 
    seekto = curr_track.duration * (seek_slider.value / 100); 
    
    // Set the current track position to the calculated seek position 
    curr_track.currentTime = seekto; 
  } 
    
  function setVolume() { 
    // Set the volume according to the 
    // percentage of the volume slider set 
    curr_track.volume = volume_slider.value / 100; 
  } 
    
  function seekUpdate() { 
    let seekPosition = 0; 
    
    // Check if the current track duration is a legible number 
    if (!isNaN(curr_track.duration)) { 
      seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
      seek_slider.value = seekPosition; 
    
      // Calculate the time left and the total duration 
      let currentMinutes = Math.floor(curr_track.currentTime / 60); 
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
      let durationMinutes = Math.floor(curr_track.duration / 60); 
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
      // Add a zero to the single digit time values 
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    
      // Display the updated duration 
      curr_time.textContent = currentMinutes + ":" + currentSeconds; 
      total_duration.textContent = durationMinutes + ":" + durationSeconds; 
    } 
  } 
  function start_here() {
    track_index = randomTrackGenerator();
    loadTrack(track_index);
  }
  // Load the first track in the tracklist 
 
start_here();

function randomTrackGenerator() {
  var numberOfTracks = track_list.length;
  var trackno =Math.floor(Math.random() * numberOfTracks);
  last_played.push(trackno); 
  return  trackno;
}
