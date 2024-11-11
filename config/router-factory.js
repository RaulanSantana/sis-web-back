// router-files.js
module.exports = [
    { path: '/reservas-sala', route: require('../routes/reservas-sala') },
    { path: '/reservas-labhab', route: require('../routes/reservas-labhab') },
    { path: '/reservas-labinfo', route: require('../routes/reservas-labinfo') },
    { path: '/usuario-login', route: require('../routes/login') },
    { path: '/reservas-gerais', route: require('../routes/reservas-gerais') }
];
