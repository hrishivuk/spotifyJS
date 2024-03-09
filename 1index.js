// Variable Initailisation
let songIndex = 0;
let audioElement;
let myProgressBar = document.getElementById("myProgressBar");

// music Control var
let masterPlay = document.getElementById("masterPlay");
let backwardBtn = document.getElementById("backward-btn");
let forwardBtn = document.getElementById("forward-btn");

let songItems = Array.from(document.getElementsByClassName("songContainer"));

// DATABASE===========================================================================================================
let songs = [
  {
    songName: "Beautiful",
    artistName: "Emin3m",
    filePath: "songs/0.mp3",
    coverPath: "covers/0.jpg",
    timePath: "05:04",
    arrayIndex: 0,
    playFlag: 0,
  },
  {
    songName: "When I see you again",
    artistName: "Wiz Khalifa",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
    timePath: "03:06",
    arrayIndex: 1,
    playFlag: 0,
  },
  {
    songName: "Baby",
    artistName: "Justin Bieber",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
    timePath: "03:52",
    arrayIndex: 2,
    playFlag: 0,
  },
  {
    songName: "Mockingbird",
    artistName: "Emin3m",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
    timePath: "04:03",
    arrayIndex: 3,
    playFlag: 1,
  },
  {
    songName: "CASTLE OF GLASS",
    artistName: "Linkin Park",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
    timePath: "03:58",
    arrayIndex: 4,
    playFlag: 0,
  },
  {
    songName: "The Search",
    artistName: "NF",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
    timePath: "04:21",
    arrayIndex: 5,
    playFlag: 0,
  },
  {
    songName: "Calm Down",
    artistName: "Rema",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
    timePath: "05:12",
    arrayIndex: 6,
    playFlag: 0,
  },
  {
    songName: "Money Trees",
    artistName: "Kendrick Lammar",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
    timePath: "04:56",
    arrayIndex: 7,
    playFlag: 0,
  },
  {
    songName: "No role Modelz",
    artistName: "J Coles",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
    timePath: "05:51",
    arrayIndex: 8,
    playFlag: 0,
  },
  {
    songName: "Starboy",
    artistName: "Weekend",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
    timePath: "03:45",
    arrayIndex: 9,
    playFlag: 0,
  },
  {
    songName: "untill i found you",
    artistName: "Steven Sanchez",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
    timePath: "04:09",
    arrayIndex: 10,
    playFlag: 0,
  },
];

// DATABASE===========================================================================================================

function playSelectedMusic() {
  songs.forEach((element, i) => {
    if (element.playFlag == 1) {
      audioElement = new Audio("songs/" + element.arrayIndex + ".mp3");
      document.getElementById("cm-thumb").src = songs[i].coverPath;
      document.getElementById("selected-song").innerText = songs[i].songName;
      document.getElementById("selected-artist").innerText =
        songs[i].artistName;
    }
  });
}
playSelectedMusic();
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
  element.getElementsByClassName("artist-name")[0].innerText =
    songs[i].artistName;
  element.getElementsByClassName("run-time")[0].innerText = songs[i].timePath;
  if (songs[i].playFlag == 1) {
    document.getElementById("cm-thumb").src = songs[i].coverPath;
    document.getElementById("selected-song").innerText = songs[i].songName;
    document.getElementById("selected-artist").innerText = songs[i].artistName;
  }
});

//Play/Pause
function playPause() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
  console.log((audioElement.currentTime / audioElement.duration) * 100);
}
masterPlay.addEventListener("click", () => {
  playPause();
});

// event listeners
function musicBar() {
  audioElement.addEventListener("timeupdate", () => {
    progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 1000
    );
    myProgressBar.value = progress;
  });
  myProgressBar.addEventListener("change", () => {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 1000;
  });
}
musicBar();
// change audioElement
// audioElement = new Audio("songs/0.mp3");
backwardBtn.addEventListener("click", () => {
  audioElement.pause();
  // myProgressBar.value = 0;
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  }
  songs.forEach((element, i) => {
    if (element.playFlag == 1) {
      console.log("current" + element.arrayIndex);
      if (element.arrayIndex > 0) {
        element.playFlag = 0;
        songs[i - 1].playFlag = 1;
        console.log("flag found");
        playSelectedMusic();
        audioElement.play();
        musicBar();
      }
    }
  });
});
const BreakException = {};
forwardBtn.addEventListener("click", () => {
  audioElement.pause();
  // myProgressBar.value = 0;
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  }
  try {
    songs.forEach((element, i) => {
      if (element.playFlag == 1) {
        console.log("current" + element.arrayIndex);
        if (element.arrayIndex < songs.length - 1) {
          element.playFlag = 0;
          songs[i + 1].playFlag = 1;
          console.log("flag found");
          playSelectedMusic();
          audioElement.play();
          musicBar();

          throw BreakException; // throw an exception to exit the loop
        }
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e; // re-throw any exceptions other than the custom one
  }
});
