import pyttsx3
import os

def text_to_speech(text, voice_id='com.apple.speech.synthesis.voice.thomas', filename='output2.mp3'):
    """
    Convert text to speech with a specific voice and save it as an audio file.

    Parameters:
        text (str): The text to convert to speech.
        voice_id (str): The identifier of the voice to use (default is for the 'Thomas' voice on macOS).
        filename (str): The name of the output audio file (default is 'output.mp3').
    """
    # Initialize the text-to-speech engine
    engine = pyttsx3.init()

    # Set the voice
    engine.setProperty('voice', voice_id)

    # Save the speech to an audio file
    engine.save_to_file(text, filename)

    # Run the engine
    engine.runAndWait()

if __name__ == "__main__":
    # Example usage:
    french_text = """
   Objet : Mobilisation de la Communauté pour un Avenir Durable

Chers membres de la communauté,

J'espère que ce message vous trouve en bonne santé. Aujourd'hui, je m'adresse à vous pour partager un projet d'une importance capitale non seulement pour moi, mais pour l'ensemble de notre communauté. Ces derniers mois, sous le nom de code "WLA" et en collaboration avec mon équipe "Espada", j'ai travaillé avec passion sur un projet visant à promouvoir des pratiques commerciales durables, à sensibiliser sur les enjeux du changement climatique, et à faciliter des connexions significatives entre les entreprises et les consommateurs.

La plateforme, "WLA", est une déclaration de notre engagement collectif pour faire face à l'urgence du changement climatique. Bien que le projet soit ambitieux, j'ai pris en charge cette responsabilité seul, en mettant l'accent particulier sur l'aspect critique de la cybersécurité pour assurer un environnement en ligne sûr et sécurisé pour tous les utilisateurs.

Le Défi :
La création d'une plateforme de cette envergure présente ses défis. La complexité des relations entre les entreprises et les consommateurs exige une attention méticuleuse, et l'importance de la cybersécurité est non négligeable. Le défi peut sembler imposant, mais c'est une responsabilité que j'accepte avec tout mon cœur.

La Cybersécurité en tant que Pilier :
À l'ère numérique, l'importance de la cybersécurité ne peut être surestimée. Alors que nous œuvrons pour un avenir durable, sécuriser nos interactions en ligne est primordial. Chaque ligne de code, chaque processus d'authentification, et chaque transaction ont été conçus en tenant compte des meilleures pratiques de cybersécurité. Cela garantit non seulement le succès de notre plateforme, mais aussi la protection de vos données précieuses.

Garantir Votre Sécurité :

Chiffrement des Données : Toutes les informations sensibles sont cryptées pour les protéger contre tout accès non autorisé pendant la transmission.
Authentification Sécurisée : Des mécanismes d'authentification robustes, y compris un hachage sécurisé des mots de passe et une authentification à facteurs multiples, ont été mis en place pour protéger les comptes des utilisateurs.
Audits de Sécurité Réguliers : Notre plateforme fait l'objet d'audits de sécurité réguliers pour identifier et résoudre rapidement les éventuelles vulnérabilités.
Protocole HTTPS : L'ensemble de la plateforme est servi via HTTPS pour crypter les données en transit et se protéger contre les attaques de type "homme du milieu".
Confidentialité des Utilisateurs : Votre vie privée est une priorité absolue. Nous respectons des politiques de confidentialité strictes pour garantir la confidentialité de vos informations personnelles.
Avancer Ensemble :
Je crois fermement que le changement positif est le fruit d'un effort collectif. Alors que je continue à me consacrer au projet, je vous invite à vous joindre à moi dans cette entreprise. Votre soutien, que ce soit par des retours constructifs, en partageant notre mission, ou en participant activement sur la plateforme, est inestimable.

Comment Vous Pouvez Contribuer :

Diffuser l'Information : Partagez notre mission avec votre réseau. Plus nous serons nombreux, plus grand sera notre impact.
Fournir des Retours : Vos idées et suggestions sont cruciales. Si vous avez des propositions, des suggestions ou des préoccupations, je suis impatient de les entendre.
Participer sur la Plateforme : Lorsque la plateforme sera lancée, votre participation active contribuera à son succès.
Contactez-Moi pour Plus de Détails :
Si vous souhaitez en savoir plus sur le projet "WLA", poser des questions spécifiques, ou discuter de collaborations potentielles, n'hésitez pas à me contacter par e-mail à [wassimna0@gmail.com].

Ensemble, nous avons le pouvoir de faire une différence. "WLA" n'est pas simplement une plateforme ; c'est un mouvement vers un avenir durable et interconnecté.

Je vous remercie de votre temps, de votre soutien, et de votre engagement envers la construction d'un monde meilleur.

Cordialement,

Wassim aka WLA
    """

    # You can change the voice_id to a different voice (for macOS)
    # List of voices can be obtained using: pyttsx3.init().getProperty('voices')
    voice_id = 'com.apple.speech.synthesis.voice.thomas'

    text_to_speech(french_text, voice_id)

    print("Text-to-speech conversion complete. Check the output.mp3 file.")
