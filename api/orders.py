from datetime import datetime
from timeit import timeit

from flask import (
        abort
)

from models import (
        Order,
        Meal,
        OrderMeal,
        OrderSchema,
)

from config import db

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

# ORDERS = {
#     1: {
#         "total": 10,
#         "meals": [1],
#         "timestamp": get_timestamp()
#     },
#     2: {
#         "total": 20,
#         "meals": [1, 2],
#         "timestamp": get_timestamp()
#     },
#     3: {
#         "total": 15,
#         "meals": [3],
#         "timestamp": get_timestamp()
#     }
# }

def read_all():

    people = Order.query.order_by(Order.timestamp).all()

    order_schema = OrderSchema(many=True)

    return order_schema.dump(people)

def read_order(order_id):

    order = Order.query.filter(order_id == Order.id).one_or_none()

    if order:
        order_schema = OrderSchema()
        return order_schema.dump(order)
    else:
        abort(404, f'Order not found for ID: {order_id}')

def create(order):
    # existing_order = Order.query.filter(Order.fname == fname).filter(Order.lname == lname).one_or_none()
    print(f'\nORDER:\n{order}\n')
    schema = OrderSchema()
    new_order = schema.load({ 'total': order.get('total')}, session=db.session)
    
    #My Version Using my Tables
    for meal in order.get('meals'):
        print(f'Meal: {meal}')
        order_meal = OrderMeal(meal_id=meal['id'], quantity=meal['quantity'])
        order_meal.order = new_order
        new_order.meals.append(order_meal)
    
    db.session.add(new_order)
    db.session.commit()

    return schema.dump(new_order), 201
    # else:
    #     abort(409, f'Order {fname} {lname} already exists')

def delete(order_id):

    Order.query.filter(Order.id == order_id).delete()
    db.session.commit()

def update(order_id, order):
    # First delete existing order 

    delete(order_id)
    Order.query.filter(Order.id == order_id).update(order)
    db.session.commit()

