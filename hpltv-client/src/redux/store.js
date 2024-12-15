import { configureStore } from '@reduxjs/toolkit';
import { SeriesSlice } from './slice/home/series';
import { MoviesSlice } from './slice/home/movies';
import { CategorySlice } from './slice/category/category';
import { MoviesMostNewSlice, SeriesMostNewSlice } from './slice/film/MostNew';
import {
  MoviesMostRatingSlice,
  SeriesMostRatingSlice,
} from './slice/film/MostRating';
import {
  MoviesMostViewSlice,
  SeriesMostViewSlice,
} from './slice/film/MostView';
import { SameMoviesSlice, SameSeriesSlice } from './slice/film/SameMovies';
import { CommentSlice } from './slice/comment/comment';
import { OrderSlice } from './slice/order';
import { PackageSlice } from './slice/package';
import { FilmForSeriesSlice } from './slice/home/filmforseries';
export const store = configureStore({
  reducer: {
    seriesSlice: SeriesSlice.reducer,
    moviesSlice: MoviesSlice.reducer,
    filmForSeriesSlice: FilmForSeriesSlice.reducer,
    categorySlice: CategorySlice.reducer,
    moviesMostNewSlice: MoviesMostNewSlice.reducer,
    moviesMostRatingSlice: MoviesMostRatingSlice.reducer,
    moviesMostViewSlice: MoviesMostViewSlice.reducer,
    sameMoviesSlice: SameMoviesSlice.reducer,
    seriesMostNewSlice: SeriesMostNewSlice.reducer,
    seriesMostRatingSlice: SeriesMostRatingSlice.reducer,
    seriesMostViewSlice: SeriesMostViewSlice.reducer,
    sameSeriesSlice: SameSeriesSlice.reducer,
    commentSlice: CommentSlice.reducer,
    orderSlice: OrderSlice.reducer,
    packageSlice: PackageSlice.reducer,
  },
});
