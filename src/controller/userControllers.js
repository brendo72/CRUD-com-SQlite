export const getAllUsers  = (req, res)=>{
    res.status(200).json({
        mensagem:"Rota GET para todos os usuarios",
    })
};
export const novouser = (req, res)=>{
    res.status(200).json({
        nome:"joao",
        emeil:"joao@gmail.com"
    })
}