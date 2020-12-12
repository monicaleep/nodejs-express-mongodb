module.exports = mongoose => {
  // make our model
  const Tutorial = mongoose.model(
    'tutorial',
    // define the schema inline
    mongoose.Schema({
      title: String,
      description: String,
      published: Boolean
    },
    //Auto generates timestamps
    {timestamps: true}
    )
  )
  return Tutorial
}
