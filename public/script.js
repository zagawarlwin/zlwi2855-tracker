
const form = document.getElementById("songform");
const songlist = document.getElementById("songlist");

var songList = [];

function addSong(title, vibe, album, artist) {
    let song = {
      title,
      vibe,
      album,
      artist,
      id: Date.now(),
      date: new Date() .toISOString(),
      billable: false
    }
    songList.push(song);
    displaySong(song);
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    addSong(
      form.elements.songTitle.value,
      form.elements.songVibe.value,
      form.elements.songAlbum.value,
      form.elements.songArtist.value,
    )
  })

  function displaySong(song) {
    let item = document.createElement("li");
    item.setAttribute("data-id", song.id);
    item.innerHTML = 
      `<p>${song.vibe}</p><p>${song.title}</p><p>${song.artist}</p><p>${song.album}</p>
      <span></span>
      `;
  
    songlist.appendChild(item);
  
    form.reset();

    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("🗑️");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);
  
    delButton.addEventListener("click", function(event) {
  
      songList.forEach(function(songArrayElement, songArrayIndex) {
        if (songArrayElement.id == item.getAttribute('data-id')) {
          songList.splice(songArrayIndex, 1)
        }
      })
  
      console.log(songList)
      item.remove();
    })
  
  /*let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
    
  item.insertBefore(checkbox, item.firstChild);
  
  checkbox.addEventListener("change", function(event) {
    let isChecked = event.target.checked;
    if (song.id == item.getAttribute("data-id")) {
      if (isChecked) {
        item.style.backgroundColor = "rgb(220, 255, 220)";
        song.billable = true;
        console.log(songList);
      } else {
        item.style.backgroundColor = "white";
        song.billable = false;
        console.log(songList);
      }
    }
  }); */

  }