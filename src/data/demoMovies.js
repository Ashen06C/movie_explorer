// A small offline preview keeps the interface useful before a TMDb key is configured.
export const demoMovies = [
  {
    id: 693134, title: 'Dune: Part Two', release_date: '2024-02-27', vote_average: 8.1,
    genre_ids: [878, 12], genres: [{ id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }],
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between love and the fate of the universe, he must prevent a terrible future only he can foresee.',
    runtime: 166, credits: { cast: [{ name: 'Timothée Chalamet', character: 'Paul Atreides' }, { name: 'Zendaya', character: 'Chani' }, { name: 'Rebecca Ferguson', character: 'Lady Jessica' }, { name: 'Javier Bardem', character: 'Stilgar' }] },
  },
  {
    id: 872585, title: 'Oppenheimer', release_date: '2023-07-19', vote_average: 8.1,
    genre_ids: [18, 36], genres: [{ id: 18, name: 'Drama' }, { id: 36, name: 'History' }],
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    overview: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    runtime: 181, credits: { cast: [{ name: 'Cillian Murphy', character: 'J. Robert Oppenheimer' }, { name: 'Emily Blunt', character: 'Kitty Oppenheimer' }, { name: 'Robert Downey Jr.', character: 'Lewis Strauss' }] },
  },
  {
    id: 346698, title: 'Barbie', release_date: '2023-07-19', vote_average: 7.0,
    genre_ids: [35, 12], genres: [{ id: 35, name: 'Comedy' }, { id: 12, name: 'Adventure' }],
    poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', backdrop_path: '/nHf61UzkfFno5X1ofIhugCPus2R.jpg',
    overview: 'Barbie and Ken are having the time of their lives in the colorful world of Barbie Land. A chance to visit the real world leads to new discoveries.',
    runtime: 114, credits: { cast: [{ name: 'Margot Robbie', character: 'Barbie' }, { name: 'Ryan Gosling', character: 'Ken' }, { name: 'America Ferrera', character: 'Gloria' }] },
  },
  {
    id: 569094, title: 'Spider-Man: Across the Spider-Verse', release_date: '2023-05-31', vote_average: 8.3,
    genre_ids: [16, 28], genres: [{ id: 16, name: 'Animation' }, { id: 28, name: 'Action' }],
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    overview: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    runtime: 140, credits: { cast: [{ name: 'Shameik Moore', character: 'Miles Morales' }, { name: 'Hailee Steinfeld', character: 'Gwen Stacy' }, { name: 'Oscar Isaac', character: 'Miguel O’Hara' }] },
  },
  {
    id: 466420, title: 'Killers of the Flower Moon', release_date: '2023-10-18', vote_average: 7.6,
    genre_ids: [80, 18], genres: [{ id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }],
    poster_path: '/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg', backdrop_path: '/1X7vow16X7CnCoexXh4H4F2yDJv.jpg',
    overview: 'When oil is discovered beneath Osage Nation land in the 1920s, members of the community are murdered one by one.',
    runtime: 206, credits: { cast: [{ name: 'Leonardo DiCaprio', character: 'Ernest Burkhart' }, { name: 'Lily Gladstone', character: 'Mollie Burkhart' }, { name: 'Robert De Niro', character: 'William Hale' }] },
  },
  {
    id: 157336, title: 'Interstellar', release_date: '2014-11-05', vote_average: 8.5,
    genre_ids: [12, 18, 878], genres: [{ id: 12, name: 'Adventure' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Sci-Fi' }],
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    overview: 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
    runtime: 169, credits: { cast: [{ name: 'Matthew McConaughey', character: 'Cooper' }, { name: 'Anne Hathaway', character: 'Brand' }, { name: 'Jessica Chastain', character: 'Murph' }] },
  },
  {
    id: 155, title: 'The Dark Knight', release_date: '2008-07-16', vote_average: 8.5,
    genre_ids: [28, 80, 18], genres: [{ id: 28, name: 'Action' }, { id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }],
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop_path: '/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
    overview: 'Batman faces the Joker, a criminal mastermind whose chaos pushes Gotham City to its limits.',
    runtime: 152, credits: { cast: [{ name: 'Christian Bale', character: 'Bruce Wayne' }, { name: 'Heath Ledger', character: 'Joker' }, { name: 'Aaron Eckhart', character: 'Harvey Dent' }] },
  },
  {
    id: 76600, title: 'Avatar: The Way of Water', release_date: '2022-12-14', vote_average: 7.6,
    genre_ids: [878, 12], genres: [{ id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }],
    poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', backdrop_path: '/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    overview: 'Jake Sully lives with his newfound family on Pandora. When a familiar threat returns, he must work with Neytiri and the Na’vi to protect their home.',
    runtime: 192, credits: { cast: [{ name: 'Sam Worthington', character: 'Jake Sully' }, { name: 'Zoe Saldaña', character: 'Neytiri' }, { name: 'Sigourney Weaver', character: 'Kiri' }] },
  },
];

export const demoMovieById = (id) => demoMovies.find((movie) => String(movie.id) === String(id));
