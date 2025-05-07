import { PrismaClient } from "@prisma/client";
import {generatetoken, hashpassword} from "../utils/auth.js"

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar todos os usuários",
      erro: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //tento fazer algo aqui
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    // se der erro faça isso aqui
    res.status(500).json({
      mensagem: "Erro ao criar o novo usuário",
      erro: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      mensagem: "Erro ao atualizar usuário",
      erro: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(["Usuário excluido com sucesso"]);
  } catch (error) {
    res.status(400).json({
      mensagem: "Erro ao deletar usuário",
      erro: error.message,
    });
  }
};

export const oneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      mensagem: "Erro ao tentar encontrar o usuário",
      erro: erro.mensage,
    });
  }
};

export const registerUser = async (req, res) =>{
    const {name, email, password} = req.body

    try {
        //criar a senha do usuario hasheada
        const hashedpassword = await hashpassword(password)
        //crias usuarios no banco de dados 
        const newRegister = await prisma.user.create({
            data: {name: name,
                   email: email,
                   password: hashedpassword
                }
        })
        //gerar um token JWT
        const token = generatetoken(newRegister)
        res.status(201).json({
          nome: newRegister.name,
          email: newRegister.email,
          token: token
        })
    } catch (error) {
       res.status(400).json({
        erro:"erro ao criar usuario",
        detalhes: error.mensage

    }) 
       
    }
}