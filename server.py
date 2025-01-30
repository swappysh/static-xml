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

if __name__ == '__main__':
    app.run(debug=True, port=5000)