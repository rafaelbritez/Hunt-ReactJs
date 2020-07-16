import React, { Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
export default class Main extends Component {
        state = {
            products: [],
            productInfo: [],
            page: 1,

            
        }
       componentDidMount() {
            this.loadProducts();

        }        
        //Carregando produtos da API 
        loadProducts = async (page = 1) => {
            const response = await api.get(`/products?page=${page}`);

            const { docs, ...productInfo } = response.data;

            this.setState({ products: docs, productInfo, page });

            

        };
        //Paginação anterior
        prevPage = () => {
            const { page } = this.state;
            if (page === 1) return;

            let pageNumber = page - 1;

            this.loadProducts(pageNumber);
           
        }
        //Paginação proxima
        nextPage = () => {
    
            const { page, productInfo } = this.state;
            if (page === productInfo.pages) return;

            let pageNumber = page + 1;
            this.loadProducts(pageNumber);
            
        }
        //Criação de produto
         createProduct = async () =>{
            if(this.refs.title.value ==='' ||this.refs.description.value === ''||this.refs.url.value === ''){
                return alert('Preencha todos os campos')
            }
                       
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: this.refs.title.value,
                    description: this.refs.description.value,
                    url: this.refs.url.value
                })
            };
            
            await fetch('http://localhost:3001/api/products', requestOptions)
            .then(response =>response.json(), alert(`Produto criado com sucesso!`))
            .catch(function() {console.log("Erro, o produto não foi criado");
            });
            this.refs.title.value ="";
            this.refs.description.value ="";
            this.refs.url.value ="";
            document.location.reload(true);

        }
    render() {
        const { products, page, productInfo: { pages } } = this.state;

        return (
            <div>
                <div className="title">
                    <strong>Crie um novo produto:</strong><br></br>
                </div>
                <form className="form-create" method="POST" >

                    <label>Nome:
                        <input type="text" ref='title'  name="title"  />
                    </label><br></br>
                    <label>Descrição:
                            <input type="text" ref='description'  name="description" />
                    </label><br></br>
                    <label>URL:
                            <input type="text" ref='url'   name="url"/>
                    </label><br></br>
                    <input type="button" value="Cadastrar Produto" onClick={this.createProduct} />
                </form>
                <div className="title">
                    <strong>Lista de produtos:</strong><br></br>
                </div>
                <div className="product-list">
                    {
                        products.map(product => (
                            <article key={product._id}>
                                <strong>{product.title}</strong>
                                <p>{product.description}</p>
                                <Link to={`/products/${product._id}`}>Acessar</Link>
                            </article>
                        ))
                    }
                    <div className="action">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled={page === pages} onClick={this.nextPage}>Próximo</button>
                    </div>
                </div>
            </div>

        )
    }

}