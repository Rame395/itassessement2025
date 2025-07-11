          const form = document.getElementById("contactForm");
          const fields = ["name", "email", "phone", "message"];
          const successMessage = document.getElementById("successMessage");

          form.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;

            fields.forEach((fieldId) => {
              const input = document.getElementById(fieldId);
              const error = document.getElementById(fieldId + "Error");

              if (!input.value.trim()) {
                input.classList.add("input-error");
                error.textContent = `${input.previousElementSibling.innerText} is required`;
                valid = false;
              } else {
                input.classList.remove("input-error");
                error.textContent = "";
              }
            });

            if (valid) {
              successMessage.style.display = "block";
              form.submit(); 
            } else {
              successMessage.style.display = "none";
            }
          });

          
          fields.forEach((fieldId) => {
            const input = document.getElementById(fieldId);
            const error = document.getElementById(fieldId + "Error");
            input.addEventListener("input", () => {
              if (input.value.trim()) {
                input.classList.remove("input-error");
                error.textContent = "";
              }
            });
          });