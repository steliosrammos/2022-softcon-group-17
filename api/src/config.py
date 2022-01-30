import os
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

basedir = os.path.abspath(os.path.dirname(__file__))

# Create the connexion application instance
connex_app = connexion.App(__name__, specification_dir=basedir)

# Get the underlying Flask app instance
app = connex_app.app
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Build the Sqlite ULR for SqlAlchemy
#db_url = "sqlite:///" + os.path.join(basedir, "bistro.db")
try:
    POSTGRES_SERVICE = os.environ['POSTGRES_SERVICE_PORT_5432_TCP_ADDR']
    print('Using environment variable to resolve DB service')
except:
    POSTGRES_SERVICE = '10.152.183.234'
    print('Using IP address for DB service')

db_url = f'postgresql://postgresadmin:admin123@{POSTGRES_SERVICE}:5432/postgresdb'
# db_url = 'postgresql://postgres:3NRZLubCzHG*fVZd9$*H@localhost:5432/softcon-bistro'

# Configure the SqlAlchemy part of the app instance
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create the SqlAlchemy db instance
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)
