import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchProductDataState {
    prodList: ProductData[];
    loading: boolean;
}

export class ProductList extends React.Component<RouteComponentProps<{}>, FetchProductDataState> {
    constructor(props) {
        super(props);
        this.state = { prodList: [], loading: true };

        fetch('api/Products')
            .then(response => response.json() as Promise<ProductData[]>)
            .then(data => {
                this.setState({ prodList: data, loading: false });
            });

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    public render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderProductTable(this.state.prodList);

        return <div>
            <h2>Products List</h2>
            <p><Link to="/addproduct">Add Product</Link></p>
            {contents}
        </div>;
    }

    private renderProductTable(prodList: ProductData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Is Active</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {prodList.map(product =>
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.active.toString()}</td>
                        <td>{product.price}</td>
                        <td><a className="action" onClick={(id) => this.handleEdit(product.id)}>Edit</a>/
                            <a className="action" onClick={(id) => this.handleDelete(product.id)}>Delete</a></td>  
                    </tr>
                )}
            </tbody>
        </table>;
    }

    private handleDelete(id: number) {  
        fetch('api/Products/' + id, {
            method: 'delete'
        }).then((response) => {
            window.location.reload();
        })
    }

    private handleEdit(id: number) {
        this.props.history.push("/editproduct/" + id);
    }  
}

export class ProductData {
    id: number = 0;
    name: string = "";
    category: string = "";
    active: boolean = false;
    price: number = 0;
}
