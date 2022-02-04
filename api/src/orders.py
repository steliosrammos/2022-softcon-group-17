from datetime import datetime
from timeit import timeit

from flask import (
        abort
)

from models import (
        Order,
        OrderMeal,
        OrderSchema,
)

from config import db

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def fetch_order_meals(order):
    order_meals = { 
            'id': order.id,
            'meals': [],
            'timestamp': order.timestamp,
            'total': order.total
        }
        
    meals = OrderMeal.\
        query.filter(OrderMeal.order_id == order.id).\
        with_entities(OrderMeal.meal_id, OrderMeal.quantity).all()
    
    [order_meals['meals'].append({ 'meal_id': meal_id, 'quantity': quantity }) for meal_id, quantity in meals]
    
    return order_meals

def read_all():
    return [fetch_order_meals(order) for order in Order.query.all()]

def read_order(order_id):

    order = Order.query.filter(order_id == Order.id).one_or_none()
    if order:
        return fetch_order_meals(order)
    else:
        abort(404, f'Order not found for ID: {order_id}')

def create(order):

    print(f'\nORDER:\n{order}\n')
    schema = OrderSchema()
    new_order = schema.load({ 'total': order.get('total')}, session=db.session)
    
    #My Version Using my Tables
    for meal in order.get('meals'):
        print(f'Meal: {meal}')
        order_meal = OrderMeal(meal_id=meal['id'], quantity=meal['quantity'])
        db.session.add(order_meal)
        new_order.meals.append(order_meal)
    
    db.session.add(new_order)
    db.session.commit()

    return schema.dump(new_order), 201

def delete(order_id):

    print('Inside delete')

    delete_order = Order.query.filter(Order.id == order_id).one_or_none()

    if not delete_order:
        print('No order found')
        return

    print('Order found. Deleting now...')

    db.session.delete(delete_order)
    db.session.commit()

def update(order_id, order):
    '''
    `order`: array of meals for which `quantity` has changed
        contains `total` field which is the new total for the order
    '''

    for meal in order['meals']:
        meal_id = meal['id']
        ordermeal = OrderMeal.query.filter(OrderMeal.order_id == order_id, OrderMeal.meal_id == meal_id).one_or_none()
        if not ordermeal:
            abort(404, f'MealOrder not found for Order ID: {order_id} and Meal ID: {meal_id}')
        ordermeal.quantity = meal['quantity']
    order_result = Order.query.filter(Order.id == order_id).one_or_none()
    if not order_result:
        abort(404, f'Order not found for Order ID: {order_id}')
    order_result.total = order['total']

    db.session.commit()
