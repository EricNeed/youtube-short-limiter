
module.exports = ({ config }) => ({
    ...config, // This carries over values from app.json if you still have it
    android: {
      ...config.android,
      package: "com.yourname.youtubelimiter", // Ensure this is here!
    },
    plugins: [
      "./plugins/", // Use the .js file
    ],
})
