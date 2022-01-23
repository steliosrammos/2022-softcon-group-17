from datetime import datetime

from flask import (
        abort
)

from models import (
        Person,
        PersonSchema
)

from config import db

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

PEOPLE = {
    "Farrell": {
        "fname": "Doug",
        "lname": "Farrell",
        "timestamp": get_timestamp()
    },
    "Brockman": {
        "fname": "Kent",
        "lname": "Brockman",
        "timestamp": get_timestamp()
    },
    "Easter": {
        "fname": "Bunny",
        "lname": "Easter",
        "timestamp": get_timestamp()
    }
}

def read_all(length=len(PEOPLE), offset=0):

    people = Person.query.order_by(Person.lname).all()

    person_schema = PersonSchema(many=True)

    return person_schema.dump(people)

def read_person(person_id):

    person = Person.query.filter(person_id == Person.person_id).one_or_none()

    if person:
        person_schema = PersonSchema()
        return person_schema.dump(person)
    else:
        abort(404, f'Person not found for ID: {person_id}')

def create(person):

    fname = person.get('fname')
    lname = person.get('lname')

    existing_person = Person.query.filter(Person.fname == fname).filter(Person.lname == lname).one_or_none()

    if not existing_person:
        schema = PersonSchema()
        new_person = schema.load(person, session=db.session)

        db.session.add(new_person)
        db.session.commit()

        return schema.dump(new_person), 201
    else:
        abort(409, f'Person {fname} {lname} already exists')

def delete(person_id):

    Person.query.filter(Person.person_id == person_id).delete()
    db.session.commit()

def update(person_id, person):
    # First delete existing person in case we're updating last name

    delete(person_id)
    Person.query.filter(Person.person_id == person_id).update(person)
    db.session.commit()

