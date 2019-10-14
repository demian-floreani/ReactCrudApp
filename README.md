# ReactCrudApp

This app provides CRUD functionality on a list of products. The app is built with ASP.Net Core 2.1 for the backend and React for the frontend. The app uses EntityFramework Core to communicate with the database.

## Backend

# API

The ProductsController provides the rest API methods used by the front end. The list of APIs is:

**POST api/Products**: Adds a new product to the table

**GET api/Products**: Gets all the products from the table

**GET api/Products/{id}**: Get a specific product, passing in the ID

**PUT api/Products/{id}**: Modifies an existing product

**DELETE api/Products/{id}**: Deletes an existing product


# Database

The model for the product is in the Product.cs class under the Models folder. 

You can setup the database locally by using Entity framework Core to build the database based on the model by running the *Update-Database* command in the Package Manager Console. I have included some migrations to seed some initial data.

## Frontend

As this app uses React, there are two components used, **ProductList** to display the list of products and **AddProduct** to add or edit a product.

# Product List

The ProductList component calls the **GET api/Products API** to retrieve all the products and render them in a HTML table. 

# Create Product

This page uses the AddProduct component to create a product by passing a json object from the form to the **POST api/Products** API.

# Edit Product

This page uses the AddProduct component. It first retrieves the information of a product using the **GET api/Products/{id}** API and popolates the form with this default information. After the form is submitted, the json object is sent to the **PUT api/Products/{id}** API to update the product record in the database.

