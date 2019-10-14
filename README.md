# ReactCrudApp

This app provides CRUD functionality on a list of products. The app is built with ASP.Net Core 2.1 for the backend and React for the frontend. The app uses EntityFramework Core to communicate with the database.

## Backend 

### API

The ProductsController provides the rest API methods used by the front end. The list of APIs is:

**POST api/Products**: Adds a new product to the table

**GET api/Products**: Gets all the products from the table

**GET api/Products/{id}**: Get a specific product, passing in the ID

**PUT api/Products/{id}**: Modifies an existing product

**DELETE api/Products/{id}**: Deletes an existing product


### Database

The model for the product is in the Product.cs class under the Models folder. 

You can setup the database locally (using for example the (localdb)\MSSQLLocalDB server) by using Entity Framework Core to build the database based on the model by running the *Update-Database* command in the Package Manager Console. I have included some migrations to seed the initial data.

## Frontend

As this app uses React, there are two components used, **ProductList** to display the list of products and **AddProduct** to add or edit a product.

### Product List

The home page, under the path **/**, uses the ProductList component to call the **GET api/Products** API to retrieve all the products and render them in a HTML table. The table provides action links to edit and delete the products.

### Create Product

This page, under the path **/addproduct**, uses the AddProduct component to display an empty form. After the form is submitted, the form data is transformed to a JSON object and passed to the **POST api/Products** API to add a new product record in the database.

### Edit Product

This page, under the path **/editproduct/:productid**, uses the AddProduct component. It first retrieves the data of an existing product, based on the productid param in the route, using the **GET api/Products/{id}** API. It then popolates the form with this default data and after the form is submitted, the form data is transformed to a json object and sent to the **PUT api/Products/{id}** API to update the product record in the database.

