module.exports.iniciaChat = (app, req, res) => {
    const dados = req.body;

    req.assert('apelido', 'Nome é obrigatório').notEmpty()
    req.assert('apelido', 'Nome deve conter entre 4 e 16 caracteres').len(4, 16)

    const erros = req.validationErrors()

    if(erros){
        res.render('index', {validacao : erros})
        return
    }

    app.get('io').emit('msg', {
        apelido : dados.apelido,
        mensagem : 'acabou de entrar no chat'
    })

    res.render('chat', {dadosForm : dados})
}