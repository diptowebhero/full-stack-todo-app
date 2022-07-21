const trs = document.querySelectorAll("tbody tr");
const form = document.getElementById("form");
const btnSignUp = document.getElementById("btn-sign-up");
const submit = document.getElementById("submit");
[...trs].forEach((tr) => {
  tr.addEventListener("click", function (e) {
    if (this.id === e.target.dataset.id) {
      form.action = `/updateTask/${tr.id}`;
      submit.innerText = "Update";
      [...tr.children].forEach((td) => {
        if (td.id === "taskName") {
          form[0].value = td.textContent.trim();
        } else if (td.id === "priority") {
          form[1].selectedIndex =
            td.textContent.trim() === "high"
              ? 1
              : td.textContent.trim() === "medium"
              ? 2
              : td.textContent.trim() === "low"
              ? 3
              : 0;
        } else if (td.id === "date") {
          form[2].value = new Date(td.textContent).toISOString().slice(0, 10);
        }
        form[3].value = tr.id;
      });
    }
  });
});
