const baseURL = "http://localhost:8080/v1";
const table = document.querySelector("tbody");

const token = localStorage.getItem("token");

const getData = async (token) => {
  const res = await fetch(`${baseURL}/pets`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (data.err) {
    return alert(data.err);
  }

  table.innerHTML = "";
  data.forEach((pet) => {
    const tr = table.insertRow();

    const td1 = tr.insertCell();
    td1.textContent = pet.name;

    const td2 = tr.insertCell();
    td2.textContent = pet.date;

    const td3 = tr.insertCell();
    td3.textContent = pet.spec;

    const td4 = tr.insertCell();
    td4.textContent = pet.email;
  });
};

if (!token) {
  location.replace("index.html");
} else {
  getData(token);
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("index.html");
});
