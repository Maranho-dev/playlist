const playlist = [
  {
    id: 1,
    nome: "playlist1",
    tags: ["rock", "indie"],
    musicas: [
      { nome: "wish u where", autor: "pink", album: "new", duracao: 1.2 },
      { nome: "ufro", autor: "metall", album: "old", duracao: 1.24 },
    ],
  },
];

let nextId = 1;

module.exports = {
  // GET /playlist
  index: (req, res) => {
    res.json(playlist);
  },

  // GET /playlist/:id
  show: (req, res) => {
    const { id } = req.params;
    const playL = playlist.find((pl) => pl.id === +id);

    if (!playL) {
      return res.status(404).json({ message: "playlist not found" });
    }

    res.status(200).json(playL);
  },

  // POST /playlist/create
  create: (req, res) => {
    const { nome, tags, musicas } = req.body;
    const id = ++nextId;

    const newPlay = { id, nome, tags, musicas: [] };

    if (Array.isArray(musicas)) {
      musicas.forEach((m) => {
        const { nome, autor, album, duracao } = m;
        newPlay.musicas.push({ nome, autor, album, duracao });
      });
    }

    playlist.push(newPlay);
    res.status(201).json(newPlay);
  },

  // PUT /playlist/:id
  update: (req, res) => {
    const { id } = req.params;
    const { nome, tags } = req.body;

    const playL = playlist.find((pl) => pl.id === +id);

    if (!playL) {
      return res.status(404).json({ message: "playlist not found" });
    }

    playL.nome = nome || playL.nome;
    playL.tags = tags || playL.tags;

    res.json(playL);
  },

  // DELETE /playlist/:id
  delete: (req, res) => {
    const { id } = req.params;
    const index = playlist.findIndex((pl) => pl.id === +id);

    if (index === -1) {
      return res.status(404).json({ message: "playlist not found" });
    }

    const deletedPlaylist = playlist.splice(index, 1);
    res.json(deletedPlaylist);
  },

  // POST /playlist/:id/musicas
  addMusic: (req, res) => {
    const { id } = req.params;
    const { nome, autor, album, duracao } = req.body;

    const playL = playlist.find((pl) => pl.id === +id);

    if (!playL) {
      return res.status(404).json({ message: "playlist not found" });
    }

    const newMusica = { nome, autor, album, duracao };
    playL.musicas.push(newMusica);

    res.status(201).json(newMusica);
  },

  // DELETE /playlist/:playlistId/musicas/:musicNome
  removeMusic: (req, res) => {
    const { playlistId, musicNome } = req.params;

    const playL = playlist.find((pl) => pl.id === +playlistId);

    if (!playL) {
      return res.status(404).json({ message: "playlist not found" });
    }

    const musicIndex = playL.musicas.findIndex(
      (m) => m.nome.toLowerCase() === musicNome.toLowerCase()
    );

    if (musicIndex === -1) {
      return res.status(404).json({ message: "music not found" });
    }

    playL.musicas.splice(musicIndex, 1);

    res.status(204).end();
  },
};
