# cinemagic-backend

.env configuration:
DB_URL = 'mongodb+srv://<username>:<password>@cluster0-a5pcq.mongodb.net/test?retryWrites=true&w=majority'
DB_PASSWORD = '<db_user_password>'
DB_USER = '<db_user_name>'
JWT_EXPIRES_IN = '<expiration_time_of_jwt_token><m/h/d>'
JWT_COOKIE_EXPIRES_IN = '<jwt_token_cookie_expiration_time_houres>'
NODE_ENV = '<development/production>'
PORT = <default=5000>
WS_PORT = '<port for webSocket connection>'
ORIGINS_WHITE_LIST = <[list_of_allowed_origins]>
SEAT_BLOCKING_TIME = '<The time seat is blocked for after adding to reservation in seconds>'
