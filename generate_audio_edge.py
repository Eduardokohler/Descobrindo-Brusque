import asyncio
import edge_tts
import os

VOICE = "pt-BR-AntonioNeural"
OUTPUT_DIR = "src/assets/audio"

AUDIOS = {
    "q1":        "Qual animal dá nome à festa Fenarreco?",
    "q2":        "Qual roupa é usada para dançar na Fenarreco?",
    "q3":        "Qual comida é tradicional na Fenarreco?",
    "q4":        "Quais são as cores da bandeira de Brusque?",
    "q5":        "Como se chama o rio que passa por Brusque?",
    "q6":        "Como se chama a cidade onde moramos?",
    "q7":        "Quem veio morar em Brusque há muito tempo?",
    "q8":        "De onde vieram essas pessoas?",
    "q9":        "O que essas pessoas trouxeram para Brusque?",
    "q10":       "Como eram as primeiras casas de Brusque?",
    "q11":       "Por que Brusque é conhecida como cidade dos tecidos?",
    "q12":       "Quem faz as roupas nas fábricas de tecido?",
    "q13":       "Onde podemos ver animais em Brusque?",
    "q14":       "Onde fica o avião histórico de Brusque?",
    "q15":       "Qual animal faz o som quack quack e representa a Fenarreco?",
    "acertou":   "Muito bem, você acertou! Que incrível!",
    "errou":     "Que pena, você errou! Mas não desanime, continue tentando!",
    "timeout":   "O tempo acabou! Vamos para a próxima pergunta.",
    "welcome":   "Oi! Eu sou o Quack, o marreco de Brusque! Digite seu nome ou clique em jogar!",
    "difficulty":"Agora escolha o nível de dificuldade! Quanto mais difícil, menos tempo!",
}

async def generate(key, text):
    path = os.path.join(OUTPUT_DIR, f"{key}.mp3")
    tts = edge_tts.Communicate(text, VOICE, pitch="-5Hz")
    await tts.save(path)


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    tasks = [generate(k, t) for k, t in AUDIOS.items()]
    await asyncio.gather(*tasks)

asyncio.run(main())
