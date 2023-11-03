import { useState, useEffect } from "react";

export function Chatwindow({ messages }) {
    const [food, setFoodData] = useState(null);

    useEffect(() => {
        async function fetchFoodData() {
          try {
            const url = "https://www.themealdb.com/api/json/v1/1/random.php";
            const res = await fetch(url);
            const data = await res.json();
            if (data.meals && data.meals.length > 0) {
                console.log('Needed Data:', data.meals[0].strMeal);
                setFoodData(data.meals[0].strMeal); // Setting fetched data in state
              } else {
                console.log('No data found.');
                setFoodData(null); // Set the state to null if no data is found
              }
          } catch (error) {
            console.log(error);
          }
        }
        
        fetchFoodData();
      }, []); 
    
    return (
      <div id="chat-window" className="chat-window">
        <p>
          <b>Bot: </b>Are you hungry? I can fix that. Type YES if you want something to eat or NO if you don't.
        </p>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index}>
              <p><b>Me: </b>{message.messageValue}</p>
              <p><b>Bot: </b>{food}</p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    );
  }
  