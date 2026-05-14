const userSchema = new mongoose.Schema(
  {
    fullname: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,
    
    phone: String,

    address: String,

    role: {
      type: String,
      enum: ["user", "employee", "admin"],
      default: "user",
    },

    // only for employee
    service: [String],
  },
  {
    timestamps: true,
  }
);