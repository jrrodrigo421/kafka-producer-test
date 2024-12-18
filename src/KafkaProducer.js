import React, { useState } from "react";
import axios from "axios";

function KafkaProducer() {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("my-topic");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    setIsLoading(true); 
    setResponse(""); 
    try {
      const res = await axios.post(
        "http://localhost:8080/api/kafka/send",
        /// TODO implementar envio do tópico
        // { topic, message },
        message,
        { headers: { "Content-Type": "text/plain" } }
      );
      setResponse();
      setResponse( "Mensagem enviada com sucesso!");
      
      
      setMessage("");
    } catch (error) {      
      setResponse("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-700 to-indigo-900 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Kafka Producer
        </h2>

        <label className="block mb-2 text-gray-700 font-semibold">
          Escolha o Tópico:
        </label>
        <select
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="my-topic">my-topic</option>
        </select>

        <label className="block mb-2 text-gray-700 font-semibold">
          Mensagem:
        </label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        ></textarea>

        <button
          onClick={sendMessage}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 mt-4 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            "Enviar Mensagem"
          )}
        </button>

        {response && (
          <div
            className={`mt-4 text-center font-medium transition-opacity duration-500 ${
              response.includes("sucesso") ? "text-green-600" : "text-red-500"
            }`}
          >
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default KafkaProducer;
