import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../page/HomePage';

import MoviesPage from '../page/MoviesPage';
import SeriesPage from '../page/SeriesPage';
import ResultPage from '../page/ResultPage';
import DetailFilmPage from '../page/DetailFilmPage';
import ProfilePage from '../page/ProfilePage';
import MyFavoritePage from '../page/MyFavoritePage';
import PaymentPage from '../page/PaymentPage';
import OptionCheckoutPage from '../page/OptionCheckoutPage';
import PaySuccessPage from '../page/PaySuccessPage';
import CheckoutFormPage from '../page/CheckoutFormPage';
import ContactPage from '../page/ContactPage';
import TermAndConditionPage from '../page/TermAndConditionPage';
import DetailSeriesPage from '../page/DetailSeriesPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/my-favorite-movies" element={<MyFavoritePage />} />
      <Route path="/package-upgrade" element={<PaymentPage login={true} />} />
      <Route
        path="/payment-success"
        element={<PaySuccessPage login={true} />}
      />
      <Route
        path="/option-checkout"
        element={<OptionCheckoutPage login={true} />}
      />
      <Route path="/checkout" element={<CheckoutFormPage login={true} />} />
      <Route path="/search" element={<ResultPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/my-profile" element={<ProfilePage />} />
      <Route
        path="/film/:filmId"
        element={<DetailFilmPage watching={false} />}
      />
      <Route
        path="/watching-series/:seriesId/:number/"
        element={<DetailSeriesPage watching={true} exact />}
      />

      <Route
        path="/series/:seriesId"
        element={<DetailSeriesPage watching={false} />}
      />
      <Route
        path="/film/watching-movies/:filmId"
        element={<DetailFilmPage watching={true} />}
      />

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms-and-conditions" element={<TermAndConditionPage />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default Router;
