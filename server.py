import os
from dotenv import load_dotenv
from flask import Flask, request, json, make_response
from flask_cors import cross_origin
import asyncio

from chain import chain

load_dotenv()

app = Flask(__name__)

def run(chain, *args):
  loop = asyncio.new_event_loop()
  asyncio.set_event_loop(loop)
  try:
    return loop.run_until_complete(chain(*args))
  finally:
    loop.close()

@app.route("/questions", methods=['POST'])
@cross_origin()
def get_answer():
  if request.method == 'POST' and request.is_json:
    data = request.get_json()
    result = run(chain, data['question'])
    resp = make_response(json.dumps(result, ensure_ascii=False))
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'
    return resp
   
  return {'answer': 'I could not understand'}

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
  
  