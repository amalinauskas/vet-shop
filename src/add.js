const baseURL = "http://localhost:8080/v1";
const table = document.querySelector("tbody");

const token = localStorage.getItem("token");

const sendData = async (userData) => {
  const res = await fetch(`${baseURL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  if (data.err) {
    return alert(data.err);
  }

  alert(data.msg);
  location.replace("stats.html");
};

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.elements.prescription.value;
  const prescription = e.target.elements.description.value;
  const description = e.target.elements.date.value;
  const date = e.target.elements.edate.value;
  const pets_id = e.target.elements.pet.value;

  sendData({ name, prescription, description, date, pets_id });
});

if (!token) {
  location.replace("index.html");
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("index.html");
});
