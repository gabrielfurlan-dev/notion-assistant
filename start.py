from openai import OpenAI
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

audio_path = 'C:\\Users\\gabri\\Downloads\\WhatsApp Ptt 2024-01-07 at 20.43.51.ogg'
llm = ChatOpenAI(api_key=os.getenv("OPEN_API_KEY"))
client = OpenAI(api_key=os.getenv("OPEN_API_KEY"))

# def transcrever_audio(audio_path):
#     audio_file= open(audio_path, "rb")
#     transcript = client.audio.transcriptions.create(
#     model="whisper-1", 
#     file=audio_file,
#     response_format="text"
#     )
#     return (transcript)

# texto = transcrever_audio(audio_path)

# print("PERGUNTA:")
# print(texto)

print(llm.invoke("""Use the provided APIs to respond to this user query: 
                 What are some options for a men's large blue button down shirt""").content)

# function_call:
#   name: productsUsingGET
#   arguments: |-
#     {
#       "params": {
#         "countryCode": "US",
#         "q": "men's large blue button down shirt",
#         "size": 5,
#         "min_price": 0,
#         "max_price": 100
#       }
#     }
