from flask import (
        Flask,
        render_template
)
import config

# Get the application instance
app = config.connex_app

# Read the swagger.yml file to configure the endpoints
app.add_api("swagger.yml")

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
