from datetime import datetime
from config import db, ma
from sqlalchemy.ext.associationproxy import association_proxy

# meal_identifier = db.Table('meal_identifier', db.Model.metadata,
#     db.Column('meal_id', db.Integer, db.ForeignKey('meal.id'), primary_key=True),
#     db.Column('order_id', db.Integer, db.ForeignKey('order.id'), primary_key=True),
#     db.Column('quantity', db.Integer)
# )

class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Integer)
    meals = db.relationship("Meal", secondary="meal_identifier", back_populates="orders")
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Meal(db.Model):
    __tablename__ = "meal"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    price = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    orders = db.relationship("Order", secondary="meal_identifier", back_populates="meals")
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MealIdentifier(db.Model):
    __tablename__ = "meal_identifier"
    order_id = db.Column(db.ForeignKey('order.id'), primary_key=True)
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

class MealIdentifierSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True
        sqla_session = db.session
