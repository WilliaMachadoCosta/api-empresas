import fastify from "fastify";
import { supabase } from "./supabaseConnection";

const app = fastify();

type empresa = {
  nome: string;
  cnpj: string;
}

app.get("/empresas", async () => {
  try {
    const { data: empresas } = await supabase.from("empresas").select("*")
    return { value: empresas };
  } catch (error) {
    console.error(error);
    throw error
  }

});

app.post("/empresas", async (request, response) => {
  try {
    const { nome, cnpj } = await request.body as empresa
    const { data: createEmpresa } = await supabase.from("empresa").insert([{
      nome,
      cnpj
    }]).select()

    return {
      value: createEmpresa ? createEmpresa[0] : null
    }
  } catch (error) {
    console.error(error);
    throw error
  }
});

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log('servidor funcionando ...')
})