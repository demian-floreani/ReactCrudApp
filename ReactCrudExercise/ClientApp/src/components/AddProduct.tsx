import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProductData } from './ProductList';

interface AddProductRecordState {
    title: string;
    loading: boolean;
    product: ProductData;
}

export class AddProduct extends React.Component<RouteComponentProps<{}>, AddProductRecordState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, product: new ProductData };

        var productid = this.props.match.params["productid"];

        if (productid > 0) {
            // set form with existing product data
            fetch('api/Products/' + productid)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, product: data });
                });
        }
        else {
            // initialize blank form
            this.state = { title: "Create", loading: false, product: new ProductData };
        }

        this.FuncSave = this.FuncSave.bind(this);
    }
    //this method will render html onto the DOM.
    public render() {
        let contents = this.state.loading ? <p>Loading...</p> : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    private FuncSave(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        // build the Json object from the form data
        var object = {};
        form.forEach(function (value, key) {
            object[key] = value;
        });
        var json = JSON.stringify(object);

        if (this.state.product.id) {
            fetch('api/Products/' + this.state.product.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: json
            })
            .then((response) => alert("Product modified."))
            .then((response) => {
                this.props.history.push("/");
            })
        }
        else {
            fetch('api/Products', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: json
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/");
                })
        }
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.FuncSave} >
                <div className="form-group row">
                    <input type="hidden" name="Id" value={this.state.product.id} />
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Name" >Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Name" defaultValue={this.state.product.name} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Category" >Category</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Category" defaultValue={this.state.product.category} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Active" >Is Active</label>
                    <div className="col-md-4">
                        <select className="form-control" name="Active" defaultValue={this.state.product.active.toString()} required>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Price" >Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Price" defaultValue={this.state.product.price} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                </div >
            </form >
        )
    }
}