// features/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 Trending All (for hero)
// export const fetchTrending = createAsyncThunk(
//   "movies/fetchTrending",
//   async () => {
//     const options = {
//       method: "GET",
//       // url: "https://api.themoviedb.org/3/trending/all/week",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
//       },
//     };

//     const response = await fetch(
//       "https://api.themoviedb.org/3/trending/all/week?&region=IN",
//       options
//     );
//     const data = await response.json();

//     return data.results; // Only return array of movies
//   }
// );

// export const fetchTvDrama = createAsyncThunk(
//   "movies/fetchTvDrama",
//   async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
//       },
//     };

//     const response = await fetch(
//       "https://api.themoviedb.org/3/discover/tv?&with_original_language=en",
//       options
//     );
//     const data = await response.json();

//     return data.results; // Only return array of movies
//   }
// );

// export const fetchPopular = createAsyncThunk(
//   "movies/fetchPopular",
//   async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
//       },
//     };

//     const response = await fetch(
//       "https://api.themoviedb.org/3/discover/movie?with_original_language=hi&sort_by=popularity.deschttps://api.themoviedb.org/3/discover/movie?with_original_language=hi&sort_by=popularity.desc&primary_release_date.gte=2024-04-18",
//       options
//     );
//     const data = await response.json();

//     return data.results; // Only return array of movies
//   }
// );

// export const fetchDiscover = createAsyncThunk(
//   "movies/fetchDiscover",
//   async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
//       },
//     };

//     const response = await fetch(
//       "https://api.themoviedb.org/3/discover/movie",
//       options
//     );
//     const data = await response.json();

//     return data.results; // Only return array of movies
//   }
// );

export const fetchTrending = createAsyncThunk(
  "movie/fetchTrending",
  async () => {
    const res = await axios.get("/api/trending?category=trending");
    return res.data.results;
  }
);

export const fetchPopular = createAsyncThunk("movie/fetchPopular", async () => {
  const res = await axios.get("/api/popular");
  return res.data.results;
});

export const fetchDiscover = createAsyncThunk(
  "movie/fetchDiscover",
  async () => {
    const res = await axios.get("/api/trending?category=discover");
    return res.data.results;
  }
);

export const fetchTvDrama = createAsyncThunk("movie/fetchTvDrama", async () => {
  const res = await axios.get("/api/tvDrama");
  return res.data.results;
});

export const fetchAction = createAsyncThunk("movie/fetchAction", async () => {
  const res = await axios.get("/api/category/action");
  return res.data.results;
});
export const fetchKDrama = createAsyncThunk("movie/fetchKDrama", async () => {
  const res = await axios.get("/api/kdrama");
  return res.data.results;
});
export const fetchThriller = createAsyncThunk(
  "movie/fetchThriller",
  async () => {
    const res = await axios.get("/api/category/thriller");
    return res.data.results;
  }
);
export const fetchComedy = createAsyncThunk("movie/fetchComedy", async () => {
  const res = await axios.get("/api/category/comedy");
  return res.data.results;
});
export const fetchSciFi = createAsyncThunk("movie/fetchSciFi", async () => {
  const res = await axios.get("/api/category/scifi");
  return res.data.results;
});
export const fetchFamily = createAsyncThunk("movie/fetchFamily", async () => {
  const res = await axios.get("/api/category/family");
  return res.data.results;
});
export const fetchDocumentary = createAsyncThunk(
  "movie/fetchDocumentary",
  async () => {
    const res = await axios.get("/api/documentary");
    return res.data.results;
  }
);
export const fetchAnimation = createAsyncThunk(
  "movie/fetchAnimation",
  async () => {
    const res = await axios.get("/api/category/animation");
    return res.data.results;
  }
);
export const fetchRomance = createAsyncThunk("movie/fetchRomance", async () => {
  const res = await axios.get("/api/romance");
  return res.data.results;
});
// export const fetchWebSeries = createAsyncThunk(
//   "movie/fetchWebSeries",
//   async () => {
//     const res = await axios.get("/api/webseries");
//     return res.data.results;
//   }
// );
export const fetchHorror = createAsyncThunk("movie/fetchHorror", async () => {
  const res = await axios.get("/api/category/horror");
  return res.data.results;
});

//browse-by-languages
export const fetchMoviesByLanguage = createAsyncThunk(
  "movies/fetchByLanguage",
  async (languageCode) => {
    const res = await fetch(
      `${BASE_URL}/discover/movie?with_original_language=${languageCode}&api_key=${API_KEY}`
    );
    const data = await res.json();
    return { languageCode, movies: data.results };
  }
);

// 🔎 Search
export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults",
  async (query) => {
    const res = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
    );
    return res.data.results;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    popularMovies: [],
    popularTV: [],
    webseries: [],
    scifi: [],
    romance: [],
    action: [],
    thriller: [],
    comedy: [],
    documentary: [],
    family: [],
    animation: [],
    horror: [],
    kDrama: [],
    tvDrama: [],
    discover: [],
    searchResults: [],

    moviesByLanguage: {},
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
      })
      .addCase(fetchDiscover.fulfilled, (state, action) => {
        state.discover = action.payload;
      })
      .addCase(fetchAction.fulfilled, (state, action) => {
        state.action = action.payload;
      })
      // .addCase(fetchWebSeries.fulfilled, (state, action) => {
      //   state.webseries = action.payload;
      // })

      .addCase(fetchSciFi.fulfilled, (state, action) => {
        state.scifi = action.payload;
      })
      .addCase(fetchRomance.fulfilled, (state, action) => {
        state.romance = action.payload;
      })

      .addCase(fetchThriller.fulfilled, (state, action) => {
        state.thriller = action.payload;
      })
      .addCase(fetchComedy.fulfilled, (state, action) => {
        state.comedy = action.payload;
      })
      .addCase(fetchDocumentary.fulfilled, (state, action) => {
        state.documentary = action.payload;
      })
      .addCase(fetchFamily.fulfilled, (state, action) => {
        state.family = action.payload;
      })
      .addCase(fetchAnimation.fulfilled, (state, action) => {
        state.animation = action.payload;
      })
      .addCase(fetchHorror.fulfilled, (state, action) => {
        state.horror = action.payload;
      })
      .addCase(fetchKDrama.fulfilled, (state, action) => {
        state.kDrama = action.payload;
      })
      .addCase(fetchTvDrama.fulfilled, (state, action) => {
        state.tvDrama = action.payload;
      })
      // .addCase(fetchSearchResults.fulfilled, (state, action) => {
      //   state.searchResults = action.payload;
      // })
      .addCase(fetchMoviesByLanguage.fulfilled, (state, action) => {
        const { languageCode, movies } = action.payload;
        state.moviesByLanguage[languageCode] = movies;
      });
  },
});

export default movieSlice.reducer;
