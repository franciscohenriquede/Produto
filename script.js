const apiUrl = 'http://localhost:8090/produtos'; // Altere para a URL correta da sua API

document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.getElementById('productId').value;
    const produto = {
        nome: document.getElementById('nome').value,
        codigo: document.getElementById('codigo').value,
        preco: parseFloat(document.getElementById('preco').value),
        descricao: document.getElementById('descricao').value,
        quantidadeEstoque: parseInt(document.getElementById('quantidadeEstoque').value),
        avaliacao: document.getElementById('avaliacao').value,
        categoria: document.getElementById('categoria').value,
    };

    try {
        if (id) {
            // Atualiza o produto
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });
        } else {
            // Cria um novo produto
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });
        }
        clearForm();
        fetchProducts();
    } catch (error) {
        console.error('Erro ao salvar o produto:', error);
    }
});

async function fetchProducts() {
    const response = await fetch(apiUrl);
    const produtos = await response.json();
    const tbody = document.querySelector('#productList tbody');
    tbody.innerHTML = ''; // Limpa a tabela

    produtos.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.codigo}</td>
            <td>${produto.preco}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidadeEstoque}</td>
            <td>${produto.avaliacao}</td>
            <td>${produto.categoria}</td>
            <td>
                <button onclick="editProduct(${produto.id})">Editar</button>
                <button onclick="deleteProduct(${produto.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const produto = await response.json();

    document.getElementById('productId').value = produto.id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('codigo').value = produto.codigo;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('quantidadeEstoque').value = produto.quantidadeEstoque;
    document.getElementById('avaliacao').value = produto.avaliacao;
    document.getElementById('categoria').value = produto.categoria;
}

async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
    fetchProducts();
}

function clearForm() {
    document.getElementById('productId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('quantidadeEstoque').value = '';
    document.getElementById('avaliacao').value = '';
    document.getElementById('categoria').value = '';
}

fetchProducts(); // Carrega os produtos ao iniciar
