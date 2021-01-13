# Skip The Line
## Link: https://morning-waters-41135.herokuapp.com/


### If you are not logged in

- If you are not logged in, you can still browse different trucks, search for trucks that you are interested in, click into a truck (if it is open) to look at its menus, and search for food. You won't be able to order food unless you are logged in.

- If you would like to log in, you can click the 'LOG IN' button on the upper right corner. You may log in with the following
log in login credentials (session duration is 3 hours):
  - user name: user, password: user (this user is a customer)
  - user name: user2, password: user2 (this user is a food truck owner)
  - user name: admin, password: admin (this user is an admin)

- Or you can create a new account by clicking the 'Sign up' button at the bottom of the login box. When signing up, you can choose to be a customer or a vendor.

### If you logged in as Admin (admin)
- As an admin, you can browse the list of trucks on the home page and click into a truck to look at the food that it offers. However, you can't order food.

- You can click your profile picture at the upper right corner to go to the account setting page

- Inside of the account setting page, there are 4 different options.
  1. My Account: you can log out from here.
  2. Password: you can change your password here.
  3. Admin Dashboard: You can view a list of all the users (and their information) and a list of all the trucks (and their informaiton).
    - All Users: You can disable an active account (other than the admin account, which is always active). The system will                      keep all the information of a disabled account, however, a user can no longer log in with this account. If the                  user is a vendor, all his / her trucks will no longer be visible on the home page. You can activate a                          disabled account. Users can log in with this account again, and all the information and settings would be                      there. You can remove a user (other than the admin). This account will be deleted and cannot be recovered.
    - All Trucks: You can remove a truck. This truck will be deleted an cannot be recovered.
  4. Order History: you can browse all the transaction history and delete transaction history.

### If you logged in as user (customer)
- As a customer, you can browse the list of trucks on the home page and click into a truck to look at the food that it offers. You can add food to or remove food from your cart. You can checkout by clicking the 'Checkout' button at the bottom of the 'Your Order' cart. Then you will be redirected to 'Confirm Order' page.

- You can either not confirm your order and go back to home page by clicking 'SKIP THE LINE' logo at the upper left corner, or you can confirm your order by clicking the 'Confirm' button. After clicking 'Confirm', you will be redirected to a panel where there is a friendly thank you message that will waste 2.5 seconds of your life, and then you will be sent back to the home page automatically.

- You can click your profile picture at the upper right corner to go to the account setting page

- Inside of the account setting page, there are 3 different options.
  1. My Account: you can log out from here.
  2. Password: you can change your password here.
  3. Order History: you can browse all of your order history. You can remove a specific piece of order history from your 'order History' table. However, you will not be able to delete it. In other words, this piece of order history will no longer be visible from your 'order History' table, but the vendor that you ordered from and the admin can still see it from their 'Order History' tables.


### If you logged in as user2 (vendor)
- As an vendor, you can browse the list of trucks on the home page and click into a truck to look at the food that it offers. However, you can't order food.

- You can click your profile picture at the upper right corner to go to the account setting page

- Inside of the account setting page, there are 4 different options.
  1. My Account: you can log out from here.
  2. Password: you can change your password here.
  3. My Food Trucks: You can view a list of all the food trucks (and their menus) you own. You can edit your truck info and menu info by clicking the 'edit' button. You can save the changes you made by clicking the 'save' button. You can remove a food truck by clicking the 'delete' button.
    - Menu Info: You can add food to / remove food from menu, and edit the information of the food.
  4. Order History: you can browse all of your transaction history from all the trucks that you own. You can remove a specific piece of order history from your 'order History' table. However, you will not be able to delete it. In other words, this piece of information will no longer be visible from your 'order History' table, but the customer who ordered from you and the admin can still see it from their 'Order History' tables. After a customer come pick up his/her food you can change the status of the order from 'pending' to 'completed'.


### Run "Skip The Line" locally
- Clone the repo
- Have 2 terminal windows open. One points to directory Skip-The-Line, the other one points to directory client, which is a subdirectory of Skip-The-Line.
- Run npm install in both terminal windows
- Run npm start in both terminal windows
- Go to http://localhost:3000/ on chrome
