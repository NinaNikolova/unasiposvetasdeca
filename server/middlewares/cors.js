// module.exports = () => (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

    
//     next();
// };

module.exports = () => (req, res, next) => {
  // TODO replace * with 'https://unasiposvetasdeca.vercel.app'
    res.setHeader('Access-Control-Allow-Origin', 'https://unasiposvetasdeca.vercel.app'); // Replace with the origin of your React.js app
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  };