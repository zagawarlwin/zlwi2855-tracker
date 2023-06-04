const form = document.getElementById("songform");
const songlist = document.getElementById("songlist");

var songList = [];

function addSong(title, album, artist, vibe) {
    let song = {
      title,
      album,
      artist,
      vibe,
    }
    taskList.push(song);
    displaySong(song);
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    addSong(
      form.elements.songTitle.value,
      form.elements.songAlbum.value,
      form.elements.songArtist.value,
      form.elements.songVibe.value,
    )
  })

  function displaySong(song) {
    let item = document.createElement("li");
    item.setAttribute("data-id", song.id);
    item.innerHTML = 
      `<p><strong>${song.title}</strong><br>${song.artist}</p>
      `;
  
    tasklist.appendChild(item);
  
    form.reset();
  }