const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
app.use(
'/auth/google',
createProxyMiddleware({
    target: 'http://localhost:5000/',
    changeOrigin: true,
})
);
app.use('/api/logout',createProxyMiddleware({
    target: 'http://localhost:5000/',
    changeOrigin: true
    
}));

app.use('/api/current_user',createProxyMiddleware({
    target: 'http://localhost:5000/',
    changeOrigin: true
    
}));

}; 