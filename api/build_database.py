import os
from src.config import db
from src.models import Meal, Order, OrderMeal

# Data to initialize database with
ORDERS = [
    { "total": 10, "meals": [1] },
    { "total": 20, "meals": [1, 2] },
    { "total": 15, "meals": [3] }
]

MEALS = [
    { "name": "Mom's spaghetti", "price": 1, "stock": 10 },
    { "name": "Fresh fish from the Dock", "price": 2, "stock": 1 },
    { "name": "That's Helm of a soup", "price": 3, "stock": 5 }
]

# Delete database file if it exists currently
#if os.path.exists("bistro.db"):
#    os.remove("bistro.db")

print('Dropping tables...')
db.drop_all()
print('Dropped all tables')
# Create the database
db.create_all()
print('Created tables')

# iterate over the PEOPLE structure and populate the database
for meal in MEALS:
    m = Meal(name=meal.get("name"), price=meal.get("price"), stock=meal.get("stock"))
    db.session.add(m)

for order in ORDERS:
    o = Order(total=order.get("total"))
    [o.meals.append(OrderMeal(meal_id=meal_id)) for meal_id in order['meals']]

    db.session.add(o)

db.session.commit()
