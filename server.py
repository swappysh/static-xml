from flask import Flask, request, Response
import xml.etree.ElementTree as ET

app = Flask(__name__)
LONG_CONVERSATION_PATH = "long-conversation.xml"

@app.route('/xml', methods=['POST'])
def handle_xml_request():
    with open(LONG_CONVERSATION_PATH, 'r') as file:
        xml_string = file.read()
    
    # Return XML response with proper content type
    return Response(xml_string, mimetype='application/xml')

@app.route('/', methods=['GET'])
def home():
    return '''
    <html>
        <head>
            <title>XML Server</title>
        </head>
        <body>
            <h1>Welcome to the XML Server</h1>
            <p>This server provides XML responses via POST requests to the /xml endpoint.</p>
            <h2>Usage:</h2>
            <pre>
POST /xml
Content-Type: application/json

{
    "name": "John",
    "age": "30"
}
            </pre>
        </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(debug=True, port=5000)