"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ProductList_1 = require("./ProductList");
var AddProduct = /** @class */ (function (_super) {
    __extends(AddProduct, _super);
    function AddProduct(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { title: "", loading: true, product: new ProductList_1.ProductData };
        var productid = _this.props.match.params["productid"];
        if (productid > 0) {
            // set form with existing product data
            fetch('api/Products/' + productid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Edit", loading: false, product: data });
            });
        }
        else {
            // initialize blank form
            _this.state = { title: "Create", loading: false, product: new ProductList_1.ProductData };
        }
        _this.FuncSave = _this.FuncSave.bind(_this);
        return _this;
    }
    //this method will render html onto the DOM.
    AddProduct.prototype.render = function () {
        var contents = this.state.loading ? React.createElement("p", null, "Loading...") : this.renderCreateForm();
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Product"),
            React.createElement("hr", null),
            contents);
    };
    AddProduct.prototype.FuncSave = function (event) {
        var _this = this;
        event.preventDefault();
        var form = new FormData(event.target);
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
                .then(function (response) { return alert("Product modified."); })
                .then(function (response) {
                _this.props.history.push("/");
            });
        }
        else {
            fetch('api/Products', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: json
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/");
            });
        }
    };
    AddProduct.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.FuncSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "Id", value: this.state.product.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Name" }, "Name"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Name", defaultValue: this.state.product.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Category" }, "Category"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Category", defaultValue: this.state.product.category, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Active" }, "Is Active"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", name: "Active", defaultValue: this.state.product.active.toString(), required: true },
                        React.createElement("option", { value: "true" }, "True"),
                        React.createElement("option", { value: "false" }, "False")))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Price" }, "Price"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Price", defaultValue: this.state.product.price, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"))));
    };
    return AddProduct;
}(React.Component));
exports.AddProduct = AddProduct;
//# sourceMappingURL=AddProduct.js.map