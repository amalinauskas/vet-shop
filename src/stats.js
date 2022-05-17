const baseURL = "http://localhost:8080/v1";
const table = document.querySelector("tbody");

const token = localStorage.getItem("token");

const getData = async (token) => {
  const res = await fetch(`${baseURL}/logs`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (data.err) {
    return alert(data.err);
  }

  table.innerHTML = "";
  data.forEach((x) => {
    const tr = table.insertRow();

    const td1 = tr.insertCell();
    td1.textContent = x.id;

    const td2 = tr.insertCell();
    td2.textContent = x.name;

    const td3 = tr.insertCell();
    td3.textContent = x.prescription;

    const td4 = tr.insertCell();
    td4.textContent = x.description;

    const td5 = tr.insertCell();
    td5.textContent = x.date;

    const td6 = tr.insertCell();
    td6.textContent = x.pets_id;
  });

  if (table.innerHTML.length == 0) {
    document.getElementById("emptyMessage").style.display = "block";
  }
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
