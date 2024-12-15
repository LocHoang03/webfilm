// lưu trữ các đường dẫn API gọi tới backend
export const API_FETCH_ALL_COMMON_QUESTIONS = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/common-questions`;

export const API_LOGIN = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/login`;
export const API_LOGIN_AUTHENTICATION = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/login-authentication`;
export const API_VERIFY_LOGIN = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/verify-login`;
export const API_LOGOUT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/logout`;
export const API_SIGNUP = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/signup`;
export const API_RESEND_CODE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/resend-code`;
export const API_NEW_PASSWORD = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/reset-password`;
export const API_FORGOT_PASSWORD = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/forgot-password`;
export const API_VERIFY_TOKEN_RESET_PASSWORD = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/auth/verify-token-reset-password`;

export const API_SERIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/film/series`;

export const API_MOVIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/film/movies`;

export const API_CATEGORY = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/category`;
export const API_SERIES_FEATURE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/series-feature`;
export const API_MOVIES_FEATURE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/movies-feature`;

export const API_MOVIES_MOST_NEW = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/most-new`;

export const API_SERIES_MOST_NEW = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/most-new`;

export const API_MOVIES_MOST_VIEW = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/most-view`;

export const API_SERIES_MOST_VIEW = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/most-view`;

export const API_MOVIES_MOST_RATING = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/most-rating`;

export const API_SERIES_MOST_RATING = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/most-rating`;

export const API_MOVIES_CAN_TO_MATCH = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/can-to-match`;

export const API_SERIES_CAN_TO_MATCH = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/can-to-match`;

export const API_UPDATE_PROFILE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/auth/profile?user=subscriber`;
export const API_CHANGE_PASSWORD = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/auth/change-password?user=subscriber`;
export const API_CHANGE_AVATAR = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/auth/change-avatar?user=subscriber`;
export const API_DELETE_AVATAR = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/auth/delete-avatar?user=subscriber`;
export const API_FETCH_COMMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/comment`;
export const API_ADD_COMMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/comment/add-comment`;
export const API_UPDATE_COMMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/comment/update-comment`;
export const API_DELETE_COMMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/comment/delete-comment`;
export const API_ADD_COMMENT_REPLY = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/comment/add-comment-reply`;
export const API_HANDLE_LIKE_MOVIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/handle-like-movies`;
export const API_HANDLE_LIKE_SERIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/handle-like-series`;
export const API_HANDLE_RATING_MOVIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/movies/handle-rating-movies`;
export const API_HANDLE_RATING_SERIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/film/series/handle-rating-series`;
export const API_GET_ALL_PAYMENT_DATA = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/package`;
export const API_POST_CREATE_CHECKOUT_SESSION = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/payment/create-checkout-session`;

export const API_ADD_DATA_PACKAGE_PAYMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/order/subscription-package`;
export const API_GET_PACKAGE_PAYMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/order/post-package-order`;
export const API_POST_PAYMENT = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/payment/create-payment-intent`;
export const API_GET_ALL_ORDER = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user/order`;
export const API_GET_ALL_PACKAGE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/package`;
export const API_VERIFY_TOKEN = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/auth/verify-token`;
export const API_CREATE_QUESTION_CUSTOMER = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/admin/customer-questions/create`;

export const API_CREATE_MESSAGE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/admin/message/create`;

export const API_UPDATE_MESSAGE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/admin/message/update`;

export const API_GET_ON_MESSAGE_USER = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/message/get-message-user`;

export const API_UPDATE_OFF_MESSAGE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/admin/message/update-off`;

export const API_GET_NEW_MOVIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/film/movies/get-new-movies`;

export const API_GET_NEW_SERIES = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/film/series/get-new-series`;

export const API_GET_ORDER_FROM_USER_ID = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/order/get-order`;

export const API_GET_ALL_COUNTRY = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/country`;

export const API_GET_LOGIN_GOOGLE = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/api/auth/google/`;
