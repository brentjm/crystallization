"""
Example Flask app
"""

from flask import Flask

application = Flask(__name__)


@application.route("/flask/test")
def test():
    """
    Default route
    """
    return "Hello World, from Flask!"


if __name__ == "__main__":
    application.run(host="0.0.0.0:5000")
