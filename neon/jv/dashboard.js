const activeUserKey = "basicNeonActiveUser";
const activeUser = JSON.parse(localStorage.getItem(activeUserKey));

const albums = [
  { artist: "Tems", album: "For Broken Ears", search: "Tems For Broken Ears" , clave:"Tems" },
  { artist: "KAROL G", album: "Manana Sera Bonito", search: "Karol G Manana Sera Bonito" , clave:"Karol" },
  { artist: "Rosalia", album: "Motomami", search: "Rosalia Motomami" , clave:"Rosalia" },
  { artist: "Rihanna", album: "ANTI", search: "Rihanna ANTI" , clave:"Riri" },
  { artist: "Lady Gaga", album: "Chromatica", search: "Lady Gaga Chromatica" , clave:"Lady" },
  { artist: "Arctic Monkeys", album: "AM", search: "Arctic Monkeys AM" , clave:"Artic" },
  { artist: "Extremoduro", album: "Agila", search: "Extremoduro Agila" , clave:"Extremoduro" },
  { artist: "Heroes del Silencio", album: "Senderos de Traicion", search: "Heroes del Silencio Senderos de Traicion" , clave:"Heroes" },
  { artist: "Manu Chao", album: "Clandestino", search: "Manu Chao Clandestino" , clave:"Manu"},
  { artist: "Bob Marley", album: "Legend", search: "Bob Marley Legend", clave:"Bob"},
  { artist: "Dave", album: "Psychodrama", search: "Dave Psychodrama" , clave:"Dave"},
  { artist: "Dua Lipa", album: "Future Nostalgia", search: "Dua Lipa Future Nostalgia" , clave:"Dua" }
];

if (!activeUser) {
  window.location.href = "index.html";
}

const welcomeName = document.querySelector("#welcomeName");
const welcomeEmail = document.querySelector("#welcomeEmail");
const detailName = document.querySelector("#detailName");
const detailEmail = document.querySelector("#detailEmail");
const logoutBtn = document.querySelector("#logoutBtn");
const albumGrid = document.querySelector("#albumGrid");
const contentgrid = document.querySelector("#albumcard");

const selectedCover = document.querySelector("#selectedCover");
const selectedTitle = document.querySelector("#selectedTitle");
const selectedArtist = document.querySelector("#selectedArtist");
const infoAlbum = document.querySelector("#infoAlbum");
const infoArtist = document.querySelector("#infoArtist");
const infoGenre = document.querySelector("#infoGenre");
const infoYear = document.querySelector("#infoYear");


welcomeName.textContent = `Bienvenido, ${activeUser.name}`;
welcomeEmail.textContent = activeUser.email;
detailName.textContent = activeUser.name;
detailEmail.textContent = activeUser.email;

function createAlbumCard(album) {
  const card = document.createElement("article");
  card.className = "album-card";
  card.innerHTML = `
    <div class="album-art"><span>${album.artist}</span></div>
    <h3>${album.album}</h3>
    <p>${album.artist}</p>
  `;
  card.addEventListener('click',()=>selectalbum(album));
 return card;
}
 
function selectalbum(album){
  //Muestra arriba la información del albúm
  //Buscamos en album, seguido del punto, la información a buscar y en donde
let infocard = document.querySelector(".cover-box");
let imagenABuscar = document.querySelector(`[data-clave=${album.clave}]`);

infocard.innerHTML = `<img src=${imagenABuscar.getAttribute("src")}>`;
let Albumtitulo = document.querySelector (".Albumtitulo");
Albumtitulo.innerText = `${album.artist}`;
let Albumtipo = document.querySelector (".Albumtipo");
Albumtipo.innerText = `${album.search}`;

}
function getLargeArtwork(url) {
  return url.replace("100x100bb", "600x600bb");
}

async function loadAlbumCovers() {
  albumGrid.innerHTML = "";
  albums.forEach((album) => albumGrid.appendChild(createAlbumCard(album)));

  const cards = [...albumGrid.querySelectorAll(".album-card")];

  await Promise.all(albums.map(async (album, index) => {
    try {
      const query = encodeURIComponent(album.search);
      const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=album&limit=1`);
      const data = await response.json();
      const artwork = data.results[0]?.artworkUrl100;

      if (!artwork) return;

      cards[index].querySelector(".album-art").innerHTML = `<img src="${getLargeArtwork(artwork)}" data-clave=${album.clave} alt="Portada de ${album.album} de ${album.artist}">`;
    } catch (error) {
      console.warn(`No se pudo cargar la portada de ${album.artist}`, error);
    }
  }));
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(activeUserKey);
  window.location.href = "index.html";
});

loadAlbumCovers();

