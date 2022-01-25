from datetime import datetime
from config import db, ma

meal_identifier = db.Table('meal_identifier',
    db.Column('meal_id', db.Integer, db.ForeignKey('meal.id')),
    db.Column('order_id', db.Integer, db.ForeignKey('order.id'))
)

class Meal(db.Model):
    __tablename__ = "meal"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    price = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Integer)
    meals = db.relationship("Meal", secondary=meal_identifier)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MealSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Meal
        load_instance = True
        sqla_session = db.session

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True
        sqla_session = db.session