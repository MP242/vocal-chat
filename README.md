<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>





<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://austral-energie.com/">
    <img src="./public/austral_groupe_nergie_logo.jpeg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Vocal-Chatbot for Austral Energie</h3>

  <p align="center">
    An innovative voice chatbot solution for customer interaction with AI.
    <br />
    <a href="https://github.com/MP242/vocal-chatbot"><strong>Explore the documentation</strong></a>
    <br />
    <br />
    <a href="https://austral-energie-vocal-bot-289e8ac06521.herokuapp.com/">See demo</a>
    ·
    <a href="https://github.com/MP242/vocal-chatbot/issues">Report a Bug</a>
    ·
    <a href="https://github.com/MP242/vocal-chatbot/issues">Ask a feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About this project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">To get started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About this project

<img src="./public/image.png" alt="Austral Energie Vocal Bot Screenshot" width="100%"/>
<br>
The Vocal-Chatbot is a voice conversation interface developed for Austral Energy, aimed at transforming customer interaction by using artificial intelligence to simulate an exchange with a sales advisor. Users record their voice message by holding down the Enter button, which is then converted into text so the AI can respond. The textual response is read aloud, making communication with the chatbot as smooth and natural as possible.

### Built with

This project was developed using several key technologies in the fields of artificial intelligence and web development:

* [Next.js](https://nextjs.org/)
* [Vercel-react/ai](https://sdk.vercel.ai/docs/api-reference/use-chat)
* [Ollama](https://ollama.ai/)
* [Langchain](https://js.langchain.com/docs/get_started/introduction)
* [OpenAI](https://platform.openai.com/docs/quickstart?context=node)
* [MongoDB](https://www.mongodb.com/)
* [Langsmith](https://langsmith.ai/)

<p align="right">(<a href="#readme-top">Back to top</a>)</p>



<!-- GETTING STARTED -->
## To get started

To set up the project locally, follow these simple instructions.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Ollama serve with docker

  ```sh
  docker run -d --gpus=all -v ollama:/root/.ollama -p 8000:11434 --name ollama ollama/ollama
  docker exec -it “id contenerur” sh
  ollama pull mixtral
  ```
* Mongodb Atlas

  Create your database and collection.
  Get your URI.

* openAI

  Get your API_KEY.

* Langsmith

  Get your API_KEY.  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MP242/vocal-chat.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your OLLAMA_URL in `.env` & `.env.local`
   ```js
   OLLAMA_URL = 'ENTER YOUR OLLAMA_URL';
   ```
4. Enter your MODEL_NAME in `.env` & `.env.local`
   ```js
   MODEL_NAME = 'ENTER YOUR MODEL_NAME';
   ```
5. Enter your MONGODB_URI in `.env` & `.env.local` <br>
    example : MONGODB_URI=mongodb+srv://`USERNAME`:`PASSWORD`@clusterxxx.xxxxxx.mongodb.net/?retryWrites=true&w=majority
    ```js
    MONGODB_URI = 'ENTER YOUR URI';
    ```
6. Enter your BDD_NAME in `.env` & `.env.local`
   ```js
   BDD_NAME = 'ENTER YOUR BDD_NAME';
   ```
7. Enter your COLLECTION_NAME in `.env` & `.env.local`
   ```js
   COLLECTION_NAME = 'ENTER YOUR COLLECTION_NAME';
   ```
8. Enter your OPENAI_API_KEY in `.env` & `.env.local`
   ```js
   OPENAI_API_KEY = 'ENTER YOUR OPENAI_API_KEY';
   ```
9. Enter your LANGCHAIN_API_KEY in `.env` & `.env.local` <br>
  From langsmith dashboard !
   ```js
   LANGCHAIN_API_KEY = 'ENTER YOUR LANGCHAIN_API_KEY';
   ```
10. Enter your LANGCHAIN_PROJECT in `.env` & `.env.local` <br>
    From langsmith dashboard !
    ```js
    LANGCHAIN_PROJECT = 'ENTER YOUR LANGCHAIN_PROJECT';
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

To interact with the vocal chatbot, use the application's single page. Hold down the Enter button to record your voice message. Release the button to send the message to the AI, which will respond with a text message read aloud.

If you want to track the inputs/outputs of your LLM, you can do so from the Langsmith dashboard!


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Change STT & TTS with hugginFace model.
- [ ] Fix Safari beug
- [ ] Improve the transition between text reponse from LLM to TTS.
- [ ] Add second LLMChain making stream great again on the front.
    - or find a way to first invoke your chain and then stream the response.
- [ ] LLM Agent.
    - [ ] Define the need of the user.
    - [ ] Schedule an appointment using the Google Calendar for a team of sales representatives.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Marc POLLET - [@Marc_linkedin](https://www.linkedin.com/in/marcpollet242/) - marc.pollet242@gmail.com

Project Link: [https://github.com/MP242/vocal-chat](https://github.com/MP242/vocal-chat)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
