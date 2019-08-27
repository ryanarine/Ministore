## Project Overview
This project is a pseudo E-Commerce website I am making with Java Spring and MySQL on the backend and React on the frontend.

### Features that have been added: <br>
-Responsive product display <br>
-Filtered product display by category (Ex: products that are listed as tools) and search bar (Ex: products that start with "ham") <br>
-Login and sign up for accounts <br>
-Ability to add and delete products<br>

### Features that have yet to be added: <br>
-Ability to add categories to database <br>
-Ability to remove categories if they are no products in the specified category <br>
-User privileges. I plan to have 3 privileges (Customer, Staff, Master). Customers or users with an account can "buy" products. Staff members can also add/delete products in the inventory database. The Master(me) can also add/delete categories and choose which accounts are permitted Staff privileges. <br>
-A fake money system (Customers start with $0 but can add money to their wallet just by entering an amount) <br>
-Pagination for product display <br>
-Product display shows a preview image if available <br>

### Product Filtration Demo <br>
This is a demo GIF that shows how the site currently looks like and highlights the filtration functionality. First it shows filtering by category, then by using the search bar, then both. <br>
![Loading...](Filter.gif)

### Responsiveness Demo <br>
This is a demo GIF that highlights the responsiveness of the site. The main thing to observe is how the product grid adapts to the width of the device. This is not exactly how it would be seen on on smaller devices because the fullscreen of my device was not being used but it gives an idea. <br>
![Loading...](Responsive.gif)

### Product Adding Demo <br>
This is a demo GIF that shows what the process of adding products to the database looks like. First it shows that the cancel button on the form works as well as form validation. Finally after the form has been validated, you can see that a cheese product has been added to the inventory. <br>
![Loading...](ProductAdd.gif)

### Product Deletion Demo <br>
This is a demo GIF that shows what the process of deleting products from the database looks like. First it shows what happens when you click on the delete button and hover over a product. Then it shows how to exit out of delete mode and re-enter (I clicked on the Delete Me product to show that nothing gets deleted after you exit delete mode). Finally it shows the result of a deletion.
![Loading...](ProductDel.gif)
