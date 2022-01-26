from datetime import datetime

from flask import (
        abort
)

from models import (
        Meals,
        MealSchema
)

from config import db

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

MEALS = {
    1: {
        "price": 1,
        "stock": 10,
        "timestamp": get_timestamp()
    },
    2: {
        "price": 2,
        "stock": 1,
        "timestamp": get_timestamp()
    },
    3: {
        "price": 3,
        "stock": 5,
        "timestamp": get_timestamp()
    }
}

def read_all(length=len(MEALS), offset=0):

    meal = Meal.query.all()

    meal_schema = MealSchema(many=True)

    return meal_schema.dump(meal)

def read_meal(meal_id):

    meal = Meal.query.filter(meal_id == Meal.id).one_or_none()

    if meal:
        meal_schema = MealSchema()
        return meal_schema.dump(meal)
    else:
        abort(404, f'Meal not found for ID: {meal_id}')
