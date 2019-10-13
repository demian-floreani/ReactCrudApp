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
var react_router_dom_1 = require("react-router-dom");
var ProductList = /** @class */ (function (_super) {
    __extends(ProductList, _super);
    function ProductList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { prodList: [], loading: true };
        fetch('api/Products')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ prodList: data, loading: false });
        });
        _this.handleEdit = _this.handleEdit.bind(_this);
        _this.handleDelete = _this.handleDelete.bind(_this);
        return _this;
    }
    ProductList.prototype.render = function () {
        var contents = this.state.loading ? React.createElement("p", null,
            React.createElement("em", null, "Loading...")) : this.renderProductTable(this.state.prodList);
        return React.createElement("div", null,
            React.createElement("h2", null, "Products List"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addproduct" }, "Add Product")),
            contents);
    };
    ProductList.prototype.renderProductTable = function (prodList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Product Id"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Category"),
                    React.createElement("th", null, "Is Active"),
                    React.createElement("th", null, "Price"),
                    React.createElement("th", null, "Actions"))),
            React.createElement("tbody", null, prodList.map(function (product) {
                return React.createElement("tr", { key: product.id },
                    React.createElement("td", null, product.id),
                    React.createElement("td", null, product.name),
                    React.createElement("td", null, product.category),
                    React.createElement("td", null, product.active.toString()),
                    React.createElement("td", null, product.price),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleEdit(product.id); } }, "Edit"),
                        "/",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(product.id); } }, "Delete")));
            })));
    };
    ProductList.prototype.handleDelete = function (id) {
        fetch('api/Products/' + id, {
            method: 'delete'
        }).then(function (response) {
            window.location.reload();
        });
    };
    ProductList.prototype.handleEdit = function (id) {
        this.props.history.push("/editproduct/" + id);
    };
    return ProductList;
}(React.Component));
exports.ProductList = ProductList;
var ProductData = /** @class */ (function () {
    function ProductData() {
        this.id = 0;
        this.name = "";
        this.category = "";
        this.active = false;
        this.price = 0;
    }
    return ProductData;
}());
exports.ProductData = ProductData;
//# sourceMappingURL=ProductList.js.map