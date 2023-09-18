const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";
const message = document.getElementById("message");
const btn = document.getElementById("btn");
const choices = document.getElementById("choices");
const select = document.getElementById("select");
const container = document.querySelector(".container");

const getComment = async() => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },body:JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{
                "role": "user",
                "content": `bana ${message.value} ile ilgili ${select.value}, sanki ${message.value}'yı gerçekten kullanmış ve deneyimlemiş gibi en az ${choices.value} harfli ve en fazlada ${choices.value} harfli bir yorum yapar mısın?`
            }]
        })
    }

   try {
    const response = await fetch(API_URL, options);
    const fetchedData = await response.json();

    // console.log(fetchedData.choices[0].message.content);

    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");

    h1.innerHTML = message.value;
    h1.style.color = "red"
    p.innerHTML = fetchedData.choices[0].message.content;

    div.style.border = "2px solid black";
    div.style.marginTop = "10px";
    div.style.paddingInline = "10px";
    div.style.background = "#F1EFEF";
    div.style.borderRadius = "10px";

    container.appendChild(div);
    div.appendChild(h1);
    div.appendChild(p);

   } catch (error) {
    console.log(error);
   }
}

btn.addEventListener("click", getComment)