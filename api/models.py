from datetime import datetime
from config import db, ma

class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Meal(db.Model):
    __tablename__ = "meal"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    price = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class OrderMeal(db.Model):
    __tablename__ = "order_meal"
    order_id = db.Column(db.ForeignKey('order.id'), primary_key=True)
    order = db.relationship('Order', backref='meals', lazy='joined')

    meal_id = db.Column(db.ForeignKey('meal.id'), primary_key=True)
    quantity = db.Column(db.Integer)

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
