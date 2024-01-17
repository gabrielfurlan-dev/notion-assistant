import requests

def criar_nota_no_notion(texto, categorias):
    url = "https://api.notion.com/v1/pages"
    headers = {
        "Authorization": "Bearer seu_token_de_acesso",
        "Content-Type": "application/json",
    }

    data = {
        "parent": {"database_id": "seu_database_id"},
        "properties": {
            "Título": {
                "title": [{"text": {"content": "Título da Nota"}}]
            },
            "Categoria": {
                "select": {"name": categorias}
            }
        },
        "children": [
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "text": [{"type": "text", "text": {"content": texto}}]
                }
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    return response.json()
