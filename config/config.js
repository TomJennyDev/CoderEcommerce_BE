require("dotenv").config();

const env = process.env;

const config = {
  mongoose: {
    url: `${env.MONGO_DEV_URI}/${env.DB_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  email: {
    smtp: {
      service: "gmail",
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
    },
    from: env.EMAIL_FROM,
  },
  jwt: {
    secret: env.JWT_SECRET_KEY,
    accessExpiration: env.ACCESS_EXPIRATION,
  },
  passport: {
    facebook: {
      clientID: env.FACEBOOK_APP_ID,
      clientSecret: env.FACEBOOK_SECRET,
    },
    google: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  role: { user: env.ROLE_USER, admin: env.ROLE_ADMIN },
};

module.exports = config;
