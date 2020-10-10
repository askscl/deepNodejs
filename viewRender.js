res.render = function(view, data){
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);

    var html = render(view, data);
    res.render(html);
};

