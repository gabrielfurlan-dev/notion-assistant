from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from openai import OpenAI
from primitives_functions import createPageNotion
import spacy
import os

load_dotenv()

audio_path = 'C:\\Users\\gabri\\Downloads\\WhatsApp Ptt 2024-01-07 at 20.43.51.ogg'
client = OpenAI(api_key=os.getenv("OPEN_API_KEY"))
nlp = spacy.load("pt_core_news_sm")
llm = ChatOpenAI(api_key=os.getenv("OPEN_API_KEY"))

def transcrever_audio(audio_path):
    with open(audio_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file,
            response_format="text"
        )
    return transcript

def categorizar_nota(texto):
    prompt = f"Identifique a categoria ou contexto do seguinte texto:\n\n{texto}\n\nA categoria principal de forma resumida é:"
    return llm.invoke(prompt).content

def langchain_workflow(audio_path):
    try:
        texto = transcrever_audio(audio_path)
        categoria = categorizar_nota(texto)
        createPageNotion.criar_nota_no_notion(texto, categoria)
        print("Nota criada.")  
    except Exception as e:
        print(f"Erro ao criar a nota: {e}")

## EXECUTE
# langchain_workflow(audio_path)
texto = transcrever_audio(audio_path)
print(categorizar_nota(texto))
        