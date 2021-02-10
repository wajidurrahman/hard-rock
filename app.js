function searchSongs() {
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // console.log(url);
    // load data
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => displaySongs(data.data))

        // .catch(error => console.log(error));
        .catch(error => displayError('Something went wrong !! Please try again later!'));
}


const displaySongs = songs => {
    console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'search-result col-md-8 mx-auto py-4';
        songDiv.innerHTML = `
           <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
    })
}


const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        // console.log(error);
        displayError('Sorry! I failed to load lyrics, Please try again later!!')
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message')
    errorTag.innerText = error;
}




















// step 1
// const searchSongs = async() => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // data load
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);

// }

// const displaySongs = songs => {
// console.log(songs);
// songs.forEach(song => console.log(song.title))

// step2


// const getLyric = (artist, title) => {
//     // console.log(artist, title);
//     const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`
//     // console.log(url);
//     fetch(url)
//     .then(res => res.json())
//     // .then(data => console.log(data.lyrics))
//     .then(data => displayLyrics(data.lyrics))
// }
