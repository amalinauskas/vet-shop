const baseURL = "http://localhost:8080/v1";

const login = async (userData) => {
  const res = await fetch(`${baseURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  if (data.err) {
    return alert(data.err);
  }

  localStorage.setItem("token", data.token);
  location.replace("stats.html");
};

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.elements.email.value.trim().toLowerCase();
  const password = e.target.elements.pass.value;

  login({ email, password });
});
