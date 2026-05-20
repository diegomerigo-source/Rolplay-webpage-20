import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    // Locale active when the user subscribed — for future localised emails
    locale: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr'],
    },
    // Where on the site the subscription came from
    source: {
      type: String,
      default: 'footer',
      enum: ['footer', 'blog', 'homepage'],
    },
    confirmed: {
      type: Boolean,
      default: true, // Single-opt-in for now; set false to switch to double-opt-in
    },
    // For unsubscribe links — random token stored hashed is not needed at this
    // scale; plain token is acceptable for a marketing site.
    unsubscribeToken: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

// email already indexed by unique:true above; only add the sort index
SubscriberSchema.index({ createdAt: -1 });

export default mongoose.models.Subscriber ||
  mongoose.model('Subscriber', SubscriberSchema);
