const mongoose = require('mongoose');

// mongoose.connect(`mongodb+srv://bar0147:Bar2741996@cluster0.z8isviq.mongodb.net/?retryWrites=true&w=majority`);

const mongoConnect = () => {
  let URI = `mongodb+srv://bar0147:Bar2741996@cluster0.z8isviq.mongodb.net/?retryWrites=true&w=majority`;
  //   if (process.env.NODE_ENV !== 'production') {
  //     URI = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.z8isviq.mongodb.net/?retryWrites=true&w=majority`;
  //   } else {
  //     URI = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.fzdkr.mongodb.net/${process.env.PRO_ATLAS_DB}?retryWrites=true&w=majority`;
  //   }

  mongoose.connect(URI);
  mongoose.connection
    .once('open', () => {
      console.info(`Mongoose has connected!`);
    })
    .on('error', (error) => console.error(error));
};

module.exports = { mongoConnect };
