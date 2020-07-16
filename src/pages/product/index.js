import React, { Component } from 'react';
import api from '../../services/api'
import './styles.css';
export default class Product extends Component {
    state = {
        product: {}
    }
    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data })
    }
    //Mostrar formulario para atualização de produto
    showForm = () => {
        var display = document.getElementById('form').style.display;
        if (display === "none")
            document.getElementById('form').style.display = 'block';
        else
            document.getElementById('form').style.display = 'none';
    }
    //Atualizar Produto
    updateProduct = async () => {
        const { id } = this.props.match.params;
        if (this.refs.title.value === '' || this.refs.description.value === '' || this.refs.url.value === '') {
            return alert('Preencha todos os campos')
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.refs.title.value,
                description: this.refs.description.value,
                url: this.refs.url.value
            })

        };
        await fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
            .then(response => response.json())
            .catch(function () {
                console.log("Erro, o produto não foi criado");
            });
        document.location.reload(true);

    }
    //Deletar Produto
    deleteProduct = async () => {
        const { id } = this.props.match.params;

        await fetch(`http://localhost:3001/api/products/${id}`,
            { method: 'delete' })
            .then(response => response.json(), alert('Produto deletado com sucesso!'))
            .catch(function () {
                console.log("Erro, o produto não foi criado");
            });
        window.location.assign('http://localhost:3000');




    }
    
    render() {
        const { product } = this.state;
        return (
            <div className="container">
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Url: <a href={product.url}>{product.url}</a>
                    </p>
                </div>
                <div >
                    <div className="btns">
                        <input type="button" value="Atualizar Produto" onClick={this.showForm} /><br />
                        <input type="button" value="Deletar Produto" onClick={this.deleteProduct} />
                    </div>
                </div>
                <form id="form" className="form-update" method="POST" >

                    <label>Nome:
                        <input type="text" ref='title' defaultValue={product.title} name="title" />
                    </label><br></br>
                    <label>Descrição:
                            <input type="text" ref='description' defaultValue={product.description} name="description" />
                    </label><br></br>
                    <label>URL:
                            <input type="text" ref='url' defaultValue={product.url} name="url" />
                    </label><br></br>
                    <input type="button" value="Atualizar" onClick={this.updateProduct} />
                </form>

            </div>
        )
    }
}