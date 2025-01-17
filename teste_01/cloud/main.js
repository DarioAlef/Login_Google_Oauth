const Product = Parse.Object.extend("Produto");
const Marca = Parse.Object.extend("Marca");

// Parse.Cloud.define("hello", (request) => {
//   const name = request.params.name;
//  return("Hello, " + name + "!");
// });

Parse.Cloud.define("criar-produto", async (request) => {
  const Estoque = request.params.Estoque;
  if (Estoque == null || Estoque < 0 || Estoque > 1000) 
    throw "Estoque deve ser maior que zero e menor que 1000";
  if(request.params.marcaId == null) throw "Marca inválida";

  const product = new Product();
  const marca = new Marca();
  marca.id = request.params.marcaId;

  product.set("nome", request.params.nome);
  product.set("Preco", request.params.Preco);
  product.set("Estoque", request.params.Estoque);
  product.set("marca", marca);
  product.set("Vendendo",  true)
  const savedProduct = await product.save(null, { useMasterKey: true });
  return savedProduct.id
});

Parse.Cloud.define("mudar-preco", async (request) => {
  if(request.params.Preco == null || request.params.Preco < 0)
    throw "Preço deve ser maior que zero";
  if(request.params.ProdutoId == null)
    throw "ProdutoId não pode ser nulo";
  
  const product = new Product();
  product.id = request.params.ProdutoId;
  product.set("Preco", request.params.Preco);
  const savedProduct = await product.save(null, { useMasterKey: true });
  return savedProduct.get("Preco");
});

Parse.Cloud.define("deletar-produto", async (request) => {
  if(request.params.Preco == null || request.params.Preco < 0)
    throw "Produto não encontrado";
  
  const product = new Product();
  product.id = request.params.ProdutoId;

  await product.destroy({ useMasterKey: true });

  return "Produto deletado";
});

Parse.Cloud.define("get-produtos", async (request) => {
  if(request.params.ProdutoId == null)
    throw "Prodiuto inválido";

  const query = new Parse.Query(Product);
  query.include("Marca")
  const produto = await query.get(request.params.ProdutoId, { useMasterKey: true });
  const json = produto.toJSON();
  return {
    nome: json.nome,
    Preco: json.Preco,
    Estoque: json.Estoque,
    MarcaNome: json.Marca != null ? json.Marca.nome: "sem marca vinculada",
  };
});

Parse.Cloud.define("listar-produtos", async (request) => {
  const query = new Parse.Query(Product);

  query.greaterThan("Preco", 200);
  query.equalTo("Vendendo", true);
  query.lessThanOrEqualTo("Preco", 3000);
  query.ascending("Preco");

  const produto = await query.find({ useMasterKey: true});
  return produto.map(function(p) {
    p = p.toJSON();
    return {
      nome: p.nome,
      Preco: p.Preco,
      Estoque: p.Estoque,
    };
  });
});

Parse.Cloud.define("sign-up", async (request) => {
  if(request.params.email == null)
    throw "Email inválido";
  if(request.params.password == null)
    throw "Senha inválida";
  if(request.params.nome == null)
    throw "Nome inválido";

  const user = new Parse.User();
  user.set("username", request.params.email);
  user.set("email", request.params.email);
  user.set("password", request.params.password);
  user.set("nome", request.params.nome);
  user.set("cidade", request.params.cidade);

  const savedUser = await user.signUp(null, { useMasterKey: true });

  return savedUser;
});

// Parse.Cloud.define("get-current-user", async (request) => {

// });