module.exports = {
  EXPIRES_IN: new Date().getTime() + 2 * 60 * 1000,
  MongoDBIdPatern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  ROLES: {
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  },
  ACCESS_TOKEN_SECRET_KEY:
    "5354942289674580365371B3A9FB2F7548AE3BDBAA306E3857BD6723C84394D8",
  REFRESH_TOKEN_SECRET_KEY:
    "72443CFC6007F1D247AA44015E82F47E8E7A00D159C19F090AA7B6D17B8AB30F",
};
