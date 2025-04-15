from flask import Flask, jsonify, send_file, request
import os
from urllib.parse import unquote

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/api/directory')
def get_directory():
    try:
        path = unquote(request.args.get('path', ''))
        # Remove leading slash if present
        path = path.lstrip('/')
        full_path = os.path.join(os.getcwd(), path)
        
        # Security check to prevent directory traversal
        if not os.path.abspath(full_path).startswith(os.getcwd()):
            return jsonify({'error': 'Access denied'}), 403
            
        if not os.path.exists(full_path):
            return jsonify({'error': 'Path not found'}), 404
            
        if not os.path.isdir(full_path):
            return jsonify({'error': 'Not a directory'}), 400
            
        items = []
        for item in os.listdir(full_path):
            item_path = os.path.join(full_path, item)
            items.append({
                'name': item,
                'type': 'directory' if os.path.isdir(item_path) else 'file'
            })
        return jsonify(items)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/file')
def get_file():
    try:
        path = unquote(request.args.get('path', ''))
        # Remove leading slash if present
        path = path.lstrip('/')
        full_path = os.path.join(os.getcwd(), path)
        
        # Security check to prevent directory traversal
        if not os.path.abspath(full_path).startswith(os.getcwd()):
            return jsonify({'error': 'Access denied'}), 403
            
        if not os.path.exists(full_path):
            return jsonify({'error': 'File not found'}), 404
            
        if not os.path.isfile(full_path):
            return jsonify({'error': 'Not a file'}), 400
            
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return content
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 