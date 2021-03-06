import config

# Get the application instance
app = config.connex_app

# Read the swagger.yml file to configure the endpoints
app.add_api("../swagger.yml")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
    #app.run(debug=True, host='127.0.0.1', port=5000)
