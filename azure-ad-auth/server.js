const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

passport.use(new OIDCStrategy({
    identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_AD_APP_TENANT_ID}/.well-known/openid-configuration`,
    clientID: process.env.AZURE_AD_APP_CLIENT_ID,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: process.env.REDIRECT_URL,
    allowHttpForRedirectUrl: true,
    passReqToCallback: false,
    scope: ['openid', 'email', 'profile'],
    clientSecret: process.env.AZURE_AD_APP_CLIENT_SECRET,
    nonceLifetime: null,
    nonceMaxAmount: 5,
    useCookieInsteadOfSession: false,
    cookieEncryptionKeys: [],
    clockSkew: 300,
  },
  (iss, sub, profile, accessToken, refreshToken, done) => {
    if (!profile.oid) {
      return done(new Error("No oid found"), null);
    }
    return done(null, profile);
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.oid);
});

passport.deserializeUser((oid, done) => {
  done(null, oid);
});
