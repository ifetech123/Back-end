
document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    age: this.age.value,
    email: this.email.value,
    password: this.password.value,
    phone: this.phone.value,
    address: this.address.value
  };

  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  document.getElementById("message").innerText = result.message;

  fetch("https://https://my-back-end-m7qk.onrender.com//register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

});


